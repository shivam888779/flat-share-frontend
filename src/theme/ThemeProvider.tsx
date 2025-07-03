import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
    ThemeProvider as MuiThemeProvider,
    CssBaseline,
    PaletteMode,
    GlobalStyles
} from '@mui/material';
import { createAppTheme, globalStyles } from '@/theme';

interface ThemeContextType {
    mode: PaletteMode;
    toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Start with a default mode for SSR
    const [mode, setMode] = useState<PaletteMode>('light');
    const [isClient, setIsClient] = useState(false);

    // Initialize theme mode on client side
    useEffect(() => {
        setIsClient(true);

        const getInitialMode = (): PaletteMode => {
            try {
                const savedMode = localStorage.getItem('themeMode') as PaletteMode;
                if (savedMode) {
                    return savedMode;
                }

                // Check system preference
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    // return 'dark';
                    return 'light';
                }
            } catch (error) {
                console.warn('Error accessing localStorage:', error);
            }

            return 'light';
        };

        setMode(getInitialMode());
    }, []);

    // Listen for system theme changes
    useEffect(() => {
        if (!isClient) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            try {
                if (!localStorage.getItem('themeMode')) {
                    setMode(e.matches ? 'dark' : 'light');
                }
            } catch (error) {
                console.warn('Error accessing localStorage:', error);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [isClient]);

    const toggleColorMode = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            try {
                localStorage.setItem('themeMode', newMode);
            } catch (error) {
                console.warn('Error saving theme mode to localStorage:', error);
            }
            return newMode;
        });
    };

    const theme = useMemo(() => createAppTheme(mode), [mode]);

    const contextValue = useMemo(
        () => ({
            mode,
            toggleColorMode,
        }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles styles={globalStyles} />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
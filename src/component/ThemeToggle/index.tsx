import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@/theme/ThemeProvider';

export const ThemeToggle: React.FC = () => {
    const { toggleColorMode } = useTheme();
    const muiTheme = useMuiTheme();
    const isDark = muiTheme.palette.mode === 'dark';

    return (
        <Tooltip title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
            <IconButton
                onClick={toggleColorMode}
                color="inherit"
                sx={{
                    ml: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? 'rgba(0, 0, 0, 0.04)'
                            : 'rgba(255, 255, 255, 0.08)',
                    '&:hover': {
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? 'rgba(0, 0, 0, 0.08)'
                                : 'rgba(255, 255, 255, 0.12)',
                    },
                }}
            >
                {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </Tooltip>
    );
};

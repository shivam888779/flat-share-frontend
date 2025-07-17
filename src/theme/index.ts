import { createTheme, PaletteMode, alpha } from "@mui/material";
import { red, green, orange, blue, grey } from "@mui/material/colors";

// Define color tokens
const colorTokens = {
  primary: {
    50: "#e8eaf6",
    100: "#c5cae9",
    200: "#9fa8da",
    300: "#7986cb",
    400: "#5c6bc0",
    500: "#667eea", // Main brand color (updated from blue)
    600: "#5a67d8",
    700: "#4c51bf",
    800: "#434190",
    900: "#3c366b",
  },
  secondary: {
    50: "#f3e5f5",
    100: "#e1bee7",
    200: "#ce93d8",
    300: "#ba68c8",
    400: "#ab47bc",
    500: "#764ba2", // Gradient end color
    600: "#8e24aa",
    700: "#7b1fa2",
    800: "#6a1b9a",
    900: "#4a148c",
  },
  success: {
    50: "#e8f5e9",
    100: "#c8e6c9",
    200: "#a5d6a7",
    300: "#81c784",
    400: "#66bb6a",
    500: "#4caf50",
    600: "#43a047",
    700: "#388e3c",
    800: "#2e7d32",
    900: "#1b5e20",
  },
  warning: {
    50: "#fffde7",
    100: "#fff9c4",
    200: "#fff59d",
    300: "#fff176",
    400: "#ffee58",
    500: "#ffeb3b",
    600: "#fdd835",
    700: "#fbc02d",
    800: "#f9a825",
    900: "#f57f17",
  },
  error: {
    50: "#ffebee",
    100: "#ffcdd2",
    200: "#ef9a9a",
    300: "#e57373",
    400: "#ef5350",
    500: "#f44336",
    600: "#e53935",
    700: "#d32f2f",
    800: "#c62828",
    900: "#b71c1c",
  },
  grey: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
};

// Create theme function that supports light/dark modes
export const createAppTheme = (mode: PaletteMode = 'light') => {
  const isLight = mode === 'light';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colorTokens.primary[500],
        light: colorTokens.primary[300],
        dark: colorTokens.primary[700],
        contrastText: colorTokens.grey[900],
      },
      secondary: {
        main: colorTokens.secondary[500],
        light: colorTokens.secondary[300],
        dark: colorTokens.secondary[700],
        contrastText: '#fff',
      },
      error: {
        main: colorTokens.error[500],
        light: colorTokens.error[300],
        dark: colorTokens.error[700],
      },
      warning: {
        main: colorTokens.warning[500],
        light: colorTokens.warning[300],
        dark: colorTokens.warning[700],
      },
      success: {
        main: colorTokens.success[500],
        light: colorTokens.success[300],
        dark: colorTokens.success[700],
      },
      info: {
        main: isLight ? colorTokens.primary[500] : colorTokens.primary[300],
        light: colorTokens.primary[100],
        dark: colorTokens.primary[700],
      },
      background: {
        default: isLight ? '#f8f9fa' : '#0a0a0a',
        paper: isLight ? '#ffffff' : '#141414',
      },
      text: {
        primary: isLight ? colorTokens.grey[900] : colorTokens.grey[100],
        secondary: isLight ? colorTokens.grey[600] : colorTokens.grey[400],
      },
      divider: isLight ? colorTokens.grey[200] : colorTokens.grey[800],
      action: {
        hover: isLight ? alpha(colorTokens.grey[900], 0.04) : alpha(colorTokens.grey[100], 0.08),
        selected: isLight ? alpha(colorTokens.primary[500], 0.08) : alpha(colorTokens.primary[300], 0.12),
      },
    },

    // Enhanced shadows
    shadows: [
      'none',
      '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      ...Array(18).fill('0 25px 50px -12px rgba(0, 0, 0, 0.25)'),
    ] as any,

    shape: {
      borderRadius: 12,
    },

    spacing: 8,

    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },

    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),

      h1: {
        fontSize: "2.5rem",
        lineHeight: 1.2,
        fontWeight: 700,
        letterSpacing: "-0.01562em",
      },
      h2: {
        fontSize: "2rem",
        lineHeight: 1.3,
        fontWeight: 600,
        letterSpacing: "-0.00833em",
      },
      h3: {
        fontSize: "1.75rem",
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: "0em",
      },
      h4: {
        fontSize: "1.5rem",
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: "0.00735em",
      },
      h5: {
        fontSize: "1.25rem",
        lineHeight: 1.5,
        fontWeight: 600,
        letterSpacing: "0em",
      },
      h6: {
        fontSize: "1rem",
        lineHeight: 1.6,
        fontWeight: 600,
        letterSpacing: "0.0075em",
      },
      subtitle1: {
        fontSize: "1rem",
        lineHeight: 1.75,
        fontWeight: 500,
        letterSpacing: "0.00938em",
      },
      subtitle2: {
        fontSize: "0.875rem",
        lineHeight: 1.57,
        fontWeight: 500,
        letterSpacing: "0.00714em",
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.75,
        fontWeight: 400,
        letterSpacing: "0.00938em",
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.6,
        fontWeight: 400,
        letterSpacing: "0.01071em",
      },
      button: {
        fontSize: "0.875rem",
        lineHeight: 1.75,
        fontWeight: 500,
        letterSpacing: "0.02857em",
        textTransform: "none",
      },
      caption: {
        fontSize: "0.75rem",
        lineHeight: 1.66,
        fontWeight: 400,
        letterSpacing: "0.03333em",
      },
    },

    components: {
      // Enhanced Dialog/Modal styles
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
            boxShadow: isLight
              ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              : '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.25)',
          },
        },
      },


      // Enhanced Button styles
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: 8,
            padding: '10px 24px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          contained: {
            borderRadius: '12px',
            borderColor: '#ffffff',
            backgroundColor: colorTokens.primary[500],
            color: '#ffffff',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: colorTokens.primary[600],
            }

          },
          outlined: {
            borderWidth: 2,
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              borderWidth: 2,
              backgroundColor: 'rgba(108, 92, 231, 0.05)'
            }

          },
        },
        variants: [
          {
            props: { variant: "gradient" },
            style: {
              background: `linear-gradient(135deg, ${colorTokens.primary[500]} 0%, ${colorTokens.secondary[500]} 100%)`,
              color: '#fff',
              '&:hover': {
                background: `linear-gradient(135deg, ${colorTokens.primary[600]} 0%, ${colorTokens.secondary[600]} 100%)`,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              },
            },
          },
          {
            props: { variant: "dashed" },
            style: {
              background: 'transparent',
              border: `2px dashed ${isLight ? colorTokens.grey[300] : colorTokens.grey[700]}`,
              '&:hover': {
                borderColor: colorTokens.primary[500],
                background: alpha(colorTokens.primary[500], 0.04),
              },
            },
          },
        ],
      },
      MuiGrid: {
        styleOverrides: {
          root: {
            padding: '0 !important',
            width: '100%',
          },
        },
      },

      // Enhanced Card styles
      MuiCard: {
        styleOverrides: {
          root: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            overflow: 'visible',
            position: 'relative',
            transition: 'all 0.3s ease',
            border: '1px solid',
            borderColor: 'rgba(0,0,0,0.08)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              borderColor: 'rgba(108, 92, 231, 0.2)'
            }
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
          },
        },
      },

      // Enhanced TextField styles
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              transition: 'all 0.3s ease',
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: colorTokens.primary[500],
                },
              },
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderWidth: 2,
                },
              },
            },
          },
        },
      },

      // Enhanced IconButton
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: alpha(colorTokens.primary[500], 0.08),
            },
          },
        },
      },

      // Enhanced Tabs
      MuiTabs: {
        styleOverrides: {
          root: {
            minHeight: 48,
          },
          indicator: {
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: {
            minHeight: 48,
            fontWeight: 500,
            fontSize: '0.875rem',
            textTransform: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: colorTokens.primary[500],
              opacity: 1,
            },
          },
        },
      },

      // Enhanced Paper
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          rounded: {
            borderRadius: 12,
          },
        },
      },

      // Enhanced Chip
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
          },
        },
      },
    },

    // Custom theme properties
    custom: {
      gradients: {
        primary: `linear-gradient(135deg, ${colorTokens.primary[500]} 0%, ${colorTokens.secondary[500]} 100%)`,
        secondary: `linear-gradient(135deg, ${colorTokens.secondary[500]} 0%, ${colorTokens.primary[500]} 100%)`,
        success: `linear-gradient(135deg, ${colorTokens.success[400]} 0%, ${colorTokens.success[600]} 100%)`,
        error: `linear-gradient(135deg, ${colorTokens.error[400]} 0%, ${colorTokens.error[600]} 100%)`,
        warning: `linear-gradient(135deg, ${colorTokens.warning[400]} 0%, ${colorTokens.warning[600]} 100%)`,
      },
      animations: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideUp: 'slideUp 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
      },
    },
  });
};

// Export default light theme
const theme = createAppTheme('light');

// Export dark theme
export const darkTheme = createAppTheme('dark');

// Add TypeScript support for custom theme properties
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      gradients: {
        primary: string;
        secondary: string;
        success: string;
        error: string;
        warning: string;
      };
      animations: {
        fadeIn: string;
        slideUp: string;
        slideDown: string;
      };
    };
  }

  interface ThemeOptions {
    custom?: {
      gradients?: {
        primary?: string;
        secondary?: string;
        success?: string;
        error?: string;
        warning?: string;
      };
      animations?: {
        fadeIn?: string;
        slideUp?: string;
        slideDown?: string;
      };
    };
  }

  interface Palette {
    gradient?: Palette['primary'];
  }

  interface PaletteOptions {
    gradient?: PaletteOptions['primary'];
  }
}

// Declare button variant module augmentation
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    gradient: true;
    dashed: true;
  }
}

// Export animations keyframes to be added to global CSS
export const globalStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export default theme;
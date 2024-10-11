import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const palette = {
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
  },
  secondary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
  },
  info: {
    main: "#FFFFFF",
    light: "#42a5f5",
    dark: "#1565c0",
  },
};

const theme = createTheme({
  palette: {
    ...palette,
  },
  components: {
    MuiIconButton:{
      styleOverrides :{root:{
          
          backgroundColor:palette.primary.light,
          "&:hover":{
            backgroundColor:palette.primary.dark,
          }
        }}
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "dashed" },
          style: {
            background: "none",
            textTransform: "none",
            border: `2px dashed grey`,
          },
        },
        {
          props: { variant: "text" },
          style: {
            background: "none",
            textTransform: "none",
            fontSize: "1.25rem",
            color: palette.info.dark,
            padding: 0,
            "&:hover": {
              background: "none",
              color: palette.primary.main,
            },
          },
        },
        {
          props: { variant: "contained" },
          style: {
            textTransform: "none",
            // fontWeight:"bolder",
            backgroundColor: palette.primary.light,
            padding: "0.75rem 1.25rem",
            color: "#fff",
            fontSize: "1.25rem",
            lineHeight: "1.25rem",
            "&:hover": {
              backgroundColor: palette.primary.main,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: "none",
          // fontWeight:"bolder",
          backgroundColor: palette.primary.light,
          padding: "0.75rem 1.25rem",
          color: "#fff",
          fontSize: "1rem",
          lineHeight: "1.25rem",
          "&:hover": {
            backgroundColor: palette.primary.main,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: "33px",
          fontWeight: "bolder",
          fontSize: "1rem",
          lineHeight: "1.25rem",
          // backgroundColor:"#9B57DD",
          "&.Mui-selected": {
            color: palette.secondary.main,
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          ".MuiTabs-indicator": {
            backgroundColor: palette.secondary.main,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // color : "#000",
          backgroundColor: palette.info.main,
          borderRadius: "0.75rem",
          height: "3.70rem", 
        
          "& fieldset":{
            color : "#000",
            height: "4rem", 
            borderRadius: "0.75rem",
          },
          ".MuiInputBase-input": {
            border:"none",
            fontSize: "1.25rem",
            borderRadius: "2rem",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          ".MuiInputBase-root": { borderRadius: "33px" },
        },
      },
    },
  },
  typography: {
    color: "#000",    fontFamily: [
      "montserrat",
      "sans-serif",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),

    h1: {
      fontSize: "2.5rem",
      lineHeight: "1.25rem",
      color: "#000",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      lineHeight: "1.25rem",
      color: "#000",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.5rem",
      lineHeight: "20px",
      color: "#000",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.25rem",
      lineHeight: "20px",
      color: "#000",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1rem",
      lineHeight: "20px",
      color: "#000",
      fontWeight: 700,
    },
    h6: {
      fontSize: '0.75rem',
      lineHeight: "20px",
      color: "#000",
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '1.25rem',
      color: "#4f4c4c",
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '1rem',
      lineHeight: "1.5rem",
      color: "#000",
      fontWeight: 500,
    },
    body1: {
      fontSize: '1.5rem',
      lineHeight: "1.25rem",
      color: "#000",
      fontWeight: 500,
    },
    body2: {
      fontSize:  '0.85rem',
      lineHeight: "1rem",
      color: "#000",
      fontWeight: 500,
    },
    button: {
      fontSize: 12,
      lineHeight: "20px",
      color: "#000",
      fontWeight: 500,
    },
    caption: {
      fontSize: "0.875rem",
      lineHeight: "0.875rem",
      color: "#000",
      fontWeight: 500,
    },
  },
});
export default theme;

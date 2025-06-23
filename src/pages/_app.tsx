import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalContextProvider } from "../global-context"
import { ThemeProvider } from "@mui/material";
import theme from "../styles/global-theme"
import { SnackbarProvider } from "@/hooks/useSnackbar";
import { Header } from "@/component";

export default function App({ Component, pageProps }: AppProps) {
  return <div className="main"><ThemeProvider theme={theme}>
    <SnackbarProvider>
      <GlobalContextProvider>
        <Header />
        <Component {...pageProps} />
      </GlobalContextProvider>
    </SnackbarProvider>

  </ThemeProvider>
  </div>

}

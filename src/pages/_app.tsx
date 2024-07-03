import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalContextProvider } from "../global-context"
import { ThemeProvider } from "@mui/material";
import theme from "../styles/global-theme"

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}>
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  </ThemeProvider>

}

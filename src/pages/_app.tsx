import "@/styles/globals.css";
import "@/styles/landing-page.css";
import type { AppProps } from "next/app";
import { GlobalContextProvider } from "../global-context"
import { ThemeProvider } from "@/theme/ThemeProvider";
import { SnackbarProvider } from "@/hooks/useSnackbar";
import { Footer, Header } from "@/component";

export default function App({ Component, pageProps }: AppProps) {
  return <div className="main"><ThemeProvider >
    <SnackbarProvider>
      <GlobalContextProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </GlobalContextProvider>
    </SnackbarProvider>

  </ThemeProvider>
  </div>

}

import "@/styles/globals.css";
import "@/styles/landing-page.css";
import type { AppProps } from "next/app";
import { GlobalContextProvider } from "../global-context"
import { ThemeProvider } from "@/theme/ThemeProvider";
import { SnackbarProvider } from "@/hooks/useSnackbar";
import { Footer, Header } from "@/component";
import { Box } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return <div className="main"><ThemeProvider >
    <SnackbarProvider>
      <GlobalContextProvider>
        <Header />
        <Box sx={{ pt: 10, backgroundColor: '#f3f4f6' }}>
          <Component {...pageProps} />
        </Box>
        {/* <Footer /> */}
      </GlobalContextProvider>
    </SnackbarProvider>

  </ThemeProvider>
  </div>

}

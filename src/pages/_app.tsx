import "@/styles/globals.css";
import "@/styles/landing-page.css";
import type { AppProps } from "next/app";
import { GlobalContextProvider } from "../global-context"
import { ThemeProvider } from "@/theme/ThemeProvider";
import { SnackbarProvider } from "@/hooks/useSnackbar";
import { Footer, Header, LandingPageBottomView } from "@/component";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {

  const isLandingPage = useRouter().pathname === "/";

  return <div className="main"><ThemeProvider >
    <SnackbarProvider>
      <GlobalContextProvider>
        <Header />
        <Box sx={{ pt: 8, backgroundColor: '#f3f4f6' }}>
          <Component {...pageProps} />
        </Box>
        {isLandingPage && <LandingPageBottomView />}
        <Footer />
      </GlobalContextProvider>
    </SnackbarProvider>

  </ThemeProvider>
  </div>

}

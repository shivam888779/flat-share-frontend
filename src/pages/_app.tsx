import "@/styles/globals.css";
import "@/styles/landing-page.css";
import type { AppProps } from "next/app";
import { GlobalContextProvider } from "../global-context"
import { ThemeProvider } from "@/theme/ThemeProvider";
import { SnackbarProvider } from "@/hooks/useSnackbar";
import { Footer, Header } from "@/component";
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
        {isLandingPage && <Box
          mt={-12}
          sx={{
            position: 'relative',
            height: '24rem',
            overflow: 'hidden',

            transition: 'all 0.5s ease',
            background: 'linear-gradient(to bottom, transparent, #dbeafe)'
          }}
        >
          {/* Clouds */}
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>

          {/* Buildings */}
          <div className={`building house1 hover:scale-105 hover-brightness-120`}></div>
          <div className={`building building2 hover:scale-105 hover-brightness-120`}></div>
          <div className={`building building3 hover:scale-105 hover-brightness-120`}></div>
          <div className={`building house4 hover:scale-105 hover-brightness-120`}></div>
          <div className={`building building5 hover:scale-105 hover-brightness-120`}></div>
        </Box>}
        <Footer />
      </GlobalContextProvider>
    </SnackbarProvider>

  </ThemeProvider>
  </div>

}

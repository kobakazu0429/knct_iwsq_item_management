import "../styles/globals.css";
import "../styles/print.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from "smarthr-ui";

const theme = createTheme({});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname.startsWith("/print")) {
      document.body.className = "A4";
    }
  }, [router.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

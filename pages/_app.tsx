import "../styles/globals.css";
import "../styles/print.css";
import { useEffect, type ReactElement, type ReactNode } from "react";
import { type NextPage } from "next";
import { type AppProps } from "next/app";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from "smarthr-ui";

const theme = createTheme({});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname.startsWith("/print")) {
      document.body.classList.add("A4");
    } else {
      document.body.classList.remove("A4");
    }
  }, [router.pathname]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

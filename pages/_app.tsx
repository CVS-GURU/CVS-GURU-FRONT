import React, { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { wrapper } from 'store';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/global-styles';
import Layout from 'components/base/Layout';
import Toggle from 'components/common/Toggle';
import { darkTheme, lightTheme } from 'styles/theme';
import { useDarkMode } from 'hooks/useDarkMode';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';
import 'antd/dist/antd.css';
import 'styles/index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

declare global {
  interface Window {
    kakao: any;
  }
}

const app = ({ Component, pageProps }: AppProps) => {
  const [theme, toggleTheme] = useDarkMode();
  const [isMounted, setIsMounted] = React.useState(false);
  const [queryClient] = React.useState(() => new QueryClient());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const body = (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <GlobalStyle />
          <Toggle themeMode={theme} toggleTheme={toggleTheme} />
          <div id="root-modal" />
          <Layout>
            <Component {...pageProps} title="" />
          </Layout>
        </ThemeProvider>
      </Hydrate>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );

  // prevents ssr flash for mismatched dark mode
  if (!isMounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>;
  }

  return (
    <>
      <Head>
        <title>CVS-GURU</title>
        <link rel="shortcut icon" href="/images/your.ico" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css"
        />

        <link
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
          rel="stylesheet"
        />

        <meta property="og:title" content="your title" key="title" />
      </Head>

      {body}
    </>
  );
};

export default wrapper.withRedux(app);

import { Provider } from 'next-auth/client';
import Layout from '../components/Layout';
import { Theme, ThemeProvider } from 'theme-ui';
import theme from '../components/theme';
import { AppProps, AppInitialProps, AppContext } from 'next/app';
import App from 'next/app';
import { signIn, useSession, getSession } from 'next-auth/client';
import { useEffect } from 'react';

function KrossDashboardApp({ Component, pageProps }: AppProps) {
    if (pageProps.session === null && typeof window !== 'undefined') {
        signIn();
    }
    return (
        <Provider
            session={pageProps.session}
            options={{
                clientMaxAge: 300,
                keepAlive: 10,
            }}
        >
            <ThemeProvider theme={theme as Theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </Provider>
    );
}

KrossDashboardApp.getInitialProps = async function (context: AppInitialProps & AppContext) {
    // App.getInitialProps(context);

    const props = await App.getInitialProps(context);
    const session = await getSession(context.ctx);
    props.pageProps.session = session;
    return props;
};

export default KrossDashboardApp;

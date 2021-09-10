import { Provider } from 'next-auth/client';
import Layout from '../components/Layout';
import { Theme, ThemeProvider } from 'theme-ui';
import theme from '../components/theme';
import { AppProps, AppInitialProps, AppContext } from 'next/app';
import App from 'next/app';
import { signIn, useSession, getSession } from 'next-auth/client';
import { useEffect } from 'react';
import '../styles/globals.css';
import { ApiContextContainer } from '../components/contexts/ApiContext';

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
            <ApiContextContainer config={pageProps.config}>
                <ThemeProvider theme={theme as Theme}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </ApiContextContainer>
        </Provider>
    );
}

KrossDashboardApp.getInitialProps = async function (context: AppInitialProps & AppContext) {
    // App.getInitialProps(context);
    const props = await App.getInitialProps(context);
    const [session, config] = await Promise.all([
        getSession(context.ctx),
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/application/config`).then((r) => r.json()),
    ]);

    props.pageProps.session = session;
    props.pageProps.config = config;
    return props;
};

export default KrossDashboardApp;

import '../styles/globals.css';

import { getSession, Provider, signIn } from 'next-auth/client';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { ThemeProvider, styled, createTheme } from '@mui/material/styles';

import { ApiContextContainer } from '../components/contexts/api';
import Layout from '../components/Layout';

import { cache } from '../helpers/cache';

const getConfig = cache(async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_URL || ''}/api/application/config`);
    return data.json();
});

const mdTheme = createTheme();

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
                <ThemeProvider theme={mdTheme}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </ApiContextContainer>
        </Provider>
    );
}

KrossDashboardApp.getInitialProps = async function (context: AppInitialProps & AppContext) {
    const props = await App.getInitialProps(context);
    const [session, config] = await Promise.all([getSession(context.ctx), getConfig()]);
    props.pageProps.session = session;
    props.pageProps.config = config;
    return props;
};

export default KrossDashboardApp;

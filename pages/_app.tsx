import { Provider } from 'next-auth/client';
import Layout from '../components/Layout';
import { Theme, ThemeProvider } from 'theme-ui';
import { deep } from '../components/theme';

export default function App({ Component, pageProps }) {
    return (
        <Provider
            session={pageProps.session}
            options={{
                clientMaxAge: 100,
                keepAlive: 10,
            }}
        >
            <ThemeProvider theme={deep as Theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </Provider>
    );
}

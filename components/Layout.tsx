import { Flex, Container, Grid } from 'theme-ui';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{}> = ({ children }) => {
    return (
        <Flex sx={{ flexDirection: 'column', minHeight: 256, padding: 0, alignItems: 'stretch', maxHeight: '100wh' }}>
            <Header />
            <Container sx={{ overflow: 'auto', padding: 0, minHeight: 256 }}>{children}</Container>
            <Footer />
        </Flex>
    );
};
export default Layout;

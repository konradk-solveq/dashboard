import { Flex, Container } from 'theme-ui';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{}> = ({ children }) => {
    return (
        <Flex sx={{ flexDirection: 'column', minHeight: 256 }}>
            <Header />
            <Container>{children}</Container>
            <Footer />
        </Flex>
    );
};
export default Layout;

import { Flex, Container, Grid } from 'theme-ui';
import Header from './Header';
import Footer from './Footer';
import { signIn, useSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useBreakpointIndex, useResponsiveValue } from '@theme-ui/match-media';

const Layout: React.FC<{}> = ({ children }) => {
    const layout = useResponsiveValue<'row' | 'column'>(['column', 'column', 'column', 'row']);
    const menuPointer = useResponsiveValue<'sticky' | 'unset'>(['unset', 'unset', 'unset', 'sticky']);
    return (
        <Flex sx={{ flexDirection: 'column', minHeight: 256, padding: 0, alignItems: 'stretch', maxHeight: '100wh' }}>
            <Header />
            <Flex sx={{ flexDirection: layout, alignItems: 'flex-start', position: 'relative' }}>
                <Container
                    sx={{
                        overflow: 'auto',
                        maxWidth: '200px',
                        padding: 0,
                        outline: '1px solid black',
                        position: menuPointer,
                        top: 20,
                    }}
                >
                    Menu
                </Container>
                <Container sx={{ overflow: 'auto', maxWidth: '1024px', padding: 0, minHeight: 256 }}>
                    {children}
                </Container>
            </Flex>
            <Footer />
        </Flex>
    );
};
export default Layout;

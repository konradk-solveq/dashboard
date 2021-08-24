import { Flex, Container, Grid, Link } from 'theme-ui';
import Header from './Header';
import Footer from './Footer';
import Tester from './Tester';
import { signIn, useSession } from 'next-auth/client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useBreakpointIndex, useResponsiveValue } from '@theme-ui/match-media';
import Routing from 'next/link';

const Layout: React.FC<{}> = ({ children }) => {
    const layout = useResponsiveValue<'row' | 'column'>(['column', 'column', 'column', 'row']);
    const menuPointer = useResponsiveValue<'sticky' | 'unset'>(['unset', 'unset', 'unset', 'sticky']);

    const [contentH, setContentH] = useState(null);

    const headerObj = useRef(null);
    const footerObj = useRef(null);

    useEffect(() => {
        if (headerObj.current && footerObj.current) {
            const headerH = headerObj.current.offsetHeight;
            const footerH = headerObj.current.offsetHeight;

            const h = window.innerHeight - footerH - headerH;
            console.log('%c h:', 'background: #ffcc00; color: #003300', h)
            setContentH(h)
        }
    }, [headerObj.current, footerObj.current])


    return (
        <Flex sx={{
            flexDirection: 'column',
            height: '500px',
        }}>
            <div ref={headerObj}>
                <Header />
            </div>
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
                    <Container>
                        <Routing passHref href="/routes">
                            <Link>Trasy</Link>
                        </Routing>
                    </Container>
                </Container>


                <Flex sx={{
                    minHeight: contentH,
                    width: '100%',
                }}>
                    {children}
                </Flex>

            </Flex>
            <div ref={footerObj} >
                <Footer />
            </div>
            <Tester />
        </Flex>
    );
};
export default Layout;

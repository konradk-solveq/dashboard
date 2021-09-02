import { useBreakpointIndex } from '@theme-ui/match-media';
import { useEffect, useRef, useState } from 'react';
import { Flex } from 'theme-ui';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';
import Tester from './Tester';

const Layout: React.FC<{}> = ({ children }) => {
    const index = useBreakpointIndex();

    const [contentH, setContentH] = useState(null);

    const headerObj = useRef(null);
    const footerObj = useRef(null);

    useEffect(() => {
        if (headerObj.current && footerObj.current) {
            const headerH = headerObj.current.offsetHeight;
            const footerH = headerObj.current.offsetHeight;

            const h = window.innerHeight - footerH - headerH;
            // console.log('%c h:', 'background: #ffcc00; color: #003300', h)
            setContentH(h);
        }
    }, [headerObj.current, footerObj.current]);

    return (
        <Flex
            sx={{
                flexDirection: 'column',
                height: '500px',
            }}
        >
            <div ref={headerObj}>
                <Header />
            </div>
            <Flex
                sx={{
                    flexDirection: ['column', 'column', 'row', 'row', 'row'],
                    alignContent: 'flex-start',
                    bg: ['#fff', '#fff', '#666', '#666', '#666'],
                }}
            >
                <Menu />

                <Flex
                    sx={{
                        minHeight: contentH - (index < 2 ? 65 : 0),
                        width: '100%',
                        bg: '#fff',
                        p: 10,
                    }}
                >
                    {children}
                </Flex>
            </Flex>
            <div ref={footerObj}>
                <Footer />
            </div>
            <Tester />
        </Flex>
    );
};
export default Layout;

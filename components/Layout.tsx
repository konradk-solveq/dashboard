// import { useBreakpointIndex } from '@@mui/material//match-media';
import { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';
import Tester from './Tester';

const Layout: React.FC<{}> = ({ children }) => {
    const index = 1;

    const [contentH, setContentH] = useState(null);

    const headerObj = useRef(null);
    const footerObj = useRef(null);

    useEffect(() => {
        if (headerObj.current && footerObj.current) {
            const headerH = headerObj.current.offsetHeight;
            const footerH = footerObj.current.offsetHeight;

            const h = window.innerHeight - footerH - headerH;
            setContentH(h);
        }
    }, [headerObj.current, footerObj.current]);

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '500px',
            }}
        >
            <Container ref={headerObj}>
                <Header />
            </Container>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'flex-start',
                    bg: '#fff',
                }}
            >
                <Menu />

                <Container
                    sx={{
                        minHeight: contentH - (index < 2 ? 65 : 0),
                        width: '100%',
                        bg: '#fff',
                        p: 10,
                    }}
                >
                    {children}
                </Container>
            </Container>
            <div ref={footerObj}>
                <Footer />
            </div>
            <Tester />
        </Container>
    );
};
export default Layout;

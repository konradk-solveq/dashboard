// import { useBreakpointIndex } from '@@mui/material//match-media';
import { useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';
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
        // <Container
        //     sx={{
        //         display: 'flex',
        //         flexDirection: 'column',
        //         height: '500px',
        //         m: '0px',
        //         pl: '0px',
        //         backgroundColor: 'pink',
        //         width: '100%',
        //     }}
        // >
        //     <Container ref={headerObj} sx={{ m: '0px' }}>
        //         <Header />
        //     </Container>
        //     <Container
        //         sx={{
        //             display: 'flex',
        //             flexDirection: 'column',
        //             alignContent: 'flex-start',
        //             backgroundColor: '#fff',
        //         }}
        //     >
        //         <Menu />

        //         <Container
        //             sx={{
        //                 minHeight: contentH - (index < 2 ? 65 : 0),
        //                 width: '100vw',
        //                 backgroundColor: '#fff',
        //                 p: 10,
        //             }}
        //         >
        //             {children}
        //         </Container>
        //     </Container>
        //     <div ref={footerObj}>
        //         <Footer />
        //     </div>
        //     {/* <Tester /> */}
        // </Container>

        <Box>
            <Box ref={headerObj} sx={{ m: '0px' }}>
                <Header />
            </Box>
            <Box
                sx={{
                    minHeight: contentH - (index < 2 ? 65 : 0),
                    pt: 2,
                    backgroundColor: '#fff',
                }}
            >
                {children}
            </Box>
            <Box ref={footerObj}>
                <Footer />
            </Box>
        </Box>
    );
};
export default Layout;

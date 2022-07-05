// import { useResponsiveValue } from '@@mui/material//match-media';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Footer: React.FC<{}> = ({ children }) => {
    // const footerPart = useResponsiveValue<'sticky' | 'unset'>(['unset', 'unset', 'unset', 'sticky']);

    return (
        <Container
            sx={{
                px: 5,
                // bg: '#f8f8f8',
                p: 2,
                mt: '5px',
                borderTop: '1px solid #ddd',
                position: 'relative',
                bottom: 0,
            }}
        >
            <Box
                sx={{
                    justifyContent: 'center',
                    width: '100%',
                    whiteSpace: 'nowrap',
                }}
            >
                <Box
                    sx={{
                        borderTop: '1px solid #ddd',
                        px: 50,
                        pt: '5px',
                        mt: 15,
                    }}
                >
                    2022 Kross. All rights reserved{' '}
                </Box>
            </Box>
        </Container>
    );
};
export default Footer;

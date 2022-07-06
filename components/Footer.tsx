import React from 'react';
import Box from '@mui/material/Box';

const Footer: React.FC<{}> = ({ children }) => {
    return (
        <Box
            sx={{
                p: 2,
                mt: '5px',
                position: 'relative',
                bottom: 0,
            }}
        >
            <Box
                sx={{
                    mt: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    whiteSpace: 'nowrap',
                }}
            >
                <Box
                    sx={{
                        borderTop: '1px solid #ddd',
                        px: 50,
                        pt: '10px',
                        mt: 15,
                    }}
                >
                    2022 Kross. All rights reserved{' '}
                </Box>
            </Box>
        </Box>
    );
};
export default Footer;

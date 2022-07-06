import React from 'react';
import Box from '@mui/material/Box';

const Footer: React.FC<{}> = ({ children }) => {
    return (
        <Box
            sx={{
                borderTop: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                m: '16px 32px',
                p: '16px 32px',
                fontWeight: '200',
            }}
        >
            {' '}
            2022 Kross. All rights reserved{' '}
        </Box>
    );
};
export default Footer;

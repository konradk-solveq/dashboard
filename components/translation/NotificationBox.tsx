import React from 'react';
import { Box } from '@mui/material/';

const NotificationBox = ({ children }) => {
    return (
        <Box
            sx={{
                textAlign: 'center',
                position: 'fixed',
                left: '50%',
                top: '100px',
                width: '300px',
                height: '60px',
                fontSize: '24px',
                color: 'white',
                backgroundColor: 'rgba(255, 99, 71, 0.8)',
            }}
        >
            <Box sx={{ position: 'relative', transform: 'translateY(15px)' }}>{children}</Box>
        </Box>
    );
};
export default NotificationBox;

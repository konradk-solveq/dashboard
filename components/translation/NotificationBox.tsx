import React from 'react';
import { Box } from 'theme-ui';

const NotificationBox = ({ children }) => {
    return (
        <Box
            bg="rgba(255, 99, 71, 0.8)"
            color="white"
            sx={{
                textAlign: 'center',
                position: 'fixed',
                left: '50%',
                top: '100px',
                width: '300px',
                height: '60px',
                fontSize: '24px',
            }}
        >
            <Box sx={{ position: 'relative', transform: 'translateY(15px)' }}>{children}</Box>
        </Box>
    );
};
export default NotificationBox;

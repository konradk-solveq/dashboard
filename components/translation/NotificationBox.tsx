import React from 'react';
import { Box, Alert } from '@mui/material/';

const NotificationBox = ({ children }) => {
    return (
        <Box>
            <Alert severity="info">{children}</Alert>
        </Box>
    );
};
export default NotificationBox;

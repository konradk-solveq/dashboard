import React, { useState } from 'react';
import { Box, Alert, Snackbar, Typography } from '@mui/material/';

const NotificationBox = ({ children }) => {
    const [open, setOpen] = useState(true);
    let alertSeverity;

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    if (children == ('Wystąpił błąd' || 'Wystąpił błąd ładowania danych')) {
        alertSeverity = 'error';
    } else if (children == 'Zapisano') {
        alertSeverity = 'success';
    } else if (children == 'Usunięto') {
        alertSeverity = 'warning';
    } else {
        alertSeverity = 'info';
    }

    return (
        <Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    severity={alertSeverity}
                    sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
                    onClose={handleClose}
                >
                    <Typography variant="h6">{children}</Typography>
                </Alert>
            </Snackbar>
        </Box>
    );
};
export default NotificationBox;

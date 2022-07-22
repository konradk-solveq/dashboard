import React, { useContext } from 'react';
import { Button, Typography, Box } from '@mui/material/';
import { ManageWebhookContext } from '../../contexts/settings/ManageWebhook';

const Error = () => {
    const { errorMessage, manageModalState } = useContext(ManageWebhookContext);

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" sx={{ mt: 2 }}>
                Nie udało się wysłać zapytania.
            </Typography>
            <Typography variant="h4" sx={{ mt: 2 }}>{`${errorMessage[0]}: ${errorMessage[1]}`}</Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => manageModalState()}>
                Wróć
            </Button>
        </Box>
    );
};

export default Error;

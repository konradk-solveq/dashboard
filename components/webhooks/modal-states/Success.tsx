import React, { useContext } from 'react';
import { Button, Typography, Box } from '@mui/material/';
import { ManageWebhookContext } from '../../contexts/settings/ManageWebhook';

const Success = () => {
    const { manageModalState } = useContext(ManageWebhookContext);

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2">Pomyślnie wysłano zapytanie</Typography>
            <Button variant="contained" sx={{ margin: '20px 0 15px' }} onClick={() => manageModalState()}>
                Wróć
            </Button>
        </Box>
    );
};

export default Success;

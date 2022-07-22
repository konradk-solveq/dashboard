import React, { useContext } from 'react';
import { Button, Box, Typography } from '@mui/material/';
import { ManageWebhookContext } from '../../contexts/settings/ManageWebhook';

const Delete = () => {
    const { hookToEdit, manageModalState, setIsLoading, apiHandler, deleteWebhook } = useContext(ManageWebhookContext);

    const manageDeleteClick = async (id: string) => {
        setIsLoading(true);
        apiHandler(await deleteWebhook(id), id, 'delete');
    };

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2">Are you sure you want to delete {hookToEdit?.metadata.title}?</Typography>
            <Box sx={{ justifyContent: 'center', padding: '15px' }}>
                <Button variant="contained" color="success" onClick={() => manageModalState()}>
                    Anuluj
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    sx={{ ml: '15px' }}
                    onClick={() => manageDeleteClick(hookToEdit.id)}
                >
                    Usuń
                </Button>
            </Box>
        </Box>
    );
};

export default Delete;

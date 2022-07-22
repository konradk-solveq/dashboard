import React, { useContext } from 'react';
import { Box, Typography, IconButton } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import { ManageWebhookContext } from '../../contexts/settings/ManageWebhook';
import EditModalForm from '../EditModalForm';

const EditCreate = () => {
    const { hookToEdit, manageModalState } = useContext(ManageWebhookContext);

    return (
        <>
            <Box sx={{ justifyContent: 'center' }}>
                <Typography variant="h2" textAlign="center">
                    {hookToEdit ? 'Edit' : 'Create'}
                </Typography>
                <IconButton onClick={() => manageModalState()} sx={{ position: 'absolute', right: 10, top: 12 }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <EditModalForm />
        </>
    );
};

export default EditCreate;

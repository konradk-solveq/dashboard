import React, { useContext } from 'react';
import { Button, Box, Typography, Card, Grid, Divider } from '@mui/material/';
import { ManageWebhookContext } from '../contexts/settings/ManageWebhook';

const WebhooksListItem = ({ item }) => {
    const { setHookToEdit, manageModalState, modalType } = useContext(ManageWebhookContext);

    const handleEditClick = () => {
        manageModalState(modalType[0]);
        setHookToEdit(item);
    };

    const handleDeleteClick = () => {
        manageModalState(modalType[1]);
        setHookToEdit(item);
    };

    return (
        <>
            <Grid item xs={2} sx={{ m: 2 }}>
                <Card className="card-route" sx={{ p: 1 }}>
                    <Box sx={{ height: '250px', overflowY: 'auto' }}>
                        <Typography variant="h5">{item.metadata.title}</Typography>
                        <Divider />
                        <Typography variant="subtitle2" sx={{ fontWeight: 200, fontSize: '16px' }}>
                            {item.metadata.description}
                        </Typography>

                        <Typography variant="h6" sx={{ mt: '8px' }}>
                            <strong>Method:</strong> {item.verificationType}{' '}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: '16px' }}>
                            {' '}
                            <strong>Event:</strong> {item.event}
                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', p: 1 }}>
                        <Button variant="contained" color="success" sx={{ mr: 2 }} onClick={handleEditClick}>
                            Edytuj
                        </Button>
                        <Button variant="contained" color="error" onClick={handleDeleteClick}>
                            Usuń
                        </Button>
                    </Box>
                </Card>
            </Grid>
        </>
    );
};

export default WebhooksListItem;

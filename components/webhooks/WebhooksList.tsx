import React, { useContext } from 'react';
import { Button, Box, Grid, Typography } from '@mui/material/';

import WebhooksListItem from './WebhookListItem';
import EditModal from './Modal';
import { ManageWebhookContext } from '../contexts/settings/ManageWebhook';

const WebhooksList = () => {
    const { manageModalState, modalType, modalState, webhooksData } = useContext(ManageWebhookContext);

    const { webhooks } = webhooksData;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>Webhooks</Typography>
            {modalState.show && <EditModal />}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 8 }} justifyContent="center">
                    {webhooks?.data?.map((item) => (
                        <WebhooksListItem key={item.id} item={item} />
                    ))}
                </Grid>
            </Box>

            <Button sx={{ width: '15%' }} variant="contained" onClick={() => manageModalState(modalType[0])}>
                Dodaj
            </Button>
        </Box>
    );
};

export default WebhooksList;

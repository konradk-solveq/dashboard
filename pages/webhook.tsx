import { NextPage } from 'next';
import React, { useContext } from 'react';
import { Container, Box, Typography, CircularProgress, Button } from '@mui/material/';
import ManageWebhookContainer, { ManageWebhookContext } from '../components/contexts/settings/ManageWebhook';
import WebhooksList from '../components/webhooks/WebhooksList';

const ManageWebhook: React.FC = () => {
    const { webhooksData } = useContext(ManageWebhookContext);

    const checkLoading =
        webhooksData.events.isLoading || webhooksData.auth.isLoading || webhooksData.webhooks.isLoading;

    const checkError = webhooksData.events.isError || webhooksData.auth.isError || webhooksData.webhooks.isError;

    return (
        <Container sx={{ maxWidth: '1200px', height: '100%', p: '30px' }}>
            {checkLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                    <CircularProgress />
                </Box>
            )}
            {!checkLoading && checkError && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center' }}>
                    <Typography variant="h3">Nie udało się połączyć z serwerem</Typography>
                </Box>
            )}
            {!checkLoading && !checkError && <WebhooksList />}
        </Container>
    );
};

const WebhookPage: NextPage<{}> = (props) => {
    return (
        <ManageWebhookContainer>
            <ManageWebhook />
        </ManageWebhookContainer>
    );
};

export default WebhookPage;

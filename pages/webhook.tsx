import { NextPage } from 'next';
import React, { useEffect, useContext, useState } from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material/';
import ManageWebhookContainer, { ManageWebhookContext } from '../components/contexts/settings/ManageWebhook';
import { Results } from '../components/typings/Webhooks';
import WebhooksList from '../components/webhooks/WebhooksList';

const ManageWebhook: React.FC = () => {
    const { setResults, errorMessage, fetchApis, isError, isLoading } = useContext(ManageWebhookContext);

    useEffect(() => {
        fetchApis(setResults);
    }, []);

    return (
        <Container sx={{ maxWidth: '1200px', height: '100%', p: '30px' }}>
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                    <CircularProgress />
                </Box>
            )}
            {!isLoading && isError && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center' }}>
                    <Typography variant="h3">Nie udało się połączyć z serwerem</Typography>
                    <Typography variant="h6">
                        {errorMessage[0]}: {errorMessage[1]}
                    </Typography>
                </Box>
            )}
            {!isLoading && !isError && <WebhooksList />}
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

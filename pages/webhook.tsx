import { NextPage } from 'next';
import React, { useEffect, useContext, useState } from 'react';
import { Container, Flex, Heading, Spinner, Text } from 'theme-ui';

import ManageWebhookContainer, { ManageWebhookContext } from '../components/contexts/settings/ManageWebhook';
import { Results } from '../components/typings/Webhooks';
import WebhooksList from '../components/webhooks/WebhooksList';

const ManageWebhook: React.FC = () => {
    const { setResults, errorMessage, fetchApis, isError, isLoading } = useContext(ManageWebhookContext);

    useEffect(() => {
        fetchApis(setResults);
    }, []);

    return (
        <Container p="30px" marginX="auto" sx={{ maxWidth: '1200px', height: '100%' }}>
            {isLoading && (
                <Flex sx={{ justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                    <Spinner />
                </Flex>
            )}
            {!isLoading && isError && (
                <Flex sx={{ flexDirection: 'column', gap: '50px', alignItems: 'center' }}>
                    <Heading as="h1">Nie udało się połączyć z serwerem</Heading>
                    <Text as="h2">
                        {errorMessage[0]}: {errorMessage[1]}
                    </Text>
                </Flex>
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

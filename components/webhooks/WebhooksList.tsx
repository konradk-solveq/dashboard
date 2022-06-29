import React, { useContext } from 'react';
import { Button, Flex, Grid, Heading } from 'theme-ui';

import WebhooksListItem from './WebhookListItem';
import EditModal from './Modal';
import { ManageWebhookContext } from '../contexts/settings/ManageWebhook';

const WebhooksList = () => {
    const { results, manageModalState, modalType, modalState } = useContext(ManageWebhookContext);

    return (
        <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
            <Heading sx={{ textAlign: 'center', fontSize: '2rem' }}>Webhooks</Heading>
            {modalState.show && <EditModal />}
            <Grid columns={2} sx={{ gap: '50px', justifyItems: 'center', width: '100%', margin: '80px 0' }}>
                {results?.webhooks?.map((item) => (
                    <WebhooksListItem key={item.id} item={item} />
                ))}
            </Grid>
            <Button sx={{ width: '15%' }} onClick={() => manageModalState(modalType[0])}>
                Dodaj
            </Button>
        </Flex>
    );
};

export default WebhooksList;

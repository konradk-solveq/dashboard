import React, { useContext } from 'react';
import { Button, Heading } from 'theme-ui';
import { ManageWebhookContext } from '../../contexts/settings/ManageWebhook';

const Success = () => {
    const { manageModalState } = useContext(ManageWebhookContext);

    return (
        <>
            <Heading p={15}>Pomyślnie wysłano zapytanie</Heading>
            <Button sx={{ margin: '20px 0 15px' }} onClick={() => manageModalState()}>
                Wróć
            </Button>
        </>
    );
};

export default Success;

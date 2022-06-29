import React, { useContext } from 'react';
import { Button, Heading, Text } from 'theme-ui';
import { ManageWebhookContext } from '../../contexts/settings/ManageWebhook';

const Error = () => {
    const { errorMessage, manageModalState } = useContext(ManageWebhookContext);

    return (
        <>
            <Heading p={15}>Nie udało się wysłać zapytania.</Heading>
            <Text pb={15} sx={{ display: 'block', fontSize: '1.2rem' }}>
                {`${errorMessage[0]}: ${errorMessage[1]}`}
            </Text>
            <Button sx={{ margin: '15px 0' }} onClick={() => manageModalState()}>
                Wróć
            </Button>
        </>
    );
};

export default Error;

import React, { useContext } from 'react';
import { Button, Flex, Heading } from 'theme-ui';
import { ManageWebhookContext } from '../../contexts/settings/ManageWebhook';

const Delete = () => {
    const { hookToEdit, manageModalState, setIsLoading, apiHandler, deleteWebhook } = useContext(ManageWebhookContext);

    const manageDeleteClick = async (id: string) => {
        setIsLoading(true);
        apiHandler(await deleteWebhook(id), id, 'delete');
    };

    return (
        <>
            <Heading p={15}>Are you sure you want to delete {hookToEdit?.metadata.title}?</Heading>
            <Flex sx={{ justifyContent: 'center', gap: '15px', padding: '15px' }}>
                <Button onClick={() => manageModalState()} bg="grey">
                    Anuluj
                </Button>
                <Button onClick={() => manageDeleteClick(hookToEdit.id)}>Usuń</Button>
            </Flex>
        </>
    );
};

export default Delete;

import React, { useContext } from 'react';
import { Button, Flex, Heading, Text } from 'theme-ui';
import { ManageWebhookContext } from '../contexts/settings/ManageWebhook';

const WebhooksListItem = ({ item }) => {
    const { setHookToEdit, manageModalState, modalType } = useContext(ManageWebhookContext);
    console.log(item);

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
            <Flex sx={{ gap: '50px', alignItems: 'center', width: '400px', justifyContent: 'space-between' }}>
                <Flex sx={{ flexDirection: 'column', gap: '10px', maxWidth: '200px' }}>
                    <Heading>{item.metadata.title}</Heading>
                    <Text>{item.metadata.description}</Text>

                    <Text>Method: {item.verificationType} </Text>
                    <Text> Event: {item.event}</Text>
                </Flex>
                <Flex>
                    <Button backgroundColor="grey" mr={2} onClick={handleEditClick}>
                        Edytuj
                    </Button>
                    <Button onClick={handleDeleteClick}>Usuń</Button>
                </Flex>
            </Flex>
        </>
    );
};

export default WebhooksListItem;

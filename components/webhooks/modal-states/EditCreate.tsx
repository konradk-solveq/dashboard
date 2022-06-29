import React, { useContext } from 'react';
import { Close, Flex, Heading } from 'theme-ui';
import { ManageWebhookContext } from '../../contexts/settings/ManageWebhook';
import EditModalForm from '../EditModalForm';

const EditCreate = () => {
    const { hookToEdit, manageModalState } = useContext(ManageWebhookContext);

    return (
        <>
            <Flex sx={{ justifyContent: 'center' }}>
                <Heading p={10} mb={20} sx={{ flexGrow: 1 }}>
                    {hookToEdit ? 'Edit' : 'Create'}
                </Heading>
                <Close onClick={() => manageModalState()} sx={{ position: 'absolute', right: 10, top: 12 }} />
            </Flex>
            <EditModalForm />
        </>
    );
};

export default EditCreate;

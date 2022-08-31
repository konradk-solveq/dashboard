import styled from '@emotion/styled';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, Alert, Box, MenuItem, Tooltip } from '@mui/material/';
import InfoIcon from '@mui/icons-material/Info';

import { ManageWebhookContext } from '../contexts/settings/ManageWebhook';
import { DefaultWebhookFormValues } from '../typings/Webhooks';

const Form = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
    padding: 15px;
`;

const EditModalForm = () => {
    const { register, handleSubmit, watch, getValues } = useForm<DefaultWebhookFormValues>();
    const { hookToEdit, manageModalState, newWebhook, editWebhook, webhooksData } = useContext(ManageWebhookContext);

    const onSubmit = async (data: DefaultWebhookFormValues) => {
        const hookToUpload = {
            metadata: {
                title: data.title,
                description: data.description,
            },
            event: data.event,
            verificationType: data.authType,
            verificationData: data.authData || null,
        };

        if (!hookToEdit) {
            newWebhook.mutate({ data: hookToUpload });
        } else {
            editWebhook.mutate({ data: hookToUpload, id: hookToEdit.id });
        }
    };

    const { events, auth } = webhooksData;

    const watchAuthType = watch('authType');

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                className="document-input-form document-select-form"
                sx={{ minWidth: '250px', fontWeight: 200 }}
                disableUnderline={true}
                placeholder="Title"
                {...register('title')}
                defaultValue={hookToEdit?.metadata?.title}
                required
            />
            <Input
                placeholder="Description"
                className="document-input-form"
                disableUnderline={true}
                multiline
                {...register('description')}
                sx={{
                    fontSize: '16px',
                    minHeight: '35px',
                    maxHeight: '30vh',
                    overflowY: 'scroll',
                    fontWeight: 200,
                }}
                defaultValue={hookToEdit?.metadata?.description}
                required
            />
            <Box>
                <Select
                    placeholder="Title"
                    className="document-select-form"
                    size="small"
                    {...register('event')}
                    defaultValue={hookToEdit?.event}
                    required
                >
                    {events.data?.events.map((event: 'updateSettings' | 'createAppVersionToPlatform') => (
                        <MenuItem style={{ fontSize: '14px' }} key={event} value={event}>
                            {event}
                        </MenuItem>
                    ))}
                </Select>
                <Tooltip
                    sx={{ padding: '7px 0 0 10px', position: 'absolute' }}
                    title="updateSettings: Wgraj nowe ustawienia,
                    createAppVersionToPlatform: Dodawaj nowe obsługiwane wersje aplikacji, nasłuchując na info ze sklepu że została wydana.
                    "
                >
                    <InfoIcon color="primary" fontSize="small" />
                </Tooltip>
            </Box>
            <Box>
                <Select
                    placeholder="Title"
                    className="document-select-form"
                    {...register('authType')}
                    defaultValue={hookToEdit?.verificationType}
                    required
                >
                    {auth.data?.verificationMethods.map((method) =>
                        method ? (
                            <MenuItem style={{ fontSize: '14px', fontWeight: 200 }} key={method} value={method}>
                                {method}
                            </MenuItem>
                        ) : null,
                    )}
                </Select>
                <Tooltip
                    sx={{ padding: '7px 0 0 10px', position: 'absolute' }}
                    title={
                        watchAuthType === 'jwt'
                            ? 'Użyj tokena JWT podpisanego przez klucz RSA256 albo sekret'
                            : watchAuthType === 'session-token'
                            ? 'Użyj tokena dostarczonego przez api po autoryzacji. Musisz mieć uprawnienia admina.'
                            : watchAuthType === 'none' && 'Jest to niebezpieczna metoda. Używanie jej jest niezalecane.'
                    }
                >
                    <InfoIcon color="primary" fontSize="small" />
                </Tooltip>
            </Box>
            {watchAuthType === 'jwt' && (
                <>
                    <Input
                        placeholder="Auth Data JSON"
                        {...register('authData')}
                        className="document-input-form"
                        disableUnderline={true}
                        multiline
                        sx={{
                            fontSize: '16px',
                            minHeight: '35px',
                            maxHeight: '30vh',
                            overflowY: 'scroll',
                            fontWeight: 200,
                        }}
                        required
                    />
                    <Alert severity="info">
                        Auth data can only be seen during creation. <br /> Subsequently only updates are allowed.
                    </Alert>
                </>
            )}
            <Box sx={{ display: 'flex', gap: '15px', justifyContent: 'center', padding: '25px 0' }}>
                <Button variant="contained" color="error" type="reset" onClick={() => manageModalState()}>
                    Cancel
                </Button>
                <Button variant="contained" color="success" type="submit">
                    {hookToEdit ? 'Update' : 'Create'}
                </Button>
            </Box>
        </Form>
    );
};

export default EditModalForm;

import styled from '@emotion/styled';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, TextField, Alert, Box, MenuItem } from '@mui/material/';
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
    const { register, handleSubmit, watch } = useForm<DefaultWebhookFormValues>();
    const { results, hookToEdit, manageModalState, apiHandler, setIsLoading, putWebhook, postWebhook } =
        useContext(ManageWebhookContext);

    const onSubmit = async (data: DefaultWebhookFormValues) => {
        setIsLoading(true);
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
            apiHandler(await postWebhook(hookToUpload));
        } else {
            apiHandler(await putWebhook(hookToUpload, hookToEdit.id), hookToEdit.id, 'update');
        }
    };

    const watchAuthType = watch('authType');

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                className="document-input-form document-select-form"
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
                }}
                defaultValue={hookToEdit?.metadata?.description}
                required
            />
            <Select
                placeholder="Title"
                className="document-select-form"
                size="small"
                {...register('event')}
                defaultValue={hookToEdit?.event}
                required
            >
                {results.events.events.map((event) => (
                    <MenuItem style={{ fontSize: '14px' }} key={event} value={event}>
                        {event}
                    </MenuItem>
                ))}
            </Select>
            <Select
                placeholder="Title"
                className="document-select-form"
                {...register('authType')}
                defaultValue={hookToEdit?.verificationType}
                required
            >
                {results.auth.verificationMethods.map((event) =>
                    event ? (
                        <MenuItem style={{ fontSize: '14px' }} key={event} value={event}>
                            {event}
                        </MenuItem>
                    ) : null,
                )}
            </Select>
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

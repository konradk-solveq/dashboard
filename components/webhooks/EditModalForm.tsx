import styled from '@emotion/styled';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Flex, Input, Message, Select, Textarea } from 'theme-ui';
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
                placeholder="Title"
                {...register('title')}
                sx={{ textAlign: 'center' }}
                defaultValue={hookToEdit?.metadata?.title}
                required
            />
            <Textarea
                placeholder="Description"
                {...register('description')}
                sx={{ resize: 'none', height: '100px', textAlign: 'center' }}
                defaultValue={hookToEdit?.metadata?.description}
                required
            />
            <Select
                placeholder="Title"
                {...register('event')}
                sx={{ textAlign: 'center' }}
                defaultValue={hookToEdit?.event}
                required
            >
                {results.events.events.map((event) => (
                    <option value={event}>{event}</option>
                ))}
            </Select>
            <Select
                placeholder="Title"
                sx={{ textAlign: 'center' }}
                {...register('authType')}
                defaultValue={hookToEdit?.verificationType}
                required
            >
                {results.auth.verificationMethods.map((event) => (
                    <option value={event.split(/(?=[A-Z])/)}>{event}</option>
                ))}
            </Select>
            {watchAuthType === 'jwt' && (
                <>
                    <Textarea
                        placeholder="Auth Data JSON"
                        {...register('authData')}
                        sx={{ resize: 'none', height: '100px', textAlign: 'center' }}
                        required
                    />
                    <Message bg="lightgrey">
                        Auth data can only be seen during creation. <br /> Subsequently only updates are allowed.
                    </Message>
                </>
            )}
            <Flex sx={{ gap: '15px', justifyContent: 'center', padding: '25px 0' }}>
                <Button bg="grey" type="reset" onClick={() => manageModalState()}>
                    Cancel
                </Button>
                <Button type="submit">{hookToEdit ? 'Update' : 'Create'}</Button>
            </Flex>
        </Form>
    );
};

export default EditModalForm;

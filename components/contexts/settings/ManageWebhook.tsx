import { useMutation, UseMutationResult, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import React, { createContext, SetStateAction, useState } from 'react';
import useWebhooksData from '../../services/useWebhooksData';
import { ModalState, ModalType, Results, Webhook } from '../../typings/Webhooks';
import endpoints from '../../utils/apiEndpoints';

interface IProps {
    modalType: ModalType;
    webhooksData: {
        webhooks: UseQueryResult<Results['webhooks']>;
        auth: UseQueryResult<Results['auth']>;
        events: UseQueryResult<Results['events']>;
    };
    manageModalState: (type?: string) => void;
    modalState: ModalState;
    setModalState: React.Dispatch<SetStateAction<ModalState>>;
    hookToEdit: Webhook | null;
    setHookToEdit: React.Dispatch<SetStateAction<Results['webhooks'] | null>>;
    editWebhook: UseMutationResult<AxiosResponse<Webhook>>;
    newWebhook: UseMutationResult<AxiosResponse<Webhook>>;
    confirmDelete: UseMutationResult<AxiosResponse<Webhook>>;
    checkLoading: boolean;
}

const postWebhook = ({ data }) => axios.post(`${endpoints.webhooks}`, data);

const putWebhook = ({ id, data }) => axios.put(`${endpoints.webhooks}/${id}`, data);

const deleteWebhook = ({ id }) => axios.delete(`${endpoints.webhooks}/${id}`);

export const ManageWebhookContext = createContext<IProps>(null!);

const modalType: ModalType = ['edit/create', 'delete', 'error', 'success'];

const ManageWebhookContainer: React.FC = ({ children }) => {
    const [modalState, setModalState] = useState<ModalState>({
        show: false,
        type: null,
    });
    const [hookToEdit, setHookToEdit] = useState(null);

    const manageModalState = (type?: 'edit/create' | 'delete' | 'success') => {
        setHookToEdit(null);
        setModalState((prev) => ({ show: !prev.show, type: type || prev.type }));
    };

    const queryClient = useQueryClient();

    const webhooksData = useWebhooksData();

    const newWebhook = useMutation(postWebhook, {
        onSuccess: () => {
            queryClient.invalidateQueries(['webhooks']);
        },
    });
    const editWebhook = useMutation(putWebhook, {
        onSuccess: () => {
            queryClient.invalidateQueries(['webhooks']);
        },
    });
    const confirmDelete = useMutation(deleteWebhook, {
        onSuccess: () => {
            queryClient.invalidateQueries(['webhooks']);
        },
    });

    const checkLoading = newWebhook.isLoading || editWebhook.isLoading || confirmDelete.isLoading;

    return (
        <ManageWebhookContext.Provider
            value={{
                webhooksData,
                modalType,
                manageModalState,
                modalState,
                setModalState,
                hookToEdit,
                setHookToEdit,
                newWebhook,
                editWebhook,
                confirmDelete,
                checkLoading,
            }}
        >
            {children}
        </ManageWebhookContext.Provider>
    );
};

export default ManageWebhookContainer;

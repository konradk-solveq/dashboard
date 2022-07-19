import React, { createContext, SetStateAction, useState } from 'react';
import { ErrorMessage, ManageWebhookContextProps, ModalState, ModalType, Results } from '../../typings/Webhooks';

const modalType: ModalType = ['edit/create', 'delete', 'error', 'success'];

export const ManageWebhookContext = createContext<ManageWebhookContextProps>(null!);

const urls = {
    webhooks: `api/webhooks/manage`,
    auth: `api/webhooks/manage/verification-method-list`,
    events: `api/webhooks/manage/event-list`,
};

const postWebhook = (data: object) =>
    fetch(`/api/webhooks/manage`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
    });

const putWebhook = (data: object, id: string) =>
    fetch(`/api/webhooks/manage/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
    });

const deleteWebhook = async (id: string) =>
    await fetch(`/api/webhooks/manage/${id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
    });

const ManageWebhookContainer: React.FC = ({ children }) => {
    const [results, setResults] = useState<Results>({
        webhooks: [],
        auth: {
            verificationMethods: [],
        },
        events: {
            events: [],
        },
    });
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modalState, setModalState] = useState<ModalState>({
        show: false,
        type: null,
    });
    const [hookToEdit, setHookToEdit] = useState(null);
    const [isError, setIsError] = useState(false);

    const fetchApis = async (setter: React.Dispatch<SetStateAction<Results>>) => {
        const responses = await Promise.all(
            Object.entries(urls).map(async ([key, url]) => {
                const res = await fetch(url);
                if (res.status >= 400) {
                    setIsError(true);
                    setErrorMessage([res.status, res.statusText]);
                }
                return [key, await res.json()];
            }),
        );
        setIsLoading(false);
        return setter(Object.fromEntries(responses));
    };

    const clearError = () => {
        setErrorMessage([]);
    };

    const manageModalState = (type?: 'edit/create' | 'delete' | 'success') => {
        setIsLoading(false);
        setHookToEdit(null);
        setModalState((prev) => ({ show: !prev.show, type: type || prev.type }));
    };

    const apiHandler = async (res: Response, id?: string, type?: string) => {
        setIsLoading(false);
        if (res.status >= 400) {
            setModalState({
                show: true,
                type: modalType[2],
            });
            setErrorMessage([res.status, res.statusText]);
        } else {
            setModalState({
                show: true,
                type: modalType[3],
            });
            if (type === 'delete') {
                setResults((results) => {
                    return { ...results, webhooks: results.webhooks.filter((item) => item.id !== id) };
                });
            } else if (type === 'update') {
                const data = await res.json();
                setResults((results) => {
                    return { ...results, webhooks: results.webhooks.map((item) => (item.id === id ? data : item)) };
                });
            } else {
                const data = await res.json();
                setResults((results) => {
                    return { ...results, webhooks: [...results.webhooks, data] };
                });
            }
        }
    };

    return (
        <ManageWebhookContext.Provider
            value={{
                isLoading,
                isError,
                fetchApis,
                setIsLoading,
                clearError,
                apiHandler,
                modalType,
                manageModalState,
                modalState,
                setModalState,
                hookToEdit,
                setHookToEdit,
                results,
                setResults,
                errorMessage,
                setErrorMessage,
                putWebhook,
                postWebhook,
                deleteWebhook,
            }}
        >
            {children}
        </ManageWebhookContext.Provider>
    );
};

export default ManageWebhookContainer;

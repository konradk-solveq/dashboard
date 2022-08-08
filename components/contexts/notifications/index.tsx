import { useMutation, UseMutationResult, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import React, { createContext, SetStateAction, useState } from 'react';
import usePaginatedQuery from '../../services/usePaginatedQuery';
import { Params } from '../../typings/ManagePublications';
import { Notification, NotificationObjectType, Notifications } from '../../typings/Notifications';
import endpoints from '../../utils/apiEndpoints';

interface IProps {
    postNotificationMutation: UseMutationResult<AxiosResponse<Notification>>;
    notificationsQuery: UseQueryResult<Notifications>;
    putNotificationAggregate: (notificationGroup: NotificationObjectType, id: Notification['id']) => void;
    postNotificationAggregate: (notificationGroup: NotificationObjectType) => void;
    sortParams: Params;
    setSortParams: React.Dispatch<SetStateAction<Params>>;
    checkLoading: () => boolean;
    exitModal: () => void;
    openEditForm: (notification: Notification) => void;
    editValues: NotificationObjectType;
    addNotificationFormState: boolean;
    setAddNotificationFormState: React.Dispatch<SetStateAction<boolean>>;
    editHandler: (id: number) => void;
    handleAddNotificationClick: () => void;
    deleteNotificationMutation: UseMutationResult;
}

const postNotification = ({ data }) => {
    return axios.post(endpoints.notifications, data);
};

const putNotification = ({ id, data }) => {
    return axios.put(`${endpoints.notifications}/${id}`, data);
};

const deleteNotification = ({ id }) => {
    return axios.delete(`${endpoints.notifications}/${id}`);
};

export const NotificationsContext = createContext<IProps>(null!);

const NotificationsContainer: React.FC<{}> = ({ children }) => {
    const [sortParams, setSortParams] = useState({
        page: 1,
        order: 'ASC',
        orderBy: 'showDate',
        type: '',
        limit: 10,
    });
    const [addNotificationFormState, setAddNotificationFormState] = useState(false);
    const [editValues, setEditValues] = useState(null);

    const { page, limit, type, order, orderBy } = sortParams;
    const queryClient = useQueryClient();

    const notificationsQuery = usePaginatedQuery(
        'notifications',
        endpoints.notifications,
        page,
        limit,
        type,
        order,
        orderBy,
    );

    const postNotificationMutation = useMutation(postNotification);

    const putNotificationMutation = useMutation(putNotification, {
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications']);
        },
    });
    const deleteNotificationMutation = useMutation(deleteNotification, {
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications']);
        },
    });

    const checkLoading = () =>
        notificationsQuery.isLoading ||
        postNotificationMutation.isLoading ||
        putNotificationMutation.isLoading ||
        deleteNotificationMutation.isLoading;

    const openEditForm = (notification: Notification) => {
        setEditValues(notification);
        setAddNotificationFormState((prev) => !prev);
    };

    const handleAddNotificationClick = () => {
        setEditValues(null);
        setAddNotificationFormState((prev) => !prev);
    };

    const exitModal = () => {
        setEditValues(null);
        setAddNotificationFormState((prev) => !prev);
    };

    function editHandler(id: Notification['id']) {
        const object = notificationsQuery.data.elements.find((x: Notification) => x.id === id);
        setEditValues(object);
        setAddNotificationFormState((prev) => !prev);
    }

    const postNotificationAggregate = (notificationGroup: NotificationObjectType) => {
        postNotificationMutation.mutate({ data: notificationGroup });
        setAddNotificationFormState((prev) => !prev);
    };

    const putNotificationAggregate = (notificationGroup: NotificationObjectType, id: Notification['id']) => {
        putNotificationMutation.mutate({ data: notificationGroup, id: id });
        setAddNotificationFormState((prev) => !prev);
    };

    return (
        <NotificationsContext.Provider
            value={{
                postNotificationMutation,
                handleAddNotificationClick,
                notificationsQuery,
                postNotificationAggregate,
                putNotificationAggregate,
                sortParams,
                exitModal,
                setSortParams,
                checkLoading,
                openEditForm,
                editValues,
                addNotificationFormState,
                setAddNotificationFormState,
                editHandler,
                deleteNotificationMutation,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};

export default NotificationsContainer;

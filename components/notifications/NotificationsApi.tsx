import React, { createContext, useEffect, useState } from 'react';
import { LanguageType, NotificationsType, sortParamsType } from '../typings/Notifications';

interface IProps {
    availableLanguages?: LanguageType[];
    notifications?: NotificationsType[];
    postNotifications: (data: { name: string }) => Promise<void>;
    prevPageURL?: string;
    nextPageURL?: string;
    retrieveNotifications: (url?: string, sortOrder?: string, sortTypeOrder?: string, type?: string) => Promise<void>;
    deleteNotifications: (id: number) => Promise<void>;
    editNotifications: (data: object, id: number) => Promise<void>;
    sortParams?: sortParamsType;
    loading?: boolean;
    error?: boolean;
}

export const NotificationsContext = createContext<IProps>(null!);

const NotificationsContainer: React.FC<{}> = ({ children }) => {
    const [availableLanguages, setAvailableLanguages] = useState<LanguageType[] | undefined>();
    const [notifications, setNotifications] = useState<NotificationsType[] | undefined>();
    const [prevPageURL, setPrevPageURL] = useState();
    const [nextPageURL, setNextPageURL] = useState();
    const [sortParams, setSortParams] = useState({
        sortOrder: `ASC`,
        sortTypeOrder: `name`,
        type: '',
        defaultUrl: `/api/notifications/manage?page=1&limit=10`,
    });
    const [loading, setLoading] = useState(false);

    const retrieveNotifications = async (
        sortOrder?: string,
        sortTypeOrder?: string,
        type?: string,
        defaultUrl?: string,
    ) => {
        if (!defaultUrl) {
            defaultUrl = sortParams.defaultUrl;
        }
        if (!sortOrder) {
            sortOrder = sortParams.sortOrder;
        }

        if (!sortTypeOrder) {
            sortTypeOrder = sortParams.sortTypeOrder;
        }

        const dataWithPage = await fetch(
            `${defaultUrl}&${type ? `type=${type}&` : ''}order=${sortOrder}&orderBy=${sortTypeOrder}`,
        );
        const resultData = await dataWithPage.json();

        setSortParams({ sortOrder: sortOrder, sortTypeOrder: sortTypeOrder, type: type, defaultUrl: defaultUrl });
        setNextPageURL(resultData?.links.next);
        setPrevPageURL(resultData?.links.prev);
        setNotifications(resultData.elements);
    };

    const postNotifications = async (data: object) => {
        setLoading(true);
        const settings = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' },
        };
        try {
            const fetchResponse = await fetch(`/api/notifications/manage`, settings);
            const data = await fetchResponse.json();
            setLoading(false);
            return data;
        } catch (err) {
            console.error(err);
            setLoading(false);
            return err;
        }
    };

    const editNotifications = async (data: object, id: number) => {
        setLoading(true);
        const settings = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' },
        };
        try {
            const fetchResponse = await fetch(`/api/notifications/manage/${id}`, settings);
            const data = await fetchResponse.json();
            setLoading(false);
            return data;
        } catch (err) {
            console.error(err);
            setLoading(false);
            return err;
        }
    };

    const deleteNotifications = async (id: number) => {
        setLoading(true);
        try {
            const fetchResponse = await fetch(`/api/notifications/manage/${id}`, {
                method: 'DELETE',
            });
            const data = await fetchResponse.json();
            setLoading(false);
            return data;
        } catch (err) {
            console.error(err);
            setLoading(false);
            return err;
        }
    };

    const getAvailableLanguages = async () => {
        const data = await fetch(`/api/application/config`);
        const result = await data.json();
        setAvailableLanguages(result.langs);
    };

    useEffect(() => {
        getAvailableLanguages();
        retrieveNotifications(sortParams.sortOrder, sortParams.sortTypeOrder, sortParams.type);
    }, []);
    return (
        <NotificationsContext.Provider
            value={{
                availableLanguages,
                notifications,
                postNotifications,
                prevPageURL,
                nextPageURL,
                retrieveNotifications,
                deleteNotifications,
                editNotifications,
                sortParams,
                loading,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};

export default NotificationsContainer;

import React, { createContext, useEffect, useState } from 'react';
import { LanguageType, NotificationsType } from '../typings/Notifications';

interface IProps {
    availableLanguages?: LanguageType[];
    notifications?: NotificationsType[];
    postNotifications: (data: { name: string }) => Promise<void>;
    prevPageURL?: string;
    nextPageURL?: string;
    retrieveNotifications: (url: string, sortOrder: string, sortTypeOrder: string, type: string) => Promise<void>;
    deleteNotifications: (id: number) => Promise<void>;
}

export const NotificationsContext = createContext<IProps>(null!);

const NotificationsContainer: React.FC<{}> = ({ children }) => {
    const [availableLanguages, setAvailableLanguages] = useState<LanguageType[] | undefined>();
    const [notifications, setNotifications] = useState<NotificationsType[] | undefined>();
    const [prevPageURL, setPrevPageURL] = useState();
    const [nextPageURL, setNextPageURL] = useState();

    const retrieveNotifications = async (defaultUrl, sortOrder, sortTypeOrder, type) => {
        if (!defaultUrl) {
            defaultUrl = `/api/notifications/manage?page=1&limit=10`;
        }
        if (!sortOrder) {
            sortOrder = `ASC`;
        }

        if (!sortTypeOrder) {
            sortTypeOrder = `name`;
        }

        if (!type) {
            type = `documents`;
        }

        const dataWithPage = await fetch(`${defaultUrl}&type=${type}&order=${sortOrder}&orderBy=${sortTypeOrder}`);
        const resultData = await dataWithPage.json();

        setNextPageURL(resultData?.links.next);
        setPrevPageURL(resultData?.links.prev);
        setNotifications(resultData.elements);
    };

    const postNotifications = async (data: object) => {
        const settings = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' },
        };
        try {
            const fetchResponse = await fetch(`/api/notifications/manage`, settings);
            const data = await fetchResponse.json();
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const deleteNotifications = async (id: number) => {
        try {
            const fetchResponse = await fetch(`/api/notifications/manage/${id}`, {
                method: 'DELETE',
            });
            const data = await fetchResponse.json();
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const getAvailableLanguages = async () => {
        const data = await fetch(`/api/application/config`);
        const result = await data.json();
        setAvailableLanguages(result.langs);
    };

    useEffect(() => {
        getAvailableLanguages();
        retrieveNotifications();
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
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};

export default NotificationsContainer;

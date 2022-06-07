import React, { createContext, useEffect, useState } from 'react';
import { LanguageType, NotificationsType } from '../typings/Notifications';
import data from './data';

interface IProps {
    availableLanguages?: LanguageType[];
    notifications?: NotificationsType[];
}

export const NotificationsContext = createContext<IProps>(null!);

const NotificationsContainer: React.FC<{}> = ({ children }) => {
    const [availableLanguages, setAvailableLanguages] = useState<LanguageType[] | undefined>();
    const [notifications, setNotifications] = useState<NotificationsType[] | undefined>();

    const fetchNotifications = () => {
        setNotifications(data);
    };

    const getAvailableLanguages = async () => {
        const data = await fetch(`/api/application/config`);
        const result = await data.json();
        setAvailableLanguages(result.langs);
    };

    useEffect(() => {
        getAvailableLanguages();
        fetchNotifications();
    }, []);
    return (
        <NotificationsContext.Provider value={{ availableLanguages, notifications }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export default NotificationsContainer;

import React,{ createContext, useEffect, useState }  from 'react';
import { LanguageType } from '../typings/Notifications';

interface IProps {availableLanguages?: LanguageType[]}

export const NotificationsContext = createContext<IProps>(null!)

const NotificationsContainer: React.FC<{}> = ({ children }) => {
    const [availableLanguages, setAvailableLanguages] = useState<LanguageType[] | 
        undefined>();
    
    const getAvailableLanguages = async () => {
        const data = await fetch(`/api/application/config`);
        const result = await data.json();
        setAvailableLanguages(result.langs);
    };
    
    useEffect(() => {
        getAvailableLanguages();
    }, []);
    return (
       <NotificationsContext.Provider value={{availableLanguages}}>
           {children}
       </NotificationsContext.Provider>
    )
}

export default NotificationsContainer
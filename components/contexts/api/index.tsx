import React, { createContext } from 'react';
import { EventsContextContainer } from './EventsContext';
import { ManageContextContainer } from './ManageContext';
export interface ApiContextProps {
    config: AppConfig;
}

class LocalizedEnum {
    enumValue: string;
    i18nValue: string;
}
class Language {
    name: string;
    displayName: string;
}

export type AppConfig = {
    name: string;
    lang: string;
    langs: Language[];
    tags: LocalizedEnum[];
    surfaces: LocalizedEnum[];
    difficulties: LocalizedEnum[];
    reactions: LocalizedEnum[];
};

export interface ApiContextInterface {
    config: AppConfig;
}

const ApiContext = createContext<ApiContextInterface>(null!);

export const ApiContextContainer: React.FC<ApiContextProps> = ({ children, config }) => {
    return (
        <ApiContext.Provider value={{ config }}>
            <EventsContextContainer>
                <ManageContextContainer>{children}</ManageContextContainer>
            </EventsContextContainer>
        </ApiContext.Provider>
    );
};

export default ApiContext;

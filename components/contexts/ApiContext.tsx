import React, { createContext } from 'react';
import { EventsContextContainer } from './EventsContext';
import { ManageContextContainer } from './ManageContext';
export interface ApiContextProps {}

export interface ApiContextInterface {}
const context = createContext<ApiContextInterface>(null!);

export const ApiContextContainer: React.FC<ApiContextProps> = ({ children }) => {
    return (
        <EventsContextContainer>
            <ManageContextContainer>{children}</ManageContextContainer>
        </EventsContextContainer>
    );
};

export default context;

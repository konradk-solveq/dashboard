import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import EventsContext from './EventsContext';
export interface ManageContextProps {}

export interface ManageContextInterface {
    publish: (id: string) => void;
    unpublish: (id: string) => void;
}
const ManageContext = createContext<ManageContextInterface>(null!);

export const ManageContextContainer: React.FC<ManageContextProps> = ({ children }) => {
    const { scheduleUpdate } = useContext(EventsContext);

    const publish = useCallback(
        async (id: string) => {
            const response = await fetch(`/api/cycling-map/manage/${id}/publish `, { method: 'POST' });
            const notifyId = await response.text();
            scheduleUpdate({ routeId: id, notifyId });
        },
        [scheduleUpdate],
    );
    const unpublish = useCallback(
        async (id: string) => {
            const response = await fetch(`/api/cycling-map/manage/${id}/publish `, { method: 'DELETE' });
            const notifyId = await response.text();
            scheduleUpdate({ routeId: id, notifyId });
        },
        [scheduleUpdate],
    );

    return <ManageContext.Provider value={{ publish, unpublish }}>{children}</ManageContext.Provider>;
};

export default ManageContext;

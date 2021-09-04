import { createContext, useState, useEffect, useCallback } from 'react';
import EventSource from 'eventsource';
export interface FetchStatus<T> {
    data: T | null;
    ready: boolean;
    error: string;
}
export interface ApiContextProps {}

export interface ApiContextInterface {
    getEventStatus(id: string): EventStatusType;
    getRouteStatus(id: string): EventStatusType;
}
const context = createContext<ApiContextInterface>(null!);

type EventStatusType = 'processed' | 'started' | 'error';

export interface Message {
    status: EventStatusType;
    id: string;
    notifyId: string;
}

export interface Event {
    channel: string;
    message: Message;
}

export const ApiContextContainer: React.FC<ApiContextProps> = ({ children }) => {
    const [, setStream] = useState<EventSource>();
    const [eventsStatus, setEventStatus] = useState<Record<string, EventStatusType>>({});
    const [routesStatus, setRouteStatus] = useState<Record<string, EventStatusType>>({});

    useEffect(() => {
        const theStream = new EventSource('/api/events/all', { withCredentials: true });
        theStream.addEventListener('message', (rawEvent) => {
            if (typeof rawEvent === 'object') {
                const parsedEvent = JSON.parse(rawEvent.data) as Event;
                const { status, id, notifyId } = parsedEvent.message;
                setEventStatus((events) => ({ ...events, [notifyId]: status }));
                setRouteStatus((routes) => ({ ...routes, [id]: status }));
            }
        });
        setStream(theStream);
    }, []);

    const routeStatus = useCallback(
        (id: string) => {
            return routesStatus[id] as EventStatusType;
        },
        [routesStatus],
    );

    const eventStatus = useCallback(
        (id: string) => {
            return eventsStatus[id] as EventStatusType;
        },
        [eventsStatus],
    );

    return (
        <context.Provider
            value={{
                getEventStatus: eventStatus,
                getRouteStatus: routeStatus,
            }}
        >
            {children}
        </context.Provider>
    );
};

export default context;

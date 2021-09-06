import { createContext, useState, useEffect, useCallback } from 'react';
import EventSource from 'eventsource';
export interface EventsContextProps {}

export interface EventsContextInterface {
    getEventStatus(notifyId: string): EventStatusType;
    getRouteStatus(routeId: string): EventStatusType;
    getRouteUpdates(routeId: string): number;
    scheduleUpdate(update: { notifyId: string; routeId: string }): void;
}
const EventsContext = createContext<EventsContextInterface>(null!);

type EventStatusType = 'scheduled' | 'processed' | 'started' | 'error';

export interface Message {
    status: EventStatusType;
    id: string;
    notifyId: string;
}

export interface Event {
    channel: string;
    message: Message;
}

export const EventsContextContainer: React.FC<EventsContextProps> = ({ children }) => {
    const [, setStream] = useState<EventSource>();
    const [routeUpdates, setRouteUpdates] = useState<Record<string, number>>({});
    const [eventsStatus, setEventStatus] = useState<Record<string, EventStatusType>>({});
    const [routesStatus, setRouteStatus] = useState<Record<string, EventStatusType>>({});

    useEffect(() => {
        const theStream = new EventSource('/api/events/all', { withCredentials: true });
        theStream.addEventListener('message', (rawEvent) => {
            if (typeof rawEvent === 'object') {
                const parsedEvent = JSON.parse(rawEvent.data) as Event;
                const { status, id, notifyId } = parsedEvent.message;
                if (status === 'processed') {
                    setRouteUpdates((events) => ({ ...events, [id]: (events[id] || 0) + 1 }));
                }
                setEventStatus((events) => ({ ...events, [notifyId]: status }));
                setRouteStatus((routes) => ({ ...routes, [id]: status }));
            }
        });
        setStream(theStream);
    }, []);

    const getRouteStatus = useCallback(
        (id: string) => {
            return (routesStatus[id] as EventStatusType) || 'processed';
        },
        [routesStatus],
    );

    const getEventStatus = useCallback(
        (id: string) => {
            return eventsStatus[id] as EventStatusType;
        },
        [eventsStatus],
    );

    const getRouteUpdates = useCallback(
        (id: string) => {
            return routeUpdates[id] || 0;
        },
        [routeUpdates],
    );

    const scheduleUpdate = useCallback(
        ({ notifyId, routeId }: { notifyId: string; routeId: string }) => {
            setEventStatus((events) => ({ ...events, [notifyId]: 'scheduled' }));
            setRouteStatus((events) => ({ ...events, [routeId]: 'scheduled' }));
        },
        [setEventStatus, setRouteStatus],
    );

    return (
        <EventsContext.Provider value={{ getEventStatus, getRouteStatus, getRouteUpdates, scheduleUpdate }}>
            {children}
        </EventsContext.Provider>
    );
};

export default EventsContext;

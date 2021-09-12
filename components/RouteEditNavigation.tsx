import React, { useEffect, useState } from 'react';
import RouteEdit from './pages/RouteEdit';
import { Route } from './typings/Route';
interface Props {
    elements: Route[];
    routeId: string;
    limit: number;
    getPathForRoute: (routeId?: string, page?: number) => string;
    page: number;
    links: {
        next?: string;
        prev?: string;
    };
}
const lookupResponseToElements = async (r: Response) => {
    const data = await r.json();
    return data.elements as { id: string }[];
};

export const RouteEditComponent: React.FC<Props> = (props) => {
    const { elements = [], limit, routeId, links, getPathForRoute, page } = props;

    const routeIndex = elements.findIndex((el) => el.id === routeId);
    const [navigation, setNavigation] = useState({
        nextRouteUrl: '',
        previousRouteUrl: '',
        back: getPathForRoute(undefined, page),
    });
    const [siblings, setSiblings] = useState({ previous: [], next: [] });

    useEffect(() => {
        const { previous: prev } = siblings;
        if (routeIndex > 0) {
            setNavigation((nav) => ({ ...nav, previousRouteUrl: getPathForRoute(elements[routeIndex - 1]?.id) }));
        } else if (prev.length > 0) {
            setNavigation((nav) => ({ ...nav, previousRouteUrl: getPathForRoute(prev[prev.length - 1].id, page - 1) }));
        } else {
            setNavigation((nav) => ({ ...nav, previousRouteUrl: '' }));
        }
    }, [routeId, elements, siblings, page]);

    useEffect(() => {
        const { next } = siblings;
        if (routeIndex < elements.length - 1) {
            setNavigation((nav) => ({ ...nav, nextRouteUrl: getPathForRoute(elements[routeIndex + 1]?.id) }));
        } else if (next.length > 0) {
            setNavigation((nav) => ({ ...nav, nextRouteUrl: getPathForRoute(next[0].id, page + 1) }));
        } else {
            setNavigation((nav) => ({ ...nav, nextRouteUrl: '' }));
        }
    }, [routeId, elements, siblings, page]);

    useEffect(() => {
        const aborter = new AbortController();
        setSiblings({ previous: [], next: [] });
        (async () => {
            let prevP, nextP;
            if (routeIndex === 0 && links.prev) {
                prevP = fetch(links.prev, { signal: aborter.signal }).then(lookupResponseToElements);
            }
            if (routeIndex === elements.length - 1 && links.next) {
                nextP = fetch(links.next, { signal: aborter.signal }).then(lookupResponseToElements);
            }
            const [prev = [], next = []] = await Promise.all([prevP, nextP]);
            setSiblings({ next, previous: prev });
        })();
        return () => {
            aborter.abort();
            setSiblings({ previous: [], next: [] });
        };
    }, [routeId, links, elements]);

    return <RouteEdit routeId={routeId as string} {...navigation} />;
};

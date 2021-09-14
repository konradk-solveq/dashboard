import React, { createContext, useCallback, useEffect, useState } from 'react';
import RouteEdit from '../../../componentsSSP/routes/edit/Form_';
import { Route } from '../../typings/Route';
interface RouteNavigationContainerProps {
    elements: Route[];
    routeId: string;
    page: number;
    links: {
        next?: string;
        prev?: string;
    };
    getPathForRoute: (routeId?: string, page?: number) => string;
    getPathForBack: (routeId?: string, page?: number) => string;
}

const lookupResponseToElements = async (r: Response) => {
    const data = await r.json();
    return data.elements as { id: string }[];
};

type NavigationType = {
    nextRouteUrl: string;
    previousRouteUrl: string;
    backUrl: string;
};

export type RouteNavigationContextProps = NavigationType & {};

const RouteNavigationContext = createContext<RouteNavigationContextProps>(null!);

export const RouteNavigationContainer: React.FC<RouteNavigationContainerProps> = (props) => {
    const { elements = [], routeId, links = {}, getPathForRoute, getPathForBack, page } = props;
    const routeIndex = elements.findIndex((el) => el.id === routeId);

    const [navigation, setNavigation] = useState<NavigationType>({
        nextRouteUrl: '',
        previousRouteUrl: '',
        backUrl: getPathForBack(null, page),
    });
    const [siblings, setSiblings] = useState({ previous: [], next: [] });

    const updateNavigationField = useCallback(
        (field: keyof NavigationType) => (value: string) => {
            return setNavigation((n: NavigationType) => ({ ...n, [field]: value }));
        },
        [setNavigation],
    );

    const retrieveSiblingsIfNeeded = () => {
        const aborter: AbortController = new AbortController();
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
    };

    const updatePreviousUrlEffect = () => {
        const { previous } = siblings;
        const updatePreviousUrl = updateNavigationField('previousRouteUrl');
        if (routeIndex > 0) {
            updatePreviousUrl(getPathForRoute(elements[routeIndex - 1]?.id));
        } else if (previous.length > 0) {
            updatePreviousUrl(getPathForRoute(previous[previous.length - 1].id, page - 1));
        } else {
            updatePreviousUrl('');
        }
    };

    const updateNextUrlEffect = () => {
        const { next } = siblings;
        const updateNextUrl = updateNavigationField('nextRouteUrl');
        if (routeIndex < elements.length - 1) {
            updateNextUrl(getPathForRoute(elements[routeIndex + 1]?.id));
        } else if (next.length > 0) {
            updateNextUrl(getPathForRoute(next[0].id, page + 1));
        } else {
            updateNextUrl('');
        }
    };

    useEffect(retrieveSiblingsIfNeeded, [routeId, links, elements]);
    useEffect(updatePreviousUrlEffect, [routeId, elements, siblings.previous, page, updateNavigationField]);
    useEffect(updateNextUrlEffect, [routeId, elements, siblings.next, page, updateNavigationField]);

    return (
        <RouteNavigationContext.Provider value={{ ...navigation }}>{props.children}</RouteNavigationContext.Provider>
    );
};

export default RouteNavigationContext;

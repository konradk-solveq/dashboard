import React, { useCallback, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';

import fetcher from '../../../helpers/fetcher';
import { FeaturedSectionDTO } from '../../typings/FeaturedSection';
import { Route } from '../../typings/Route';
import { useDebounce } from '../../utils/useDebounce';
import { FeaturedSectionContext, FeaturedSectionRouteSearchContext } from './contexts';

export const FeaturedSectionRouteSearchContainer: React.FC<{}> = ({ children }) => {
    const {
        section: { routes: existingRoutes },
    } = useContext(FeaturedSectionContext);
    const existingRoutesIds = existingRoutes.map((r) => r.routeId);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [allRoutes, setAllRoutes] = useState<Route[]>([]);
    const [routes, setRoutes] = useState<Route[]>([]);
    const debouncedQuery = useDebounce(query, 300);
    useEffect(() => {
        setIsLoading(!!query);
        setRoutes([]);
    }, [query, setIsLoading, setRoutes]);

    useEffect(() => {
        const aborter = new AbortController();
        if (!debouncedQuery) {
            setRoutes([]);
            return;
        }

        fetch(`/api/cycling-map/manage/lookup?name=${debouncedQuery}&public=true&page=1&limit=10`, {
            signal: aborter.signal,
        })
            .then((r) => r.json())
            .then(({ elements }) => setAllRoutes(elements))
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));

        return () => {
            aborter.abort();
            setIsLoading(false);
        };
    }, [debouncedQuery, setRoutes, setIsLoading]);

    useEffect(() => {
        const isNotExisting: any = (route: Route) => !existingRoutesIds.includes(route.id);
        setRoutes(allRoutes.filter(isNotExisting));
    }, [existingRoutes, allRoutes]);

    return (
        <FeaturedSectionRouteSearchContext.Provider value={{ query, isLoading, setQuery, routes }}>
            {children}
        </FeaturedSectionRouteSearchContext.Provider>
    );
};
export default FeaturedSectionRouteSearchContext;

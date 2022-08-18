import React, { useEffect, useState } from 'react';
import qs from 'querystring';
import { useDebounce } from '../../components/utils/useDebounce';
import { useRouter } from 'next/dist/client/router';
import { RouteNavigationContainer } from '../../components/contexts/route/RouteNavigationContext';
import Form from '../../componentsSSP/routes/edit/Form';
import getQueryFn from '../../components/utils/getQueryFn';
import { useQuery } from '@tanstack/react-query';
import endpoints from '../../components/utils/apiEndpoints';
import config from '../../helpers/queryConfig';
const defaultTo = { elements: [], total: 0, links: {}, limit: 0 };

export default function Page({}) {
    const { query, pathname, replace, asPath } = useRouter();
    const [name, setName] = useState<string>(query?.q?.toString() || '');
    const page = Number(query?.page);

    const debouncedName = useDebounce(name, 333);

    const { data: { elements, links } = defaultTo, error } = useQuery(
        ['routeStatistics', page, debouncedName],
        () =>
            getQueryFn(
                `${endpoints.cyclingMap}/lookup?${
                    page || debouncedName ? qs.stringify({ name: debouncedName, page, limit: 500 }) : ''
                }`,
            ),
        { ...config },
    );

    const routeId = query.routeId?.toString();

    const queryString = (routeId?: string, page?: number) =>
        qs.stringify({
            ...query,
            routeId: routeId === null ? undefined : routeId || query.routeId,
            page: page || query.page || 1,
            q: debouncedName,
        });

    function getPathForRoute(routeId?: string, page?: number) {
        return `${pathname}?${queryString(routeId, page)}`;
    }

    function getPathForBack(routeId?: string, page?: number) {
        return `/routes/list?${queryString(routeId, page)}`;
    }

    useEffect(() => {
        const path = getPathForRoute();
        if (asPath !== path) {
            replace(path, undefined, { scroll: false });
        }
    }, [pathname, query, asPath, page, debouncedName]);

    if (!elements && !getPathForRoute && !links && !routeId && !page) {
        return <div>Loading ...</div>;
    }

    return (
        <RouteNavigationContainer {...{ elements, getPathForRoute, getPathForBack, links, routeId, page }}>
            <Form routeId={routeId} />
        </RouteNavigationContainer>
    );
}

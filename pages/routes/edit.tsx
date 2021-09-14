import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import qs from 'querystring';
import { useDebounce } from '../../components/utils/useDebounce';
import fetcher from '../../helpers/fetcher';
import { useRouter } from 'next/dist/client/router';
import { RouteNavigationContainer } from '../../components/contexts/route/RouteNavigationContext';
import Form from '../../componentsSSP/routes/edit/Form';
const defaultTo = { elements: [], total: 0, links: {}, limit: 0 };

export default function Page({ }) {
    const { query, pathname, replace, asPath } = useRouter();
    const [name, setName] = useState<string>(query?.q?.toString() || '');
    const page = Number(query?.page);


    const [url, setUrl] = useState(`/api/cycling-map/manage/lookup`);
    const { data: { elements, links } = defaultTo, error } = useSWR<any>(url, fetcher);
    const debouncedName = useDebounce(name, 333);

    useEffect(() => {
        setUrl(`/api/cycling-map/manage/lookup?${qs.stringify({ name: debouncedName, page, limit: 12 })}`);
    }, [debouncedName, page]);

    const routeId = query.routeId?.toString();

    const queryString = qs.stringify({
        ...query,
        routeId: routeId === null ? undefined : routeId || query.routeId,
        page: page || query.page || 1,
        q: debouncedName,
    });

    function getPathForRoute(routeId?: string, page?: number) {
        return `${pathname}?${queryString}`;
    }

    function getPathForBack(routeId?: string, page?: number) {
        return `/routes/list?${queryString}`;
    }

    useEffect(() => {
        const path = getPathForRoute();
        if (asPath !== path) {
            replace(path, undefined, { scroll: false });
        }
    }, [pathname, query, asPath, page, debouncedName]);


    if (!elements && !getPathForRoute && !links && !routeId && !page) {
        return <div>Loading ...</div>
    }

    return (
        <RouteNavigationContainer {...{ elements, getPathForRoute,getPathForBack, links, routeId, page }}>
            <Form routeId={routeId} />
        </RouteNavigationContainer>
    );
}

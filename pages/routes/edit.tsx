import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import qs from 'querystring';
import { useDebounce } from '../../components/utils/useDebounce';
import fetcher from '../../helpers/fetcher';
import { useRouter } from 'next/dist/client/router';
import { RouteNavigationContainer } from '../../components/contexts/route/RouteNavigationContext';
import Form from '../../componentsSSP/routes/edit/form';
const defaultTo = { elements: [], total: 0, links: {}, limit: 0 };

export default function Page({ }) {
    const { query, pathname, replace, asPath } = useRouter();
    console.log('%c pathname:', 'background: #ffcc00; color: #003300', pathname)
    const [name, setName] = useState<string>(query?.q?.toString() || '');
    const page = Number(query?.page);


    const [url, setUrl] = useState(`/api/cycling-map/manage/lookup`);
    const { data: { elements, links } = defaultTo, error } = useSWR<any>(url, fetcher);
    const debouncedName = useDebounce(name, 333);

    useEffect(() => {
        setUrl(`/api/cycling-map/manage/lookup?${qs.stringify({ name: debouncedName, page, limit: 12 })}`);
    }, [debouncedName, page]);

    const routeId = query.routeId?.toString();

    function getPathForRoute(routeId?: string, page?: number) {
        const queryString = qs.stringify({
            ...query,
            routeId: routeId === null ? undefined : routeId || query.routeId,
            page: page || query.page || 1,
            q: debouncedName,
        });
        const path = `${pathname}?${queryString}`;
        return path;
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
        <RouteNavigationContainer {...{ elements, getPathForRoute, links, routeId, page }}>
            <Form routeId={routeId} />
        </RouteNavigationContainer>
    );
}

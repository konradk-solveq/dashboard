import React, { useEffect, useState } from 'react';
import { Box, Container, Paper, Divider, InputBase } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import qs from 'querystring';
import { useDebounce } from '../../components/utils/useDebounce';
import PagesBar from '../../components/bar/PagesBar';
import { useRouter } from 'next/dist/client/router';
import Tile from '../../componentsSSP/routes/list/Tile';
import { useQuery } from '@tanstack/react-query';
import getQueryFn from '../../components/utils/getQueryFn';
import endpoints from '../../components/utils/apiEndpoints';
import config from '../../helpers/queryConfig';
const defaultTo = { elements: [], total: 0, links: {}, limit: 0 };

export default function Page({}) {
    const { query, pathname, replace, asPath } = useRouter();
    const [name, setName] = useState<string>(query?.q?.toString() || '');
    const page = Number(query?.page);

    const setPage = (n: number) => {
        const path = getPathForRoute(undefined, n);
        replace(path, undefined, { scroll: false });
    };

    const debouncedName = useDebounce(name, 333);

    const { data: { total, elements, links, limit } = defaultTo, error } = useQuery(
        ['routeList', page, debouncedName],
        () => getQueryFn(`${endpoints.cyclingMap}/lookup?${qs.stringify({ name: debouncedName, page, limit: 12 })}`),
        { ...config },
    );
    const debouncedTotal = useDebounce(total, 125);
    const debouncedLimit = useDebounce(limit, 125);

    const pagesNumber = Math.ceil(debouncedTotal / debouncedLimit);
    const pages = Array(isFinite(pagesNumber) ? pagesNumber : 1)
        .fill(0)
        .map((v, i) => i + 1);

    const getPathForRoute = (routeId?: string, page?: number) => {
        const queryString = qs.stringify({
            ...query,
            routeId: routeId === null ? undefined : routeId || query.routeId,
            page: page || query.page || 1,
            q: debouncedName,
        });
        const path = `${pathname}?${queryString}`;
        return path;
    };

    useEffect(() => {
        const path = getPathForRoute();
        if (asPath !== path) {
            replace(path, undefined, { scroll: false });
        }
    }, [pathname, query, asPath, page, debouncedName]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Divider
                        textAlign="left"
                        sx={{
                            width: '85vw',
                            fontSize: '24px',
                            fontWeight: '400',
                            mt: '10px',
                            mb: '10px',
                            maxWidth: '1200px',
                        }}
                    >
                        Lista tras
                    </Divider>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mr: '16px' }}
                    >
                        <SearchIcon />
                        <InputBase
                            sx={{ ml: 1, flex: 1, fontSize: '16px' }}
                            placeholder="Wyszukaj po nazwie"
                            defaultValue={query.q}
                            inputProps={{ 'aria-label': 'Wyszukaj po nazwie' }}
                            onChange={(e) => {
                                setPage(1);
                                setName(e.target.value);
                            }}
                        />
                    </Paper>
                    <PagesBar page={page} pages={pages} setPage={setPage} />
                </Box>
            </Box>

            {elements.length === 0 ? null : (
                <>
                    <Container sx={{ margin: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
                        {elements?.map((el, index) => {
                            const bg = index % 2 ? 'primary' : 'muted';
                            return <Tile key={el.id} bg={bg} route={el} page={page} q={debouncedName}></Tile>;
                        })}
                    </Container>
                </>
            )}

            <PagesBar page={page} pages={pages} setPage={setPage} />
        </Box>
    );
}

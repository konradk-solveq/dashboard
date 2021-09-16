import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { Box, Grid, Input } from 'theme-ui';
import qs from 'querystring';
import { useDebounce } from '../../components/utils/useDebounce';
import fetcher from '../../helpers/fetcher';
import { useResponsiveValue } from '@theme-ui/match-media';
import PagesBar from '../../components/bar/PagesBar';
import { useRouter } from 'next/dist/client/router';
import Tile from '../../componentsSSP/routes/list/Tile';
const defaultTo = { elements: [], total: 0, links: {}, limit: 0 };

export default function Page({ }) {
    const { query, pathname, replace, asPath } = useRouter();
    const [name, setName] = useState<string>(query?.q?.toString() || '');
    const page = Number(query?.page);

    const setPage = (n: number) => {
        const path = getPathForRoute(undefined, n);
        replace(path, undefined, { scroll: false });
    };

    const [url, setUrl] = useState(`/api/cycling-map/manage/lookup`);
    const { data: { total, elements, links, limit } = defaultTo, error } = useSWR<any>(url, fetcher);
    const debouncedName = useDebounce(name, 333);
    const debouncedTotal = useDebounce(total, 125);
    const debouncedLimit = useDebounce(limit, 125);
    const layout = useResponsiveValue<string>(['1fr', '1fr 1fr 1fr']);

    useEffect(() => {
        setUrl(`/api/cycling-map/manage/lookup?${qs.stringify({ name: debouncedName, page, limit: 12 })}`);
    }, [debouncedName, page]);

    const pagesNumber = Math.ceil(debouncedTotal / debouncedLimit);
    const pages = Array(isFinite(pagesNumber) ? pagesNumber : 1)
        .fill(0)
        .map((v, i) => i + 1);

    const [scroll, setScroll] = useState(0);
    const SCROLL_MOVE = 42 * 8;
    const barRef = useRef<any>();

    const handleScrolLeft = (end: boolean = false) => {
        const pagesWidth = pages.length * 42;
        const barWidth = barRef?.current?.clientWidth;
        let newPosition = end ? -(pagesWidth - barWidth) : scroll - SCROLL_MOVE;

        if (pagesWidth + newPosition < barWidth) {
            newPosition = -(pagesWidth - barWidth);
        }
        setScroll(newPosition);
    };

    const handleScrollRight = (end: boolean) => {
        let newPosition = end ? 0 : scroll + SCROLL_MOVE;

        if (newPosition > 0) {
            newPosition = 0;
        }
        setScroll(newPosition);
    };

    const getPathForRoute = (routeId?: string, page?: number) => {
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

    return (
        <Box>
            <Box>Wyszukaj po nazwie:</Box>
            <Input
                onChange={(e) => {
                    setPage(1);
                    setName(e.target.value);
                }}
                defaultValue={query.q}
                sx={{
                    mb: '30px',
                }}
            ></Input>

            <PagesBar
                page={page}
                pages={pages}
                setPage={setPage}
                scroll={scroll}
                handleScrollRight={handleScrollRight}
                handleScrolLeft={handleScrolLeft}
                barRef={barRef}
            />

            {elements.length === 0 ? null : (
                <>
                    <Grid sx={{ margin: 1 }} gap={0} columns={[1, layout]}>
                        {elements?.map((el, index) => {
                            const bg = index % 2 ? 'primary' : 'muted';
                            return <Tile key={el.id} bg={bg} route={el} page={page} q={debouncedName}></Tile>;
                        })}
                    </Grid>
                </>
            )}

            <PagesBar
                page={page}
                pages={pages}
                setPage={setPage}
                scroll={scroll}
                handleScrollRight={handleScrollRight}
                handleScrolLeft={handleScrolLeft}
            />
        </Box>
    );
}

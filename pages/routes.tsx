import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { Box, Grid, Input, Link, AspectImage, Heading, Flex, AspectRatio } from 'theme-ui';
import qs from 'querystring';
import { useDebounce } from '../components/utils/useDebounce';
import fetcher from '../helpers/fetcher';
import { useResponsiveValue } from '@theme-ui/match-media';
import PagesBar from '../components/bar/pagesBar';
import NextLink from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { RouteEditComponent } from '../components/RouteEditNavigation';
import { RouteNavigationContainer } from '../components/contexts/route/RouteNavigationContext';
import RouteEdit from '../components/pages/RouteEdit';
const defaultTo = { elements: [], total: 0, links: {}, limit: 0 };

const Route: React.FC<{ bg: string; route: any; page: number; q: string }> = ({ bg, route, page, q }) => {
    const mapImages = route.images.find(({ type }) => type === 'map') || {};
    const squareImages = mapImages?.variants?.square;
    const image = squareImages ? squareImages[squareImages.length - 1] : null;

    return (
        <Grid sx={{ bg: bg, m: 1 }} columns={[1, '3fr ']} className="sys-btn">
            <NextLink href={`routes?routeId=${route.id}&page=${page}&q=${q}`} passHref>
                <Link className="sys-btn">
                    <Box sx={{ overflow: 'hidden', p: 1 }}>
                        <Heading as="h3" sx={{ textAlign: 'center' }}>
                            <Box>{route.name}</Box>
                        </Heading>
                    </Box>
                    <Box p={1}>
                        <Box sx={{ color: '#fff' }}>
                            {image?.url && <AspectImage ratio={1} src={image?.url}></AspectImage>}
                            {!image?.url && (
                                <AspectRatio
                                    ratio={1}
                                    sx={{
                                        bg: '#555555',
                                    }}
                                >
                                    <Flex
                                        sx={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                        }}
                                    >
                                        <Box sx={{ bg: '#313131', p: '10px' }}>no image</Box>
                                    </Flex>
                                </AspectRatio>
                            )}
                        </Box>
                    </Box>
                    <Box p={1}>{route.id}</Box>
                    <Box sx={{ padding: 1 }}>{route.author}</Box>
                    <Box sx={{ padding: 1 }}>{route.createdAt}</Box>
                </Link>
            </NextLink>
        </Grid>
    );
};

export default function Page({}) {
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

    const heandleScrolLeft = (end: boolean = false) => {
        const pagesWidth = pages.length * 42;
        const barWidth = barRef?.current?.clientWidth;
        let newPosition = end ? -(pagesWidth - barWidth) : scroll - SCROLL_MOVE;

        if (pagesWidth + newPosition < barWidth) {
            newPosition = -(pagesWidth - barWidth);
        }
        setScroll(newPosition);
    };

    const heandleScrollRight = (end: boolean) => {
        let newPosition = end ? 0 : scroll + SCROLL_MOVE;

        if (newPosition > 0) {
            newPosition = 0;
        }
        setScroll(newPosition);
    };

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

    if (routeId) {
        return (
            <RouteNavigationContainer {...{ elements, getPathForRoute, links, routeId, page }}>
                <RouteEdit routeId={routeId} />
            </RouteNavigationContainer>
        );
    }
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
                heandleScrollRight={heandleScrollRight}
                heandleScrolLeft={heandleScrolLeft}
                barRef={barRef}
            />

            {elements.length === 0 ? null : (
                <>
                    <Grid sx={{ margin: 1 }} gap={0} columns={[1, layout]}>
                        {elements?.map((el, index) => {
                            const bg = index % 2 ? 'primary' : 'muted';
                            return <Route key={el.id} bg={bg} route={el} page={page} q={debouncedName}></Route>;
                        })}
                    </Grid>
                </>
            )}

            <PagesBar
                page={page}
                pages={pages}
                setPage={setPage}
                scroll={scroll}
                heandleScrollRight={heandleScrollRight}
                heandleScrolLeft={heandleScrolLeft}
            />
        </Box>
    );
}

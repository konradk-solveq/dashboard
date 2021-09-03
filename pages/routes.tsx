import { signIn, useSession } from 'next-auth/client';
import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { Box, Button, Grid, Input, Link, AspectImage, Heading, Flex } from 'theme-ui';
import qs from 'querystring';
import { useDebounce } from '../components/utils/useDebounce';
import fetcher from '../helpers/fetcher';

import NextLink from 'next/link';
import { addEmitHelper } from 'typescript';
const conf = `1fr `;
const defaultTo = { elements: [], total: 0, links: {}, limit: 0 };

const Route: React.FC<{ bg: string; route: any, num: number }> = ({ bg, route, num }) => {
    const mapImages = route.images.find(({ type }) => type === 'map') || {};
    const squareImages = mapImages?.variants?.square;
    const image = squareImages ? squareImages[squareImages.length - 1] : null;
    return (
        <Grid bg={bg} m={1} columns={[1, '3fr ']}>
            <Box p={1} sx={{ overflow: 'hidden' }}>
                <Box>trasa nr: {num}</Box>
                <NextLink href={`/routes/route//${route.id}`}>
                    <Heading as="h3" sx={{ textAlign: 'center' }}>
                        <Link color="background">{route.name}</Link>
                    </Heading>
                </NextLink>
            </Box>
            <Box p={1}>
                <NextLink href={`/routes/route/${route.id}`} passHref>
                    <Link color="background">
                        <AspectImage ratio={1} src={image?.url || 'https://via.placeholder.com/640'}></AspectImage>
                    </Link>
                </NextLink>
            </Box>
            <Box p={1}>
                <NextLink href={`/routes/route/${route.id}`} passHref>
                    <Link color="background">{route.id}</Link>
                </NextLink>
            </Box>
            <Box
                sx={{
                    padding: 1,
                }}
            >
                {route.author}
            </Box>
            <Box
                sx={{
                    padding: 1,
                }}
            >
                {route.createdAt}
            </Box>
        </Grid>
    );
};
import { useBreakpointIndex, useResponsiveValue } from '@theme-ui/match-media';
import HorizontalScroll from 'react-scroll-horizontal';

export default function Page({ }) {
    const [name, setName] = useState('');
    const [page, setPage] = useState(0);
    const [url, setUrl] = useState(`/api/cycling-map/manage/lookup`);
    const { data: { total, elements, links, limit } = defaultTo, error } = useSWR(url, fetcher);
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
    const SCROLL_MOVE = 100;
    const listRef = useRef();

    const heandleScrolLeft = () => {
        listRef.current.scrollLeft = scroll;
        console.log('%c scroll:', 'background: #ffcc00; color: #003300', scroll)
    }

    return (
        <Box>
            <Box>Wyszukaj po nazwie:</Box>
            <Input
                onChange={(e) => {
                    setPage(1);
                    setName(e.target.value);
                }}
                sx={{
                    mb: '20px',
                }}
            ></Input>
            <Flex sx={{
                mb: '20px',
                width: '100%',
            }}>
                <Button
                    sx={{
                        mr: '2px',
                        p: '1px',
                        textAlign: 'center',
                        minWidth: '40px',
                        minHeight: '40px',
                        borderRadius: '50px',
                        mr: '10px',
                    }}
                    onClick={() => { setScroll(scroll + SCROLL_MOVE); heandleScrolLeft(); }}
                >+</Button>
                <Box sx={{
                    bg: 'blue',
                    overflow: 'hidden',
                }}>
                    <HorizontalScroll
                        
                    >
                        <Flex
                            sx={{
                                msJustifySelf: 'stretch',
                            }}
                        >
                            {pages.map((thePage) => {
                                return (
                                    <Button
                                        sx={{
                                            mr: '2px',
                                            p: '1px',
                                            textAlign: 'center',
                                            minWidth: '40px',
                                            minHeight: '40px'
                                        }}
                                        bg={thePage === page ? 'secondary' : ''}
                                        key={thePage}
                                        onClick={(e) => setPage(thePage)}
                                    >
                                        {thePage}
                                    </Button>
                                );
                            })}
                        </Flex>
                    </HorizontalScroll>
                </Box>
                <Button
                    sx={{
                        mr: '2px',
                        p: '1px',
                        textAlign: 'center',
                        minWidth: '40px',
                        minHeight: '40px',
                        borderRadius: '50px',
                        ml: '10px',
                    }}
                >+</Button>
            </Flex>
            {
                elements.length === 0 ? null : (
                    <>
                        <Grid sx={{ margin: 1 }} gap={0} columns={[1, layout]}>
                            {elements?.map((el, index) => {
                                const bg = index % 2 ? 'primary' : 'muted';
                                return <Route key={el.id} bg={bg} route={el} num={((page - 1 < 0 ? 0 : page - 1) * 12) + index}></Route>;
                            })}
                        </Grid>
                    </>
                )
            }
        </Box >
    );
}

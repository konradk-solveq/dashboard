import { signIn, useSession } from 'next-auth/client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Box, Button, Grid, Input, Link, AspectImage, Heading } from 'theme-ui';
import qs from 'querystring';
import { useDebounce } from '../components/utils/useDebounce';
const fetcher = (url: string) => {
    return fetch(`${url}`).then((r) => r.json());
};

import NextLink from 'next/link';
import { addEmitHelper } from 'typescript';
const conf = `1fr `;
const defaultTo = { elements: [], total: 0, links: {}, limit: 0 };

const Route: React.FC<{ bg: string; route: any }> = ({ bg, route }) => {
    const mapImages = route.images.find(({ type }) => type === 'map') || {};
    const squareImages = mapImages?.variants?.square;
    const image = squareImages ? squareImages[squareImages.length - 1] : null;
    return (
        <Grid bg={bg} m={1} columns={[2, '1fr ']}>
            <Box p={1} sx={{ overflow: 'hidden' }}>
                <NextLink href={`/routes/${route.id}`}>
                    <Heading as="h3" sx={{ textAlign: 'center' }}>
                        <Link color="background">{route.name}</Link>
                    </Heading>
                </NextLink>
            </Box>
            <Box p={1}>
                <NextLink href={`/routes/${route.id}`} passHref>
                    <Link color="background">
                        <AspectImage ratio={1} src={image?.url || 'https://via.placeholder.com/640'}></AspectImage>
                    </Link>
                </NextLink>
            </Box>
            <Box p={1}>
                <NextLink href={`/routes/${route.id}`} passHref>
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

export default function Page({}) {
    const [name, setName] = useState('');
    const [page, setPage] = useState(0);
    const [url, setUrl] = useState(`/api/findByName`);
    const { data: { total, elements, links, limit } = defaultTo, error } = useSWR(url, fetcher);
    const debouncedName = useDebounce(name, 333);
    const debouncedTotal = useDebounce(total, 125);
    const debouncedLimit = useDebounce(limit, 125);

    useEffect(() => {
        setUrl(`/api/findByName?${qs.stringify({ name: debouncedName, page, limit: 12 })}`);
    }, [debouncedName, page]);

    const pagesNumber = Math.ceil(debouncedTotal / debouncedLimit);
    const pages = Array(isFinite(pagesNumber) ? pagesNumber : 1)
        .fill(0)
        .map((v, i) => i + 1);

    return (
        <>
            <Input
                onChange={(e) => {
                    setPage(1);
                    setName(e.target.value);
                }}
            ></Input>
            {pages.map((thePage) => {
                return (
                    <Button
                        sx={{ margin: 1 }}
                        bg={thePage === page ? 'secondary' : ''}
                        key={thePage}
                        onClick={(e) => setPage(thePage)}
                    >
                        {thePage}
                    </Button>
                );
            })}
            {elements.length === 0 ? null : (
                <>
                    <Grid sx={{ margin: 1 }} gap={0} columns={[2, '1fr 1fr 1fr']}>
                        {elements?.map((el, index) => {
                            const bg = index % 2 ? 'primary' : 'muted';
                            return <Route key={el.id} bg={bg} route={el}></Route>;
                        })}
                    </Grid>
                </>
            )}
        </>
    );
}

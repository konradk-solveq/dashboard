import { signIn, useSession } from 'next-auth/client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Box, Button, Grid, Input, Link, AspectImage, Heading, Flex, Container } from 'theme-ui';
import qs from 'querystring';
import { useDebounce } from '../components/utils/useDebounce';
const fetcher = (url: string) => {
    return fetch(`${url}`).then((r) => r.json());
};

import NextLink from 'next/link';
import { addEmitHelper } from 'typescript';
const conf = `1fr `;
const defaultTo = { elements: [], total: 0, links: {}, limit: 0 };

let sumPublic = [];
let sumAll = [];
let listOfNames = [];


const Route: React.FC<{ bg: string; route: any }> = ({ bg, route }) => {

    const mapImages = route.images.find(({ type }) => type === 'map') || {};
    const squareImages = mapImages?.variants?.square;
    const image = squareImages ? squareImages[squareImages.length - 1] : null;


    useEffect(() => {
        const broken = typeof route.images.find(({ type }) => type === 'map') == 'undefined';

        if (!broken) {
            if (!sumAll.some(e => e.id === route.id)) {
                sumAll.push({
                    id: route.id,
                    name: route.name,
                });
                listOfNames.push(route.name);
            }

            if (route.isPublic) {

                if (!sumPublic.some(e => e.id === route.id)) {
                    console.log('%c route:', 'background: #ffcc00; color: #003300', route.name);

                    let newItem = {
                        id: route.id,
                        name: route.name,
                    }

                    sumPublic.push(newItem);
                    listOfNames.push(route.name);
                }
            }
        }
    }, [route])

    return (
        <Box sx={{
            bg: image?.url ? 'khaki' : 'red',
            m: '2px',
            width: '12px',
            height: '12px',
            border: '1px solid #313131',
        }} />
    );
};
import { useBreakpointIndex, useResponsiveValue } from '@theme-ui/match-media';
import { wrap } from 'module';

export default function Page({ }) {
    const [name, setName] = useState('');
    const [page, setPage] = useState(0);
    const [url, setUrl] = useState(`/api/findByName`);
    const { data: { total, elements, links, limit } = defaultTo, error } = useSWR(url, fetcher);
    const debouncedName = useDebounce(name, 333);
    const debouncedTotal = useDebounce(total, 125);
    const debouncedLimit = useDebounce(limit, 125);
    const layout = useResponsiveValue<string>(['1fr', '1fr 1fr 1fr']);

    useEffect(() => {
        setUrl(`/api/findByName?${qs.stringify({ name: debouncedName, page, limit: 500 })}`);
    }, [debouncedName, page]);

    const pagesNumber = Math.ceil(debouncedTotal / debouncedLimit);
    const pages = Array(isFinite(pagesNumber) ? pagesNumber : 1)
        .fill(0)
        .map((v, i) => i + 1);

    console.table(listOfNames);


    return (
        <Flex sx={{
            flexDirection: 'column',
        }}>
            <Container sx={{
                px: ['0', '0', '50px', '50px', '50px'],
            }}>
                <h1>Przeklikaj poszczególne zakładni od 1 - do ostatniej aby zliczyć trasy i zbudować listę nazw tras publicznych</h1>
            </Container>


            <Flex sx={{
                justifyContent: 'center',
                width: '100%',
            }}>
                <Container sx={{ width: 'max-content' }}>

                    {pages.map((thePage) => {
                        return (
                            <Button
                                sx={{ margin: 1, width: 'max-content' }}
                                bg={thePage === page ? 'secondary' : ''}
                                key={thePage}
                                onClick={(e) => setPage(thePage)}
                            >
                                {thePage}
                            </Button>
                        );
                    })}
                </Container>
            </Flex>


            <Flex sx={{
                flexDirection: ['column', 'column', 'row', 'row', 'row'],
                width: '100%',
                justifyContent: ['stretch', 'stretch', 'space-around', 'space-around', 'space-around'],
            }}>
                <h2 style={{ textAlign: 'center' }}>ilość wszystkich tras: {sumAll.length}</h2>
                <h2 style={{ textAlign: 'center' }}>ilość tras publicznych: {sumPublic.length}</h2>
            </Flex>

            <Flex sx={{
                flexDirection: 'column',
                my: '20px',
            }}>
                <Flex sx={{
                    flexDirection: 'row',
                }}>
                    <Box sx={{
                        bg: 'khaki',
                        mx: '5px',
                        my: '7px',
                        width: '12px',
                        height: '12px',
                        border: '1px solid #313131',

                    }} />
                    <div> - trasy prawidłowe</div>
                </Flex>
                <Flex sx={{
                    flexDirection: 'row',
                }}>
                    <Box sx={{
                        bg: 'red',
                        mx: '5px',
                        my: '7px',
                        width: '12px',
                        height: '12px',
                        border: '1px solid #313131',

                    }} />
                    <div> - trasy uszkodzone</div>
                </Flex>
            </Flex>
            {elements.length === 0 ? null : (
                <>
                    <Flex sx={{
                        margin: 1,
                        flexWrap: 'wrap',
                    }}>
                        {elements?.map((el, index) => {
                            const bg = index % 2 ? 'primary' : 'muted';
                            return <Route key={el.id} bg={bg} route={el}></Route>;
                        })}
                    </Flex>
                </>
            )}
            <Flex sx={{
                justifyContent: 'center',
                width: '100%',
            }}>
                <Container sx={{ width: 'max-content' }}>
                    <h3>Lista nazw tras publicznych</h3>
                    {sumPublic.map(e => (
                        <div>{e.name}</div>
                    ))}
                    <Box
                        sx={{ mb: '50px' }}
                    >-------------------------------------</Box>
                </Container>
            </Flex>
        </Flex>
    );
}

import { signIn, useSession } from 'next-auth/client';
import React, { useEffect, useState, useRef } from 'react';
import useSWR from 'swr';
import { Box, Button, Grid, Input, Link, AspectImage, Heading, Flex, Container } from 'theme-ui';
import qs from 'querystring';
import { useDebounce } from '../../components/utils/useDebounce';
import fetcher from '../../helpers/fetcher';
import NextLink from 'next/link';
import { addEmitHelper } from 'typescript';
import { useBreakpointIndex, useResponsiveValue } from '@theme-ui/match-media';
import PieChart from '../../components/charts/pie';
import HistogramChart from '../../components/charts/histogram';
import PagesBar from '../../components/bar/pagesBar';

const conf = `1fr `;
const defaultTo = { elements: [], total: 0, links: {}, limit: 0 };

let sumPublic = [];
let sumAll = [];
let sumWrong = [];
let listOfNames = [];
let newRoutes = {};

const Route: React.FC<{ route: any; setChartData: any }> = ({ route, setChartData }) => {
    const mapImages = route.images.find(({ type }) => type === 'map') || {};
    const squareImages = mapImages?.variants?.square;
    const image = squareImages ? squareImages[squareImages.length - 1] : null;

    useEffect(() => {
        const broken = typeof route.images.find(({ type }) => type === 'map') == 'undefined';

        const addToChart = () => {
            const d = new Date(route.createdAt);
            let mo = d.getMonth() + 1;
            let m = '' + mo;
            if (mo < 10) {
                m = '0' + m;
            }
            let day = d.getDate();
            let da = '' + day;
            if (day < 10) {
                da = '0' + da;
            }
            const dName = `${d.getFullYear()}_${m}_${da}`;

            const exist = typeof newRoutes[dName] != 'undefined';
            if (exist) {
                newRoutes[dName]++;
            } else {
                newRoutes[dName] = 1;
            }

            setChartData(newRoutes);
            // console.log('%c newRoutes:', 'background: #ffcc00; color: #003300', newRoutes)
        };

        if (!broken) {
            if (!sumAll.some((e) => e.id === route.id)) {
                sumAll.push({
                    id: route.id,
                    name: route.name,
                });
                addToChart();
            }

            if (route.isPublic) {
                if (!sumPublic.some((e) => e.id === route.id)) {
                    let newItem = {
                        id: route.id,
                        name: route.name,
                    };

                    sumPublic.push(newItem);
                    listOfNames.push(route.name);
                }
            }
        } else {
            if (!sumWrong.some((e) => e.id === route.id)) {
                sumWrong.push({
                    id: route.id,
                    name: route.name,
                });
                addToChart();
            }
        }
    }, [route]);

    return (
        <Box
            sx={{
                bg: image?.url ? (route.isPublic ? '#68B028' : 'khaki') : 'red',
                m: '2px',
                width: '12px',
                height: '12px',
                border: '1px solid #313131',
            }}
        />
    );
};

export default function Page({}) {
    const [name, setName] = useState('');
    const [page, setPage] = useState(0);
    const [url, setUrl] = useState(`/api/cycling-map/manage/lookup`);
    const { data: { total, elements, links, limit } = defaultTo, error } = useSWR(url, fetcher);
    const debouncedName = useDebounce(name, 333);
    const debouncedTotal = useDebounce(total, 125);
    const debouncedLimit = useDebounce(limit, 125);
    const layout = useResponsiveValue<string>(['1fr', '1fr 1fr 1fr']);

    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        setUrl(`/api/cycling-map/manage/lookup?${qs.stringify({ name: debouncedName, page, limit: 500 })}`);
    }, [debouncedName, page]);

    useEffect(() => {
        console.log('%c chartData:', 'background: #ffcc00; color: #003300', chartData);
    }, [chartData, page]);

    const pagesNumber = Math.ceil(debouncedTotal / debouncedLimit);
    const pages = Array(isFinite(pagesNumber) ? pagesNumber : 1)
        .fill(0)
        .map((v, i) => i + 1);

    const goodRoutes = () => sumAll.length - sumPublic.length;
    const wrongRoutes = () => sumWrong.length;
    const pulicRoutes = () => sumPublic.length;
    const allRoutes = () => sumAll.length + sumWrong.length;

    const percents = (num) => {
        const val = (num / (sumAll.length + sumWrong.length)) * 100;
        return val.toFixed(1) + '%';
    };

    const [scroll, setScroll] = useState(0);
    const SCROLL_MOVE = 42 * 8;
    const barRef = useRef<any>();

    const heandleScrolLeft = (end: boolean = false) => {
        const pagesWidth = pages.length * 42;
        const barWidth = barRef.current.clientWidth;
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

    return (
        <Flex
            sx={{
                flexDirection: 'column',
            }}
        >
            <Container
                sx={{
                    px: ['0', '0', '50px', '50px', '50px'],
                }}
            >
                <h1>
                    Przeklikaj poszczególne zakładni od 1 - do ostatniej aby zliczyć trasy i zbudować listę nazw tras
                    publicznych
                </h1>
            </Container>

            <PagesBar
                page={page}
                pages={pages}
                setPage={setPage}
                scroll={scroll}
                heandleScrollRight={heandleScrollRight}
                heandleScrolLeft={heandleScrolLeft}
                barRef={barRef}
            />

            <Flex
                sx={{
                    flexDirection: ['column', 'column', 'row', 'row', 'row'],
                    width: '100%',
                    justifyContent: ['stretch', 'stretch', 'space-around', 'space-around', 'space-around'],
                }}
            >
                <h2 style={{ textAlign: 'center' }}>ilość wszystkich tras: {allRoutes()}</h2>
                <h2 style={{ textAlign: 'center' }}>ilość tras publicznych: {pulicRoutes()}</h2>
            </Flex>
            <Flex
                sx={{
                    flexDirection: ['column', 'column', 'row', 'row', 'row'],
                    width: '100%',
                    justifyContent: ['stretch', 'stretch', 'space-around', 'space-around', 'space-around'],
                }}
            >
                <h2 style={{ textAlign: 'center' }}>ilość poprawnych tras: {goodRoutes()}</h2>
                <h2 style={{ textAlign: 'center' }}>ilość tras uszkodzonych: {wrongRoutes()}</h2>
            </Flex>

            <Flex>
                <PieChart
                    data={[
                        { label: ['publiczne', percents(pulicRoutes())], value: pulicRoutes(), color: '#68B028' },
                        { label: ['poprawne', percents(goodRoutes())], value: goodRoutes(), color: 'khaki' },
                        { label: ['błędne', percents(wrongRoutes())], value: wrongRoutes(), color: '#cf0f36' },
                    ]}
                    outerRadius={160}
                    innerRadius={0}
                ></PieChart>

                <HistogramChart data={chartData} page={page}></HistogramChart>
            </Flex>

            <Flex
                sx={{
                    flexDirection: 'column',
                    my: '20px',
                }}
            >
                <Flex
                    sx={{
                        flexDirection: 'row',
                    }}
                >
                    <Box
                        sx={{
                            bg: 'khaki',
                            mx: '5px',
                            my: '7px',
                            width: '12px',
                            height: '12px',
                            border: '1px solid #313131',
                        }}
                    />
                    <Box> - trasy prawidłowe</Box>
                </Flex>
                <Flex
                    sx={{
                        flexDirection: 'row',
                    }}
                >
                    <Box
                        sx={{
                            bg: '#68B028',
                            mx: '5px',
                            my: '7px',
                            width: '12px',
                            height: '12px',
                            border: '1px solid #313131',
                        }}
                    />
                    <Box> - trasy upublicznione</Box>
                </Flex>
                <Flex
                    sx={{
                        flexDirection: 'row',
                    }}
                >
                    <Box
                        sx={{
                            bg: '#cf0f36',
                            mx: '5px',
                            my: '7px',
                            width: '12px',
                            height: '12px',
                            border: '1px solid #313131',
                        }}
                    />
                    <Box> - trasy uszkodzone</Box>
                </Flex>
            </Flex>
            {elements.length === 0 ? null : (
                <>
                    <Flex
                        sx={{
                            margin: 1,
                            flexWrap: 'wrap',
                        }}
                    >
                        {elements?.map((el, index) => {
                            return <Route key={'box' + index} route={el} setChartData={(e) => setChartData(e)}></Route>;
                        })}
                    </Flex>
                </>
            )}
            <Flex
                sx={{
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                <Container sx={{ width: 'max-content' }}>
                    <h3>Lista nazw tras publicznych</h3>
                    {sumPublic.map((e, i) => (
                        <Box key={'name' + i}>{e.name}</Box>
                    ))}
                    <Box sx={{ mb: '50px' }}>-------------------------------------</Box>
                </Container>
            </Flex>
        </Flex>
    );
}

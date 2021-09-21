import React, { useEffect, useState, useRef } from 'react';
import useSWR from 'swr';
import { Box, Flex, Container } from 'theme-ui';
import qs from 'querystring';
import { useDebounce } from '../../components/utils/useDebounce';
import fetcher from '../../helpers/fetcher';
import { useResponsiveValue } from '@theme-ui/match-media';
import PieChart from '../../components/charts/PieChart';
import HistogramChart from '../../components/charts/BarChart';
import PagesBar from '../../components/bar/PagesBar';
import PieChart3D from '../../components/charts/PieChart3D';

const conf = `1fr `;
const defaultTo = { elements: [], total: 0, links: {}, limit: 0 };

let sumAll = [];
let sumPublic = [];
let sumWrong = [];
let listOfNames = [];
let newRoutes = {};

const Route: React.FC<{ route: any; setChartData: any }> = ({ route, setChartData }) => {
    const mapImages = route.images.find(({ type }) => type === 'map') || {};
    const squareImages = mapImages?.variants?.square;
    const image = squareImages ? squareImages[squareImages.length - 1] : null;

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

const ColectData: React.FC<{ route: any; setChartData: any }> = ({ route, setChartData }) => {
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

        if (!sumAll.some((e) => e.id === route.id)) {
            sumAll.push(route);
            addToChart();
        }
        if (!broken) {

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
        <></>
    );
};

export default function Page({ }) {
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
        // console.log('%c chartData:', 'background: #ffcc00; color: #003300', chartData);
        console.log('%c sumAll:', 'background: #ffcc00; color: #003300', sumAll)
    }, [chartData, page]);

    const pagesNumber = Math.ceil(debouncedTotal / debouncedLimit);
    const pages = Array(isFinite(pagesNumber) ? pagesNumber : 1)
        .fill(0)
        .map((v, i) => i + 1);

    const goodRoutes = () => sumAll.length - sumWrong.length;
    const wrongRoutes = () => sumWrong.length;
    const pulicRoutes = () => sumPublic.length;
    const allRoutes = () => sumAll.length;

    const percents = (num) => {
        const val = (num / (sumAll.length + sumWrong.length)) * 100;
        return val.toFixed(1) + '%';
    };

    const [scroll, setScroll] = useState(0);
    const SCROLL_MOVE = 42 * 8;
    const barRef = useRef<any>();

    const handleScrolLeft = (end: boolean = false) => {
        const pagesWidth = pages.length * 42;
        const barWidth = barRef.current.clientWidth;
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
                handleScrollRight={handleScrollRight}
                handleScrolLeft={handleScrolLeft}
                barRef={barRef}
            />

            <Flex
                sx={{
                    position: 'relative',
                    top: '-20px'
                }}
            >
                {total - sumAll.length <= 0 && <Box sx={{ fontFamily: 'din-b' }}>WCZYTANO WSZYSTKIE TRASY</Box>}
                {total - sumAll.length > 0 && <><Box>wszystkich tras: {total}, tras wczytanych: {sumAll.length}</Box>
                    <Box sx={{ ml: '20px', fontFamily: 'din-b' }}> posostało do wczytania: {total - sumAll.length}</Box></>}
            </Flex>

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
                <PieChart3D
                    data={[
                        ['Trasa', 'ilość danego typu'],
                        ['prywatne', goodRoutes()],
                        ['upublicznione', pulicRoutes()],
                        ['uszkodzone', wrongRoutes()],
                    ]}
                    title={'Zestawienie ilości tras'}
                />
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
            {
                elements.length === 0 ? null : (
                    <>
                        {elements?.map((el, index) => {
                            return <ColectData key={'box' + index} route={el} setChartData={(e) => setChartData(e)}></ColectData>;
                        })}
                    </>
                )
            }
            {
                sumAll.length === 0 ? null : (
                    <>
                        <Flex
                            sx={{
                                margin: 1,
                                flexWrap: 'wrap',
                            }}
                        >
                            {sumAll?.map((el, index) => {
                                return <Route key={'box' + index} route={el} setChartData={(e) => setChartData(e)}></Route>;
                            })}
                        </Flex>
                    </>
                )
            }
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
        </Flex >
    );
}

import React, { useEffect, useState, useRef } from 'react';
import useSWR from 'swr';
import { Box, Flex, Container } from 'theme-ui';
import qs from 'querystring';
import { useDebounce } from '../../components/utils/useDebounce';
import fetcher from '../../helpers/fetcher';
import PagesBar from '../../components/bar/PagesBar';
import ChartTypes3D from '../../componentsSSP/routes/statistics/ChartTypes3D';
import ChartDate from '../../componentsSSP/routes/statistics/ChartDate';
import ChartDay from '../../componentsSSP/routes/statistics/ChartDay';
import ChartHour from '../../componentsSSP/routes/statistics/ChartHour';
import DateInputs from '../../componentsSSP/routes/statistics/DateInputs';

const defaultTo = { elements: [], total: 0, links: {}, limit: 0 };

let sumAll = [];
let sumPublic = [];
let sumWrong = [];
let listOfNames = [];
let newRoutes = {};

const Route: React.FC<{ route: any }> = ({ route }) => {
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

const ColectData: React.FC<{ route: any, setChartData: any }> = ({ route, setChartData }) => {

    useEffect(() => {
        const broken = typeof route.images.find(({ type }) => type === 'map') == 'undefined';

        if (!sumAll.some((e) => e.id === route.id)) {
            sumAll.push(route);
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
            }
        }

        setChartData(sumAll);
    }, [route]);

    return (null);
};

const Legend: React.FC<{ color: string, title: string }> = ({ color, title }) => {
    return (
        <Flex
            sx={{
                flexDirection: 'row',
            }}
        >
            <Box
                sx={{
                    bg: color,
                    mx: '5px',
                    my: '7px',
                    width: '12px',
                    height: '12px',
                    border: '1px solid #313131',
                }}
            />
            <Box>{title}</Box>
        </Flex>
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

    useEffect(() => {
        setUrl(`/api/cycling-map/manage/lookup?${qs.stringify({ name: debouncedName, page, limit: 500 })}`);
    }, [debouncedName, page]);


    const pagesNumber = Math.ceil(debouncedTotal / debouncedLimit);
    const pages = Array(isFinite(pagesNumber) ? pagesNumber : 1)
        .fill(0)
        .map((v, i) => i + 1);

    const goodRoutes = () => sumAll.length - sumWrong.length;
    const wrongRoutes = () => sumWrong.length;
    const pulicRoutes = () => sumPublic.length;
    const allRoutes = () => sumAll.length;

    const [chartData, setChartData] = useState(null);
    const [filteredChartData, setFilteredChartData] = useState(null);

    const [scroll, setScroll] = useState(0);
    const SCROLL_MOVE = 42 * 8;
    const barRef = useRef<any>();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [veryStartDate, setVeryStartDate] = useState(new Date());
    const [veryEndDate, setVeryEndDate] = useState(new Date());

    useEffect(() => {
        if (!chartData || chartData.length == 0) return;
        let firstDate = new Date();
        let lastDate = new Date();
        for (let cd of chartData) {
            const itemDate = new Date(cd.createdAt);
            if (firstDate > itemDate) firstDate = itemDate;
            if (lastDate < itemDate) lastDate = itemDate;
        }
        setStartDate(firstDate);
        setVeryStartDate(firstDate);
        setVeryEndDate(lastDate);
    }, [chartData, page])

    useEffect(() => {
        if (!chartData) return;
        const tempChartData = [];
        for (const cd of chartData) {
            const itemData = new Date(cd.createdAt);
            if (itemData < startDate) continue;
            if (itemData > endDate) continue;
            tempChartData.push(cd);
        }
        setFilteredChartData(tempChartData);
    }, [chartData, startDate, endDate])


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

            <Flex sx={{ maxHeight: '350px' }}>
                <Flex
                    sx={{
                        flexDirection: 'column',
                        width: '50%',
                    }}
                >
                    <h2 style={{ textAlign: 'center' }}>ilość wszystkich tras: {allRoutes()}</h2>
                    <h2 style={{ textAlign: 'center' }}>ilość tras publicznych: {pulicRoutes()}</h2>
                    <h2 style={{ textAlign: 'center' }}>ilość poprawnych tras: {goodRoutes()}</h2>
                    <h2 style={{ textAlign: 'center' }}>ilość tras uszkodzonych: {wrongRoutes()}</h2>
                </Flex>
                <Box sx={{ width: '50%' }}>
                    <ChartTypes3D
                        data={[
                            ['Trasa', 'ilość danego typu'],
                            ['prywatne', goodRoutes()],
                            ['upublicznione', pulicRoutes()],
                            ['uszkodzone', wrongRoutes()],
                        ]}
                        title={'Zestawienie ilości tras'}
                    />
                </Box>
            </Flex>

            <DateInputs
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                veryStartDate={veryStartDate}
                veryEndDate={veryEndDate}
            />

            <Flex sx={{
                my: '20px',
                pb: '30px',
                borderTop: '1px solid #ddd',
                borderBottom: '1px solid #ddd',
                flexDirection: 'row',
                maxWidth: '100%',
                flexWrap: 'wrap',
                justifyContent: 'space-around'
            }}>
                <Box>
                    <ChartDate
                        data={filteredChartData}
                        title={'Ilość tras według dat'}
                        page={page}
                    />
                </Box>

                <Box sx={{ width: '500px' }}>
                    <ChartDay
                        data={filteredChartData}
                        title={'Ilość tras według dni'}
                        page={page}
                    />
                </Box>

                <Box sx={{ width: '500px' }}>
                    <ChartHour
                        data={filteredChartData}
                        title={'Ilość tras według godzin'}
                        page={page}
                    />
                </Box>
            </Flex>

            <Flex
                sx={{
                    flexDirection: 'column',
                    my: '20px',
                }}
            >
                <Legend
                    color={'khaki'}
                    title={' - trasy prawidłowe'}
                />
                <Legend
                    color={'#68B028'}
                    title={' - trasy upublicznione'}
                />
                <Legend
                    color={'#cf0f36'}
                    title={' - trasy uszkodzone'}
                />
            </Flex>
            {
                elements?.length === 0 ? null : (
                    <>
                        {elements?.map((el, index) => {
                            return <ColectData
                                key={'box' + index}
                                route={el}
                                setChartData={setChartData}
                            ></ColectData>;
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
                                return <Route key={'box' + index} route={el}></Route>;
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

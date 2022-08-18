import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material/';
import qs from 'querystring';
import { useDebounce } from '../../components/utils/useDebounce';
import PagesBar from '../../components/bar/PagesBar';
import ChartTypes3D from '../../componentsSSP/routes/statistics/ChartTypes3D';
import ChartDate from '../../componentsSSP/routes/statistics/ChartDate';
import ChartDay from '../../componentsSSP/routes/statistics/ChartDay';
import ChartHour from '../../componentsSSP/routes/statistics/ChartHour';
import DateInputs from '../../componentsSSP/routes/statistics/DateInputs';
import ChartHoursOfDay from '../../componentsSSP/routes/statistics/ChartHoursOfDay';
import { useQuery } from '@tanstack/react-query';
import getQueryFn from '../../components/utils/getQueryFn';
import config from '../../helpers/queryConfig';
import endpoints from '../../components/utils/apiEndpoints';

const defaultTo = { elements: [], total: 0, links: {}, limit: 0 };

let sumAll = [];
let sumPublic = [];
let sumWrong = [];
let listOfNames = [];
let newRoutes = {};

const DAYS_HOURS = [
    { title: 'Poniedziałek', day: 1 },
    { title: 'Wtorek', day: 2 },
    { title: 'Środa', day: 3 },
    { title: 'Czwartek', day: 4 },
    { title: 'Piątek', day: 5 },
    { title: 'Sobota', day: 6 },
    { title: 'Niedziela', day: 0 },
];

const Route: React.FC<{ route: any }> = ({ route }) => {
    const mapImages = route.images.find(({ type }) => type === 'map') || {};
    const squareImages = mapImages?.variants?.square;
    const image = squareImages ? squareImages[squareImages.length - 1] : null;

    return (
        <Box
            sx={{
                backgroundColor: `${image?.url ? (route.isPublic ? '#68B028' : 'khaki') : 'red'}`,
                m: '2px',
                width: '12px',
                height: '12px',
                border: '1px solid #313131',
            }}
        />
    );
};

const CollectData: React.FC<{ route: any; setChartData: any }> = ({ route, setChartData }) => {
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

    return null;
};

const Legend: React.FC<{ color: string; title: string }> = ({ color, title }) => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <Box
                sx={{
                    backgroundColor: `${color}`,
                    mx: '5px',
                    my: '7px',
                    width: '12px',
                    height: '12px',
                    border: '1px solid #313131',
                }}
            />
            <Box>{title}</Box>
        </Container>
    );
};

export default function Page({}) {
    const [name, setName] = useState('');
    const [page, setPage] = useState(0);
    const [routesData, setRoutesData] = useState({
        goodRoutes: sumAll.length - sumWrong.length,
        wrongRoutes: sumWrong.length,
        publicRoutes: sumPublic.length,
        allRoutes: sumAll.length,
    });

    const debouncedName = useDebounce(name, 333);

    const { data: { total, elements, links, limit } = defaultTo, error } = useQuery(
        ['routeStatistics', page, debouncedName],
        () =>
            getQueryFn(
                `${endpoints.cyclingMap}/lookup?${page ? qs.stringify({ name: debouncedName, page, limit: 500 }) : ''}`,
            ),
        { ...config },
    );

    const debouncedTotal = useDebounce(total, 125);
    const debouncedLimit = useDebounce(limit === 10 ? 500 : limit, 125);

    const pagesNumber = Math.ceil(debouncedTotal / debouncedLimit);
    const pages = Array(isFinite(pagesNumber) ? pagesNumber : 1)
        .fill(0)
        .map((v, i) => i + 1);

    const [chartData, setChartData] = useState(null);
    const [filteredChartData, setFilteredChartData] = useState(null);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [veryStartDate, setVeryStartDate] = useState(new Date());
    const [veryEndDate, setVeryEndDate] = useState(new Date());

    useEffect(() => {
        if (!(total - sumAll.length < 0)) {
            setRoutesData({
                goodRoutes: sumAll.length - sumWrong.length,
                wrongRoutes: sumWrong.length,
                publicRoutes: sumPublic.length,
                allRoutes: sumAll.length,
            });
        }
    }, [page, elements, total, limit]);

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
    }, [chartData, page]);

    useEffect(() => {
        if (!chartData) return;
        const tempChartData = [];
        const imgTempData = [];
        for (const cd of chartData) {
            const itemData = new Date(cd.createdAt);
            if (itemData < startDate) continue;
            if (itemData > endDate) continue;
            tempChartData.push(cd);

            if (cd.images.length > 1) imgTempData.push(cd);
        }
        setFilteredChartData(tempChartData);
    }, [chartData, startDate, endDate]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    m: 2,
                }}
            >
                <Typography variant="h4" textAlign="center">
                    Przeklikaj poszczególne zakładki od 1 - do ostatniej aby zliczyć trasy i zbudować listę nazw tras
                    publicznych
                </Typography>
            </Box>
            <Box
                sx={{
                    mt: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <PagesBar page={page} pages={pages} setPage={setPage} />

                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    {total - sumAll.length <= 0 && <Box>WCZYTANO WSZYSTKIE TRASY</Box>}
                    {total - sumAll.length > 0 && (
                        <Box sx={{ ml: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box>
                                Wszystkich tras: {total}, Tras wczytanych: {sumAll.length}
                            </Box>
                            <Box sx={{ ml: '20px' }}> Posostało do wczytania: {total - sumAll.length}</Box>
                        </Box>
                    )}
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        maxHeight: '350px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 5,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: 30,
                        }}
                    >
                        <ChartTypes3D
                            data={[
                                ['Trasa', 'ilość danego typu'],
                                ['prywatne', routesData.goodRoutes],
                                ['upublicznione', routesData.publicRoutes],
                                ['uszkodzone', routesData.wrongRoutes],
                            ]}
                            title={'Zestawienie ilości tras'}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <h2>Ilość wszystkich tras: {routesData.allRoutes}</h2>
                        <h2>Ilość tras publicznych: {routesData.publicRoutes}</h2>
                        <h2>Ilość poprawnych tras: {routesData.goodRoutes}</h2>
                        <h2>Ilość tras uszkodzonych: {routesData.wrongRoutes}</h2>
                    </Box>
                </Box>

                <Box>
                    <DateInputs
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        veryStartDate={veryStartDate}
                        veryEndDate={veryEndDate}
                    />
                </Box>
            </Box>

            <Container
                sx={{
                    display: 'flex',
                    my: '20px',
                    pb: '30px',
                    borderTop: '1px solid #ddd',
                    borderBottom: '1px solid #ddd',
                    flexDirection: 'row',
                    maxWidth: '100%',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                }}
            >
                <Box>
                    <ChartDate data={filteredChartData} title={'Ilość tras według dat'} page={page} />
                </Box>

                <Box sx={{ width: '500px' }}>
                    <ChartDay data={filteredChartData} title={'Ilość tras według dni'} page={page} />
                </Box>

                <Box sx={{ width: '500px' }}>
                    <ChartHour data={filteredChartData} title={'Ilość tras według godzin'} page={page} />
                </Box>
            </Container>

            <Container
                sx={{
                    my: '20px',
                    pb: '30px',
                    display: 'flex',
                    borderTop: '1px solid #ddd',
                    borderBottom: '1px solid #ddd',
                    flexDirection: 'row',
                    maxWidth: '100%',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                }}
            >
                {DAYS_HOURS.map((e) => (
                    <Box sx={{ width: '300px' }}>
                        <ChartHoursOfDay
                            data={filteredChartData}
                            day={e.day}
                            id={'10' + e.day}
                            title={e.title}
                            page={page}
                        />
                    </Box>
                ))}
            </Container>

            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    my: '20px',
                }}
            >
                <Legend color={'khaki'} title={' - trasy prawidłowe'} />
                <Legend color={'#68B028'} title={' - trasy upublicznione'} />
                <Legend color={'#cf0f36'} title={' - trasy uszkodzone'} />
            </Container>

            {elements?.length === 0 ? null : (
                <>
                    {elements?.map((el, index) => {
                        return <CollectData key={'box' + index} route={el} setChartData={setChartData}></CollectData>;
                    })}
                </>
            )}

            {sumAll.length === 0 ? null : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            p: 1,
                            alignItems: 'center',
                            margin: 1,
                            flexWrap: 'wrap',
                            maxWidth: '1300px',
                            ml: 'auto',
                            mr: 'auto',
                        }}
                    >
                        {sumAll?.map((el, index) => {
                            return <Route key={'box' + index} route={el}></Route>;
                        })}
                    </Box>
                </>
            )}
            <Container
                sx={{
                    display: 'flex',
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
            </Container>
        </Box>
    );
}

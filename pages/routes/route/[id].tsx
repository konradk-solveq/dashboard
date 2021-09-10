import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Box, Flex, Button, AspectImage } from 'theme-ui';
import EventsContext from '../../../components/contexts/EventsContext';
import ManageContext from '../../../components/contexts/ManageContext';
import fetcher from '../../../helpers/fetcher';
import { Route } from '../../../components/typings/Route';
import NextLink from 'next/link';

import InputForm from '../../../components/forms/inputForm';
import SwitchForm from '../../../components/forms/swithForm';
import TexareaForm from '../../../components/forms/texareaForm';
import CheckboxList from '../../../components/forms/checkboxList';
import { getData, getTime, getDistance } from '../../../helpers/dataFormat';
import ApiContext from '../../../components/contexts/ApiContext';

const getAdjoiningPages = (num) => {
    if (num > 3) {
        let of3 = num % 3;
        if (of3 == 1) return { page: Math.floor(num / 3), limit: 3, previous: 0, next: 2 };

        let of4 = num % 4;
        if (of4 == 1) return { page: Math.floor(num / 4), limit: 4, previous: 0, next: 2 };
        if (of4 == 2) return { page: Math.floor(num / 4), limit: 4, previous: 1, next: 3 };

        let of5 = num % 5;
        if (of5 == 1) return { page: Math.floor(num / 5), limit: 5, previous: 0, next: 2 };
        if (of5 == 2) return { page: Math.floor(num / 5), limit: 5, previous: 1, next: 3 };
        if (of5 == 3) return { page: Math.floor(num / 5), limit: 5, previous: 2, next: 4 };

        let of7 = num % 7;
        if (of7 == 1) return { page: Math.floor(num / 7), limit: 7, previous: 0, next: 2 };
        if (of7 == 2) return { page: Math.floor(num / 7), limit: 7, previous: 1, next: 3 };
        if (of7 == 3) return { page: Math.floor(num / 7), limit: 7, previous: 2, next: 4 };
        if (of7 == 4) return { page: Math.floor(num / 7), limit: 7, previous: 3, next: 5 };
        if (of7 == 5) return { page: Math.floor(num / 7), limit: 7, previous: 4, next: 6 };

        let of11 = num % 11;
        if (of11 == 1) return { page: Math.floor(num / 11), limit: 11, previous: 0, next: 2 };
        if (of11 == 2) return { page: Math.floor(num / 11), limit: 11, previous: 1, next: 3 };
        if (of11 == 3) return { page: Math.floor(num / 11), limit: 11, previous: 2, next: 4 };
        if (of11 == 4) return { page: Math.floor(num / 11), limit: 11, previous: 3, next: 5 };
        if (of11 == 6) return { page: Math.floor(num / 11), limit: 11, previous: 4, next: 6 };
        if (of11 == 7) return { page: Math.floor(num / 11), limit: 11, previous: 5, next: 7 };
        if (of11 == 8) return { page: Math.floor(num / 11), limit: 11, previous: 6, next: 8 };
        if (of11 == 9) return { page: Math.floor(num / 11), limit: 11, previous: 7, next: 9 };
        if (of11 == 10) return { page: Math.floor(num / 11), limit: 11, previous: 8, next: 10 };

        let of17 = num % 17;
        if (of17 == 1) return { page: Math.floor(num / 17), limit: 17, previous: 0, next: 2 };
        if (of17 == 2) return { page: Math.floor(num / 17), limit: 17, previous: 1, next: 3 };
        if (of17 == 3) return { page: Math.floor(num / 17), limit: 17, previous: 2, next: 4 };
        if (of17 == 4) return { page: Math.floor(num / 17), limit: 17, previous: 3, next: 5 };
        if (of17 == 6) return { page: Math.floor(num / 17), limit: 17, previous: 4, next: 6 };
        if (of17 == 7) return { page: Math.floor(num / 17), limit: 17, previous: 5, next: 7 };
        if (of17 == 8) return { page: Math.floor(num / 17), limit: 17, previous: 6, next: 8 };
        if (of17 == 9) return { page: Math.floor(num / 17), limit: 17, previous: 7, next: 9 };
        if (of17 == 10) return { page: Math.floor(num / 17), limit: 17, previous: 8, next: 10 };
        if (of17 == 11) return { page: Math.floor(num / 17), limit: 17, previous: 9, next: 11 };
        if (of17 == 12) return { page: Math.floor(num / 17), limit: 17, previous: 10, next: 12 };
        if (of17 == 13) return { page: Math.floor(num / 17), limit: 17, previous: 11, next: 13 };
        if (of17 == 14) return { page: Math.floor(num / 17), limit: 17, previous: 12, next: 14 };
        if (of17 == 15) return { page: Math.floor(num / 17), limit: 17, previous: 13, next: 15 };
        if (of17 == 16) return { page: Math.floor(num / 17), limit: 17, previous: 14, next: 16 };

        let of27 = num % 27;
        if (of27 == 1) return { page: Math.floor(num / 27), limit: 27, previous: 0, next: 2 };
        if (of27 == 2) return { page: Math.floor(num / 27), limit: 27, previous: 1, next: 3 };
        if (of27 == 3) return { page: Math.floor(num / 27), limit: 27, previous: 2, next: 4 };
        if (of27 == 4) return { page: Math.floor(num / 27), limit: 27, previous: 3, next: 5 };
        if (of27 == 6) return { page: Math.floor(num / 27), limit: 27, previous: 4, next: 6 };
        if (of27 == 7) return { page: Math.floor(num / 27), limit: 27, previous: 5, next: 7 };
        if (of27 == 8) return { page: Math.floor(num / 27), limit: 27, previous: 6, next: 8 };
        if (of27 == 9) return { page: Math.floor(num / 27), limit: 27, previous: 7, next: 9 };
        if (of27 == 10) return { page: Math.floor(num / 27), limit: 27, previous: 8, next: 10 };
        if (of27 == 11) return { page: Math.floor(num / 27), limit: 27, previous: 9, next: 11 };
        if (of27 == 12) return { page: Math.floor(num / 27), limit: 27, previous: 10, next: 12 };
        if (of27 == 13) return { page: Math.floor(num / 27), limit: 27, previous: 11, next: 13 };
        if (of27 == 14) return { page: Math.floor(num / 27), limit: 27, previous: 12, next: 14 };
        if (of27 == 15) return { page: Math.floor(num / 27), limit: 27, previous: 13, next: 15 };
        if (of27 == 16) return { page: Math.floor(num / 27), limit: 27, previous: 14, next: 16 };
        if (of27 == 17) return { page: Math.floor(num / 27), limit: 27, previous: 14, next: 17 };
        if (of27 == 18) return { page: Math.floor(num / 27), limit: 27, previous: 14, next: 18 };
        if (of27 == 19) return { page: Math.floor(num / 27), limit: 27, previous: 14, next: 19 };
        if (of27 == 20) return { page: Math.floor(num / 27), limit: 27, previous: 14, next: 20 };
        if (of27 == 21) return { page: Math.floor(num / 27), limit: 27, previous: 14, next: 21 };
        if (of27 == 22) return { page: Math.floor(num / 27), limit: 27, previous: 14, next: 22 };
        if (of27 == 23) return { page: Math.floor(num / 27), limit: 27, previous: 14, next: 23 };
        if (of27 == 24) return { page: Math.floor(num / 27), limit: 27, previous: 14, next: 24 };
        if (of27 == 25) return { page: Math.floor(num / 27), limit: 27, previous: 14, next: 25 };
        if (of27 == 26) return { page: Math.floor(num / 27), limit: 27, previous: 14, next: 26 };
    } else {
        let page = 0;
        switch (num) {
            case 0:
                return { page, limit: 2, previous: null, next: 1 };
            case 1:
                return { page, limit: 3, previous: 0, next: 2 };
            case 2:
                return { page, limit: 4, previous: 1, next: 3 };
            case 3:
                return { page, limit: 5, previous: 2, next: 4 };
        }
    }

    return { page: 0, limit: 2, previous: null, next: null };
};

interface Props {}
const Page: React.FC<Props> = ({}) => {
    const router = useRouter();
    const { config } = useContext(ApiContext);
    const events = useContext(EventsContext);
    const manage = useContext(ManageContext);
    const id = router.query.id as string;
    const { data, mutate } = useSWR<Route, any>(`/api/routes/route/${id}?${events.getRouteUpdates(id)}`, fetcher);

    const num = Number(router.query.num);
    const [previousPage, setPreviousPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    const tagsOptions = config.tags;
    const surfaceOptions = config.surfaces;
    const difficultyOptions = config.difficulties;

    const [difficulty, setDifficulty] = useState([]);
    const [surface, setSurface] = useState([]);
    const [tags, setTags] = useState([]);

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [descriptionShort, setDescriptionShort] = useState('');
    const [descriptionLong, setDescriptionLong] = useState('');
    const [newDescription, setNewDescription] = useState<null | string>(null);
    const [recommended, setRecommended] = useState(false);
    const [isPublic, setIsPublic] = useState(false);

    const [map, setMap] = useState(null);
    const [images, setImages] = useState(null);

    const heandleSendData = () => {
        return false;
    };

    useEffect(() => {
        const adjoiningPages = getAdjoiningPages(num);

        fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/cycling-map/manage/lookup?page=${adjoiningPages.page + 1}&limit=${
                adjoiningPages.limit
            }&name=%20&recommended=false&public=false`,
        )
            .then((response) => response.json())
            .then((data) => {
                if (num > 0) {
                    let previousId = data.elements[adjoiningPages.previous].id;
                    setPreviousPage(previousId);
                }

                if (num + 1 < data.total) {
                    let nextId = data.elements[adjoiningPages.next].id;
                    setNextPage(nextId);
                }
            });
    }, [num, id, name]);

    useEffect(() => {
        if (data) {
            if (data.difficulty) {
                setDifficulty(data.difficulty.values);
            }
            if (data.surface) {
                setSurface(data.surface.values);
            }
            if (data.tags) {
                setTags(data.tags.values);
            }

            setName(data.name);
            setLocation(data.location);

            if (data.description) {
                if (typeof data.description == 'string') {
                    setNewDescription(data.description);
                } else {
                    if (data.description.short == '') {
                        setNewDescription(data.description.long);
                        setDescriptionShort(null);
                        setDescriptionLong(null);
                    } else {
                        setDescriptionShort(data.description.short);
                        setDescriptionLong(data.description.long);
                        setNewDescription(null);
                    }
                }
            }

            setRecommended(!!data.recommended);
            setIsPublic(!!data.isPublic);

            setMap(data.images.filter((e) => e.type == 'map'));
            setImages(data.images.filter((e) => e.type == 'photo'));
        }
    }, [data]);

    if (router.isFallback) return <div>Loading...</div>;
    if (!data) {
        return <div>Loading...</div>;
    }

    const checkNoData = (d) => {
        if (typeof d == 'undefined') {
            return <Box sx={{ fontFamily: 'din-b', color: 'primary' }}>-- undefined --</Box>;
        }
        if (d == null) {
            return <Box sx={{ fontFamily: 'din-b', color: 'primary' }}>-- null --</Box>;
        } else {
            return <Box sx={{ fontFamily: 'din-b' }}>{d.toString()}</Box>;
        }
    };

    const heandleSaveData = () => {
        // TODO backend

        const body: any = {
            name: name,
            difficulty: difficulty,
            surface: surface,
            tags: tags,
            location: location,
            recommended: recommended,
        };

        if (!newDescription) {
            body.description = {
                short: descriptionShort,
                long: descriptionLong,
            };
        } else {
            body.description = {
                short: null,
                long: newDescription,
            };
        }
        manage.updateMetadata(id, body as any);
        console.log('%c data:', 'background: #ffcc00; color: #003300', body);
    };

    const heandleDataRefresh = () => {
        // TODO backend
        mutate();
    };

    const heandleDescriptionConcat = () => {
        setNewDescription(`${descriptionShort} ${descriptionLong}`);
    };

    const heandleDescriptionShort = () => {
        setNewDescription(`${descriptionShort}`);
    };

    const heandleDescriptionLong = () => {
        setNewDescription(`${descriptionLong}`);
    };

    return (
        <Flex
            sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <Flex sx={{ width: '100%', justifyContent: 'space-between', mb: '20px' }}>
                {previousPage && (
                    <NextLink href={`${previousPage}?num=${num - 1}`} passHref>
                        <Button className="sys-btn" onClick={heandleDataRefresh}>
                            &lt;&lt;&lt; porprzednia
                        </Button>
                    </NextLink>
                )}
                {!previousPage && <Box sx={{ width: '100px', height: '20px' }} />}
                <Box>{num}</Box>
                {nextPage && (
                    <NextLink href={`${nextPage}?num=${num + 1}`} passHref>
                        <Button className="sys-btn" onClick={heandleDataRefresh}>
                            następna &gt;&gt;&gt;
                        </Button>
                    </NextLink>
                )}
                {!nextPage && <Box sx={{ width: '100px', height: '20px' }} />}
            </Flex>

            {data && (
                <Box
                    onSubmit={heandleSendData}
                    sx={{
                        bg: '#ddd',
                        px: '20px',
                        py: '20px',
                        borderRadius: '10px',
                    }}
                >
                    <Flex
                        sx={{
                            justifyContent: 'space-between',
                            flexDirection: ['column', 'column', 'row'],
                        }}
                    >
                        <Box>
                            <Flex>
                                <Box sx={{ mr: '5px' }}>id trasy: </Box>
                                {checkNoData(id)}
                            </Flex>
                            <Flex>
                                <Box sx={{ mr: '5px' }}>id właściciela: </Box>
                                {checkNoData(data.ownerId)}
                            </Flex>
                            <Flex>
                                <Box sx={{ mr: '5px' }}>autor: </Box>
                                {checkNoData(data.author)}
                            </Flex>
                            <Flex>
                                <Box sx={{ mr: '5px' }}>utworzona: </Box>
                                {checkNoData(getData(data.createdAt))}
                            </Flex>
                            <Flex>
                                <Box sx={{ mr: '5px' }}>dystans: </Box>
                                {checkNoData(getDistance(data.distance))}
                            </Flex>
                            <Flex>
                                <Box sx={{ mr: '5px' }}>czas: </Box>
                                {checkNoData(getTime(data.time))}
                            </Flex>
                            <Flex>
                                <Box sx={{ mr: '5px' }}>pobrania: </Box>
                                {checkNoData(data.downloads)}
                            </Flex>
                            <Flex>
                                <Box sx={{ mr: '5px' }}>lajki: </Box>
                                {checkNoData(data.reactions.like)}
                            </Flex>
                            {/* <Flex><Box sx={{ mr: '5px' }}>wow: </Box>{checkNoData(data.reactions.wow)}</Flex> */}
                            {/* <Flex><Box sx={{ mr: '5px' }}>love: </Box>{checkNoData(data.reactions.love)}</Flex> */}
                            <Flex>
                                <Box sx={{ mr: '5px' }}>reakcje: </Box>
                                {checkNoData(data.reaction)}
                            </Flex>
                            <Flex>
                                <Box sx={{ mr: '5px' }}>polecana: </Box>
                                {checkNoData(data.isFeatured)}
                            </Flex>
                        </Box>
                        {map && map.length > 0 && (
                            <Box sx={{ width: ['100%', '80%', '45%', '35%'], maxWidth: '300px', mb: '15px' }}>
                                <AspectImage
                                    sx={
                                        {
                                            // width: '100px'
                                        }
                                    }
                                    ratio={1 / 1}
                                    src={map[0].variants.square[1].url}
                                ></AspectImage>
                            </Box>
                        )}
                    </Flex>

                    <InputForm title={'nazwa:'} value={name} setValue={(e) => setName(e)} />
                    <InputForm title={'lokalizacja:'} value={location} setValue={(e) => setLocation(e)} />

                    {descriptionShort && descriptionLong && (
                        <>
                            <Flex>
                                <Box sx={{ width: '90%' }}>
                                    <InputForm
                                        title={'opis krótki'}
                                        value={descriptionShort}
                                        setValue={(e) => setDescriptionShort(e)}
                                    />
                                    <TexareaForm
                                        title={'opis długi'}
                                        value={descriptionLong}
                                        setValue={(e) => setDescriptionLong(e)}
                                    />
                                </Box>
                                <Flex
                                    sx={{
                                        // bg: 'khaki',
                                        pl: '40px',
                                        pt: '20px',
                                        borderTop: '1px solid #55555544',
                                        mt: '5px',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        width: 'max-content',
                                    }}
                                >
                                    <Button
                                        className="sys-btn"
                                        type="button"
                                        sx={{ py: '3px', px: '10px', mb: '5px' }}
                                        onClick={() => heandleDescriptionConcat()}
                                    >
                                        połącz ze opisy
                                    </Button>
                                    <Button
                                        className="sys-btn"
                                        type="button"
                                        sx={{ py: '3px', px: '10px', mb: '5px' }}
                                        onClick={() => heandleDescriptionShort()}
                                    >
                                        wybierz krótki
                                    </Button>
                                    <Button
                                        className="sys-btn"
                                        type="button"
                                        sx={{ py: '3px', px: '10px' }}
                                        onClick={() => heandleDescriptionLong()}
                                    >
                                        wybierz długi
                                    </Button>
                                </Flex>
                            </Flex>
                        </>
                    )}
                    <TexareaForm title={'opis'} value={newDescription} setValue={setNewDescription} highlight={true} />

                    <SwitchForm title={'rekomendowane'} checked={recommended} setChecked={(e) => setRecommended(e)} />
                    <SwitchForm title={'publiczna'} checked={isPublic} setChecked={(e) => setIsPublic(e)} />

                    <CheckboxList
                        title={'trudność:'}
                        listOptions={difficultyOptions}
                        values={difficulty}
                        setValues={(e) => setDifficulty(e)}
                    />

                    <CheckboxList
                        title={'nawierzchnia:'}
                        listOptions={surfaceOptions}
                        values={surface}
                        setValues={(e) => setSurface(e)}
                    />

                    <CheckboxList
                        title={'tagi:'}
                        listOptions={tagsOptions}
                        values={tags}
                        setValues={(e) => setTags(e)}
                    />

                    <Box
                        sx={{
                            borderTop: '1px solid #55555544',
                            mt: '5px',
                            py: '5px',
                        }}
                    ></Box>

                    {images && (
                        <Flex
                            sx={{
                                flexWrap: 'wrap',
                            }}
                        >
                            {images.map((e, i) => (
                                <Box
                                    sx={{
                                        width: ['100%', '80%', '45%', '35%'],
                                        maxWidth: '300px',
                                        mb: '15px',
                                        mr: '20px',
                                    }}
                                    key={'img_' + i}
                                >
                                    <AspectImage ratio={1 / 1} src={e.variants.square[1].url}></AspectImage>
                                </Box>
                            ))}
                        </Flex>
                    )}

                    <Flex
                        sx={{
                            width: '100%',
                            justifyContent: 'center',
                            mt: '16px',
                        }}
                    >
                        <Button type="button" className="sys-btn" onClick={heandleSaveData}>
                            Zmień / zapisz
                        </Button>
                    </Flex>
                </Box>
            )}

            <Flex sx={{ width: '100%', justifyContent: 'space-between', mt: '20px' }}>
                {previousPage && (
                    <NextLink href={`${previousPage}?num=${num - 1}`} passHref>
                        <Button className="sys-btn" onClick={heandleDataRefresh}>
                            &lt;&lt;&lt; porprzednia
                        </Button>
                    </NextLink>
                )}
                {!previousPage && <Box sx={{ width: '100px', height: '20px' }} />}
                {nextPage && (
                    <NextLink href={`${nextPage}?num=${num + 1}`} passHref>
                        <Button className="sys-btn" onClick={heandleDataRefresh}>
                            następna &gt;&gt;&gt;
                        </Button>
                    </NextLink>
                )}
                {!nextPage && <Box sx={{ width: '100px', height: '20px' }} />}
            </Flex>
        </Flex>
    );
};

export default Page;

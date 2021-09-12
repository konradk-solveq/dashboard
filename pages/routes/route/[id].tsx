import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { AspectImage, Box, Button, Flex } from 'theme-ui';

import ApiContext from '../../../components/contexts/ApiContext';
import EventsContext from '../../../components/contexts/EventsContext';
import ManageContext from '../../../components/contexts/ManageContext';
import CheckboxList from '../../../components/forms/checkboxList';
import InputForm from '../../../components/forms/inputForm';
import SwitchForm from '../../../components/forms/swithForm';
import TexareaForm from '../../../components/forms/texareaForm';
import { Route } from '../../../components/typings/Route';
import { getData, getDistance, getTime } from '../../../helpers/dataFormat';
import fetcher from '../../../helpers/fetcher';

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
        if (data) {
            if (data.difficulty) {
                setDifficulty(data.difficulty);
            }
            if (data.surface) {
                setSurface(data.surface);
            }
            if (data.tags) {
                setTags(data.tags);
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

    const handleSaveData = () => {
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
    };

    const heandleDataRefresh = () => {};

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
                                    <AspectImage ratio={1} src={e.variants.square[1].url}></AspectImage>
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
                        <Button type="button" className="sys-btn" onClick={handleSaveData}>
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

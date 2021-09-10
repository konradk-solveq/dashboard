import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Box, Flex, Button, Label, Input, Checkbox, AspectImage } from 'theme-ui';
import EventsContext from '../../../components/contexts/EventsContext';
import ManageContext from '../../../components/contexts/ManageContext';
import fetcher from '../../../helpers/fetcher';
import { Route } from '../../../components/typings/Route';

import InputForm from '../../../components/forms/inputForm';
import SwitchForm from '../../../components/forms/swithForm';
import TexareaForm from '../../../components/forms/texareaForm';
import CheckboxList from '../../../components/forms/checkboxList';
import { getData, getTime, getDistance } from '../../../helpers/dataFormat';
import { wrap } from 'module';
import InputOptional from '../../../components/forms/inputOpional';
import { relative } from 'path/posix';

interface Props { };
const Page: React.FC<Props> = ({ }) => {

    const router = useRouter();
    const events = useContext(EventsContext);
    const api = useContext(ManageContext);
    const id = router.query.id as string;
    const num = router.query.num as string;
    const { data, mutate } = useSWR<Route, any>(`/api/routes/route/${id}?${events.getRouteUpdates(id)}`, fetcher);
    // console.log('%c data:', 'background: #ffcc00; color: #003300', data)

    const [difficultyOptions, setDifficultyOptions] = useState([]);
    const [difficulty, setDifficulty] = useState([]);
    const [surfaceOptions, setSurfaceOptions] = useState([]);
    const [surface, setSurface] = useState([]);
    const [tagsOptions, setTagsOptions] = useState([]);
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
    
    const heandleSendData = () => { return false; };
    
    useEffect(() => {
        // console.log('%c descriptionShort:', 'background: #ffcc00; color: #003300', descriptionShort)
        // console.log('%c descriptionLong:', 'background: #ffcc00; color: #003300', descriptionLong)
        // console.log('%c newDescription:', 'background: #ffcc00; color: #003300', newDescription)
        if (data) {
            if (data.difficulty) {
                setDifficultyOptions(data.difficulty.options);
                setDifficulty(data.difficulty.values)
            }
            if (data.surface) {
                setSurfaceOptions(data.surface.options);
                setSurface(data.surface.values);
            }
            if (data.tags) {
                setTagsOptions(data.tags.options);
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
                    }
                }
            }

            setRecommended(!!data.recommended);
            setIsPublic(!!data.isPublic)

            setMap(data.images.filter(e => e.type == 'map'));
            setImages(data.images.filter(e => e.type == 'photo'));
        }
    }, [data])

    if (router.isFallback) return <div>Loading...</div>;
    if (!data) {
        return <div>Loading...</div>;
    }

    const checkNoData = d => {
        if (typeof d == 'undefined') { return (<Box sx={{ fontFamily: 'din-b', color: 'primary' }}>-- undefined --</Box>); }
        if (d == null) { return (<Box sx={{ fontFamily: 'din-b', color: 'primary' }}>-- null --</Box>); }
        else { return <Box sx={{ fontFamily: 'din-b', }}>{d.toString()}</Box> }
    }

    const heandleSaveData = async () => { // TODO backend

        if (isPublic) { api.publish(id) } else { api.unpublish(id) }

        const body = {
            name: name,
            difficulty: difficulty,
            surface: surface,
            tags: tags,
            location: location,
            recommended: recommended,
            // bike: '',
            reactions: {
                like: 0,
                wow: 0,
                love: 0,
            },
            // description: {
            //     // short: null,
            //     short: 'description Short',
            //     long: 'description Long',
            // }
            // format: 'v1',
        }

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
        // console.log('%c newDescription:', 'background: #ffcc00; color: #003300', newDescription)
        // console.log('%c body:', 'background: green; color: #003300', JSON.stringify(body))

        const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cycling-map/manage/${id}/metadata?id=${id}`, {
            method: 'PATCH',
            body: JSON.stringify(body),
        });
    }

    const heandleNextRoute = () => { // TODO backend
        console.log('%c heandleNextRoute:', 'background: #ffcc00; color: #003300')
    }

    const heandlePreviousRoute = () => { // TODO backend
        console.log('%c heandlePreviousRoute:', 'background: #ffcc00; color: #003300')
    }

    const heandleDescriptionConcat = () => {
        setNewDescription(`${descriptionShort} ${descriptionLong}`)
    }

    const heandleDescriptionShort = () => {
        setNewDescription(`${descriptionShort}`)
    }

    const heandleDescriptionLong = () => {
        setNewDescription(`${descriptionLong}`)
    }

    return (
        <Flex
            sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <Box>{num}</Box>
            <Flex sx={{ width: '100%', justifyContent: 'space-between', mb: '20px', }}>
                <Button className='sys-btn' onClick={heandleNextRoute}>&lt;&lt;&lt; porprzednia</Button>
                <Button className='sys-btn' onClick={heandlePreviousRoute}>następna &gt;&gt;&gt;</Button>
            </Flex>

            {data && (
                <Box onSubmit={heandleSendData}
                    sx={{
                        bg: '#ddd',
                        px: '20px',
                        py: '20px',
                        borderRadius: '10px',
                    }}>
                    <Flex sx={{
                        justifyContent: 'space-between',
                        flexDirection: ['column', 'column', 'row']
                    }}>
                        <Box>
                            <Flex><Box sx={{ mr: '5px' }}>id trasy: </Box>{checkNoData(id)}</Flex>
                            <Flex><Box sx={{ mr: '5px' }}>id właściciela: </Box>{checkNoData(data.ownerId)}</Flex>
                            <Flex><Box sx={{ mr: '5px' }}>autor: </Box>{checkNoData(data.author)}</Flex>
                            <Flex><Box sx={{ mr: '5px' }}>utworzona: </Box>{checkNoData(getData(data.createdAt))}</Flex>
                            <Flex><Box sx={{ mr: '5px' }}>dystans: </Box>{checkNoData(getDistance(data.distance))}</Flex>
                            <Flex><Box sx={{ mr: '5px' }}>czas: </Box>{checkNoData(getTime(data.time))}</Flex>
                            <Flex><Box sx={{ mr: '5px' }}>pobrania: </Box>{checkNoData(data.downloads)}</Flex>
                            <Flex><Box sx={{ mr: '5px' }}>lajki: </Box>{checkNoData(data.reactions.like)}</Flex>
                            {/* <Flex><Box sx={{ mr: '5px' }}>wow: </Box>{checkNoData(data.reactions.wow)}</Flex> */}
                            {/* <Flex><Box sx={{ mr: '5px' }}>love: </Box>{checkNoData(data.reactions.love)}</Flex> */}
                            <Flex><Box sx={{ mr: '5px' }}>reakcje: </Box>{checkNoData(data.reaction)}</Flex>
                            <Flex><Box sx={{ mr: '5px' }}>polecana: </Box>{checkNoData(data.isFeatured)}</Flex>
                        </Box>
                        {map && <Box sx={{ width: ['100%', '80%', '45%', '35%'], maxWidth: '300px', mb: '15px' }}>
                            <AspectImage
                                sx={{
                                    // width: '100px'
                                }}
                                ratio={1 / 1}
                                src={map[0].variants.square[1].url}
                            ></AspectImage>
                        </Box>}
                    </Flex>

                    <InputForm title={'nazwa:'} value={name} setValue={e => setName(e)} />
                    <InputForm title={'lokalizacja:'} value={location} setValue={e => setLocation(e)} />

                    {descriptionShort && descriptionLong && <>
                        <Flex >
                            <Box sx={{ width: '90%' }}>
                                <InputForm title={'opis krótki'} value={descriptionShort} setValue={e => setDescriptionShort(e)} />
                                <TexareaForm title={'opis długi'} value={descriptionLong} setValue={e => setDescriptionLong(e)} />
                                {newDescription && <TexareaForm title={'nowy opis'} value={newDescription} setValue={e => setNewDescription(e)} highlight={true} />}

                            </Box>
                            <Flex sx={{
                                // bg: 'khaki',
                                pl: '40px',
                                pt: '20px',
                                borderTop: '1px solid #55555544',
                                mt: '5px',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                width: 'max-content'
                            }}>
                                <Button
                                    className='sys-btn'
                                    type='button'
                                    sx={{ py: '3px', px: '10px', mb: '5px' }}
                                    onClick={() => heandleDescriptionConcat()}
                                >połącz ze opisy</Button>
                                <Button
                                    className='sys-btn'
                                    type='button'
                                    sx={{ py: '3px', px: '10px', mb: '5px' }}
                                    onClick={() => heandleDescriptionShort()}
                                >wybierz krótki</Button>
                                <Button
                                    className='sys-btn'
                                    type='button'
                                    sx={{ py: '3px', px: '10px', }}
                                    onClick={() => heandleDescriptionLong()}
                                >wybierz długi</Button>
                            </Flex>
                        </Flex>
                    </>}
                    {(!data.description) || !(descriptionShort && descriptionLong) && <TexareaForm title={'opis'} value={newDescription} setValue={setNewDescription} highlight={true} />}

                    <SwitchForm title={'rekomendowane'} checked={recommended} setChecked={e => setRecommended(e)} />
                    <SwitchForm title={'publiczna'} checked={isPublic} setChecked={e => setIsPublic(e)} />

                    <CheckboxList
                        title={'trudność:'}
                        listOptions={difficultyOptions}
                        values={difficulty}
                        setValues={e => setDifficulty(e)}
                    />

                    <CheckboxList
                        title={'nawierzchnia:'}
                        listOptions={surfaceOptions}
                        values={surface}
                        setValues={e => setSurface(e)}
                    />

                    <CheckboxList
                        title={'tagi:'}
                        listOptions={tagsOptions}
                        values={tags}
                        setValues={e => setTags(e)}
                    />

                    <Box sx={{
                        borderTop: '1px solid #55555544',
                        mt: '5px',
                        py: '5px',
                    }}></Box>

                    {images && <Flex sx={{
                        flexWrap: 'wrap'
                    }}>
                        {images.map((e, i) => <Box
                            sx={{ width: ['100%', '80%', '45%', '35%'], maxWidth: '300px', mb: '15px', mr: '20px' }}
                            key={'img_' + i}
                        >
                            <AspectImage

                                ratio={1 / 1}
                                src={e.variants.square[1].url}
                            ></AspectImage>
                        </Box>)}
                    </Flex>}

                    <Flex sx={{
                        width: '100%',
                        justifyContent: 'center',
                        mt: '16px',
                    }}>
                        <Button type='button' className='sys-btn' onClick={heandleSaveData}>Zmień / zapisz</Button>
                    </Flex>
                </Box>
            )}

            <Flex sx={{ width: '100%', justifyContent: 'space-between', mt: '20px', }}>
                <Button className='sys-btn' onClick={heandleNextRoute}>&lt;&lt;&lt; porprzednia</Button>
                <Button className='sys-btn' onClick={heandlePreviousRoute}>następna &gt;&gt;&gt;</Button>
            </Flex>
        </Flex >
    );
};

export default Page;

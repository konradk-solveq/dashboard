import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Box, Flex, Button, Label, Input, Switch } from 'theme-ui';
import EventsContext from '../../../components/contexts/EventsContext';
import ManageContext from '../../../components/contexts/ManageContext';
import fetcher from '../../../helpers/fetcher';
import { Route } from '../../../components/typings/Route';

import InputForm from '../../../components/forms/inputForm';
import SwitchForm from '../../../components/forms/swithForm';
import TexareaForm from '../../../components/forms/texareaForm';

interface Props { };
const Page: React.FC<Props> = ({ }) => {

    const router = useRouter();
    const events = useContext(EventsContext);
    const api = useContext(ManageContext);
    const id = router.query.id as string;
    const { data, error } = useSWR<Route, any>(`/api/routes/route/${id}?${events.getRouteUpdates(id)}`, fetcher);
    console.log('%c data:', 'background: #ffcc00; color: #003300', data)

    const [difficultyOptions, setDifficultyOptions] = useState([]);
    const [surfaceOptions, setSurfaceOptions] = useState([]);
    const [tagsOptions, setTagsOptions] = useState([]);

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [descriptionShort, setDescriptionShort] = useState('')
    const [descriptionLong, setDescriptionLong] = useState('')
    const [recommended, setRecommended] = useState(false)


    const heandleSendData = () => { return false; };

    useEffect(() => {
        if (data) {
            if (data.difficulty) {
                setDifficultyOptions(data.difficulty.options);
            }
            if (data.surface) {
                setSurfaceOptions(data.surface.options);
            }
            if (data.tags) {
                setTagsOptions(data.tags.options);
            }

            setName(data.name);
            setLocation(data.location);

            if (data.description) {
                setDescriptionShort(data.description.short);
                setDescriptionLong(data.description.long);
            }

            setRecommended(data.recommended ? true : false);
        }
    }, [data])

    if (router.isFallback) return <div>Loading...</div>;
    if (!data) {
        return <div>Loading...</div>;
    }

    const checkNoData = d => {
        if (d == null) { return (<Box sx={{ fontFamily: 'din-b', color: 'primary' }}>-- null --</Box>); }
        else { return <Box sx={{ fontFamily: 'din-b', }}>{d.toString()}</Box> }
    }

    const sx = {
        label: {
            mr: '5px',
        },
        value: {
            fontFamily: 'din-b',
        }
    }

    const heandleSaveData = () => {
        const ret = {
            name: name,
            difficulty: [],
            surface: [],
            tags: [],
            location: '',
            recommended: recommended,
            bike: '',
            reactions: {
                like: 0,
                wow: 0,
                love: 0,
            },
            format: 'v1',
        }

        if (data.description) {
            ret.description = {
                short: descriptionShort,
                long: descriptionLong,
            };
        }

        console.log('%c data:', 'background: #ffcc00; color: #003300', ret)
    }

    const heandleNextRoute = () => {
        console.log('%c heandleNextRoute:', 'background: #ffcc00; color: #003300')
    }

    const heandlePreviousRoute = () => {
        console.log('%c heandlePreviousRoute:', 'background: #ffcc00; color: #003300')
    }

    return (
        <Flex
            sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <Flex sx={{ width: '100%', justifyContent: 'space-between', mb: '20px', }}>
                <Button className='sys-btn' onClick={heandleNextRoute}>&lt;&lt;&lt; porprzednia</Button>
                <Button className='sys-btn' onClick={heandlePreviousRoute}>następna &gt;&gt;&gt;</Button>
            </Flex>

            {data && (
                <Box as='form' onSubmit={heandleSendData}
                    sx={{
                        bg: '#ddd',
                        px: '20px',
                        py: '20px',
                        borderRadius: '10px',
                    }}>
                    <Flex><Box sx={{ mr: '5px' }}>id trasy: </Box>{checkNoData(id)}</Flex>
                    <Flex><Box sx={{ mr: '5px' }}>id właściciela: </Box>{checkNoData(data.ownerId)}</Flex>
                    <Flex><Box sx={{ mr: '5px' }}>autor: </Box>{checkNoData(data.author)}</Flex>
                    <Flex><Box sx={{ mr: '5px' }}>utworzona: </Box>{checkNoData(data.createdAt)}</Flex>
                    <Flex><Box sx={{ mr: '5px' }}>dystans: </Box>{checkNoData(data.distance)}</Flex>
                    <Flex><Box sx={{ mr: '5px' }}>czas: </Box>{checkNoData(data.time)}</Flex>
                    <Flex><Box sx={{ mr: '5px' }}>pobrania: </Box>{checkNoData(data.downloads)}</Flex>
                    <Flex><Box sx={{ mr: '5px' }}>lajki: </Box>{checkNoData(data.reactions.like)}</Flex>
                    <Flex><Box sx={{ mr: '5px' }}>wow: </Box>{checkNoData(data.reactions.wow)}</Flex>
                    <Flex><Box sx={{ mr: '5px' }}>love: </Box>{checkNoData(data.reactions.love)}</Flex>
                    <Flex><Box sx={{ mr: '5px' }}>reakcje: </Box>{checkNoData(data.reaction)}</Flex>
                    <Flex><Box sx={{ mr: '5px' }}>polecana: </Box>{checkNoData(data.isFeatured)}</Flex>

                    <InputForm title={'nazwa:'} value={name} setValue={e => setName(e)} />
                    <InputForm title={'lokalizacja:'} value={location} setValue={e => setLocation(e)} />

                    {data.description && <>
                        <Flex >
                            <Box sx={{width: '90%'}}>
                                <InputForm title={'opis krótki'} value={descriptionShort} setValue={e => setDescriptionShort(e)} />
                                <TexareaForm title={'opis długi'} value={descriptionLong} setValue={e => setDescriptionLong(e)} />
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
                                    onClick={() => { }}
                                >połącz ze opisy</Button>
                                <Button
                                    className='sys-btn'
                                    type='button'
                                    sx={{ py: '3px', px: '10px', mb: '5px' }}
                                    onClick={() => { }}
                                >wybierz krótki</Button>
                                <Button
                                    className='sys-btn'
                                    type='button'
                                    sx={{ py: '3px', px: '10px', }}
                                    onClick={() => { }}
                                >wybierz długi</Button>
                            </Flex>
                        </Flex>
                    </>}
                    {!data.description && <Box sx={{
                        borderTop: '1px solid #55555544',
                        mt: '5px',
                        fontFamily: 'din-b',
                        fontSize: '20px',
                        color: 'primary',
                    }}>brak opisów</Box>}

                    <SwitchForm title={'rekomendowane'} checked={recommended} setChecked={e => setRecommended(e)} />
                    <SwitchForm title={'publiczna'} checked={data.isPublic} setChecked={() => (data.isPublic ? api.unpublish(id) : api.publish(id))} />

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

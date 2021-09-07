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
    const [descriptionShort, setDescriptionShort] = useState('')
    const [descriptionLong, setDescriptionLong] = useState('')
    const [recommended, setRecommended] = useState(false)


    const heandleSendData = () => { return false; };

    useEffect(() => {
        if (data) {
            if (data.difficulty) {
                setDifficultyOptions(data.difficulty.options)
            }
            if (data.surface) {
                setSurfaceOptions(data.surface.options)
            }
            if (data.tags) {
                setTagsOptions(data.tags.options)
            }

            setName(data.name)
            if (data.description) {
                setDescriptionShort(data.description.short)
                setDescriptionLong(data.description.long)
            }
            setRecommended(data.recommended ? true : false)
        }
    }, [data])

    if (router.isFallback) return <div>Loading...</div>;
    if (!data) {
        return <div>Loading...</div>;
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

    return (
        <Flex
            sx={{
                flexDirection: 'column',
            }}
        >
            <Box>id: {id}</Box>
            {data && (
                <>
                    <Box as='form' onSubmit={heandleSendData}
                        sx={{
                            bg: 'khaki',
                            px: '20px',
                        }}>
                        <Box>ownerId: {data.ownerId}</Box>

                        <InputForm title={'nazwa:'} value={name} setValue={e => setName(e)} />

                        {data.description && <>
                            <InputForm title={'opis krótki'} value={descriptionShort} setValue={e => setDescriptionShort(e)} />
                            <InputForm title={'opis długi'} value={descriptionLong} setValue={e => setDescriptionLong(e)} />
                        </>}

                        <SwitchForm
                            title={'rekomendowane'} checked={recommended} setChecked={e => setRecommended(e)}

                        />


                        {/* <Box>
                                status: <span>{events.getRouteStatus(id as string)}</span>
                            </Box> */}

                        {/* <Flex>
                            <Box>
                                <Label htmlFor='name' sx={sx.label}>nazwa trasy:</Label>
                                {nameEdit && <Input value={name} name='name' id='name' onChange={e => setName(e.target.value)} sx={sx.input}></Input>}
                                {!nameEdit && <Box sx={sx.input}>{name}</Box>}
                            </Box>
                        <Button onClick={()=>setNameEdit(!nameEdit)}>Edytuj</Button> 
                        </Flex> */}

                        {/* <Label htmlFor='autor' sx={sx.label}>autor:</Label>
                        <Input value={data.author} name='author' id='author' onChange={() => { }} sx={sx.input}></Input> */}

                        <Box>czas: {data.time}</Box>
                        <Box>dystans: {data.distance}</Box>

                        {data.description && <>
                            <Box>opis krótki: {data.description.short}</Box>
                            <Box>opis długi: {data.description.long}</Box>
                        </>}

                        <Box>lokalizacja: {data.location}</Box>
                        <Box>rekomandowane: {data.recommended}</Box>
                        <Box>pobrania: {data.downloads}</Box>
                        <Box>lajki: {data.reactions.like}</Box>
                        {/* <Box>wow: {data.reactions.wow}</Box>
                    <Box>love: {data.reactions.love}</Box> */}
                        <Box>reaction: {data.reaction}</Box>
                        <Box>polecana: {data.isFeatured}</Box>
                        <Button type='button' onClick={heandleSaveData}>Zmień / zapisz</Button>
                    </Box>
                </>
            )
            }
            <Button>
                <span onClick={() => (data.isPublic ? api.unpublish(id) : api.publish(id))}>
                    {data.isPublic ? 'Zrób niepublicznym' : 'Upublicznij'}
                </span>
            </Button>
        </Flex >
    );
};

export default Page;

import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { AspectImage, Box, Button, Flex } from 'theme-ui';

import { getData, getDistance, getTime } from '../../../helpers/dataFormat';
import fetcher from '../../../helpers/fetcher';
import ApiContext from '../../../components/contexts/api';
import EventsContext from '../../../components/contexts/api/EventsContext';
import ManageContext from '../../../components/contexts/api/ManageContext';
import RouteNavigationContext from '../../../components/contexts/route/RouteNavigationContext';
import CheckboxList from '../../../components/forms/CheckboxList_';
import InputForm from '../../../components/forms/InputForm_';
import SwitchForm from '../../../components/forms/SwithForm_';
import TexareaForm from '../../../components/forms/TexareaForm_';
import NavButtons from './NavButtons_';

import type { Route } from '../../../components/typings/Route';
import DataField from '../../../components/forms/DataField_';
import Description from './Description_';
import BigAlert from '../../../components/contexts/modals/BigAlert_';
interface Props {
    routeId: string;
}

const Form: React.FC<Props> = (props) => {
    const { routeId: id } = props;
    const router = useRouter();
    const { config } = useContext(ApiContext);
    const events = useContext(EventsContext);
    const manage = useContext(ManageContext);
    const { data } = useSWR<Route, any>(id ? `/api/routes/route/${id}?${events.getRouteUpdates(id)}` : null, fetcher);
    const { backUrl } = useContext(RouteNavigationContext);

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
    const [freeze, setFreeze] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

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
                    setDescriptionShort(null);
                    setDescriptionLong(null);
                } else {
                    setDescriptionShort(data.description.short);
                    setDescriptionLong(data.description.long);
                    setNewDescription(null);
                }
            }

            setRecommended(!!data.recommended);
            setIsPublic(!!data.isPublic);

            setMap(data.images.filter((e) => e.type == 'map'));
            setImages(data.images.filter((e) => e.type == 'photo'));
        }
    }, [data]);

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
            body.description = newDescription;
        }
        manage.updateMetadata(id, body as any);
        setFreeze(!freeze);
        setShowAlert(!showAlert);
    };

    if (router.isFallback || !data) {
        return <h2>Loading...</h2>;
    }

    return (
        <Flex
            sx={{
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <NavButtons />

            {data && (
                <Box
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
                            <Box>
                                <DataField title={'id trasy: '} value={id}></DataField>
                                <DataField title={'id właściciela: '} value={data.ownerId}></DataField>
                                <DataField title={'autor: '} value={data.author}></DataField>
                                <DataField title={'utworzona: '} value={getData(data.createdAt)}></DataField>
                                <DataField title={'dystans: '} value={getDistance(data.distance)}></DataField>
                                <DataField title={'czas: '} value={getTime(data.time)}></DataField>
                                <DataField title={'pobrania: '} value={data.downloads}></DataField>
                                <DataField title={'lajki: '} value={data.reactions.like}></DataField>
                                {/* <DataField title={'wow: '} value={data.reactions.wow}></DataField> */}
                                {/* <DataField title={'love: '} value={data.reactions.love}></DataField> */}
                                <DataField title={'reakcje: '} value={data.reaction}></DataField>
                                <DataField title={'polecana: '} value={data.isFeatured}></DataField>
                            </Box>
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

                    <InputForm title={'nazwa:'} value={name} setValue={(e) => setName(e)} freeze={freeze} />
                    <InputForm title={'lokalizacja:'} value={location} setValue={(e) => setLocation(e)} freeze={freeze} />

                    {descriptionShort && descriptionLong && (
                        <Description
                            descriptionShort={descriptionShort}
                            setDescriptionShort={setDescriptionShort}
                            descriptionLong={descriptionLong}
                            setDescriptionLong={setDescriptionLong}
                            setNewDescription={setNewDescription}
                            freeze={freeze}
                        />
                    )}
                    <TexareaForm title={'opis'} value={newDescription} setValue={setNewDescription} highlight={true} freeze={freeze} />

                    <SwitchForm title={'rekomendowane'} checked={recommended} setChecked={(e) => setRecommended(e)} />
                    <SwitchForm title={'publiczna'} checked={isPublic} setChecked={(e) => setIsPublic(e)} />

                    <CheckboxList
                        title={'trudność:'}
                        listOptions={config.difficulties}
                        values={difficulty}
                        setValues={(e) => setDifficulty(e)}
                    />

                    <CheckboxList
                        title={'nawierzchnia:'}
                        listOptions={config.surfaces}
                        values={surface}
                        setValues={(e) => setSurface(e)}
                    />

                    <CheckboxList
                        title={'tagi:'}
                        listOptions={config.tags}
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
                        <NextLink href={backUrl} passHref>
                            <Button variant="white" className="sys-btn" backgroundColor="gray">
                                Wróć do listy
                            </Button>
                        </NextLink>

                        <Button type="button" sx={{ marginLeft: 1 }} className="sys-btn" onClick={handleSaveData}>
                            Zmień / Zapisz
                        </Button>
                    </Flex>
                </Box>
            )}

            {showAlert && <BigAlert
                text={'Z A P I S A N O'}
                show={showAlert}
            />}
        </Flex>
    );
};

export default Form;

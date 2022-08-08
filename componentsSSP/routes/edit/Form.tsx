import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Box, Button, Container, Typography } from '@mui/material/';

import { getData, getDistance, getTime } from '../../../helpers/dataFormat';
import fetcher from '../../../helpers/fetcher';
import ApiContext from '../../../components/contexts/api';
import EventsContext from '../../../components/contexts/api/EventsContext';
import ManageContext from '../../../components/contexts/api/ManageContext';
import RouteNavigationContext from '../../../components/contexts/route/RouteNavigationContext';
import CheckboxList from '../../../components/forms/CheckboxList';
import InputForm from '../../../components/forms/InputForm';
import SwitchForm from '../../../components/forms/SwithForm';
import TextareaForm from '../../../components/forms/TextareaForm';
import NavButtons from './NavButtons';

import type { Route } from '../../../components/typings/Route';
import DataField from '../../../components/forms/DataField';
import Description from './Description';
import BigAlert from '../../../components/contexts/modals/BigAlert';
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
        if (data.isPublic !== isPublic) {
            isPublic ? manage.publish(id) : manage.unpublish(id);
        }
        setFreeze(!freeze);
        setShowAlert(!showAlert);
    };

    if (router.isFallback || !data) {
        return <h2>Loading...</h2>;
    }

    return (
        <Container
            sx={{
                display: 'flex',
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
                    <InputForm title={'Nazwa:'} value={name} setValue={(e) => setName(e)} freeze={freeze} />
                    <InputForm
                        title={'Lokalizacja:'}
                        value={location}
                        setValue={(e) => setLocation(e)}
                        freeze={freeze}
                    />
                    <Container
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: ['column', 'column', 'row'],
                        }}
                    >
                        <Box>
                            <Typography sx={{ color: 'black', fontWeight: 400, fontSize: '24px' }}>Dane:</Typography>
                            <Box>
                                <DataField title={'ID trasy: '} value={id}></DataField>
                                <DataField title={'ID właściciela: '} value={data.ownerId}></DataField>
                                <DataField title={'Autor: '} value={data.author}></DataField>
                                <DataField title={'Utworzona: '} value={getData(data.createdAt)}></DataField>
                                <DataField title={'Dystans: '} value={getDistance(data.distance)}></DataField>
                                <DataField title={'Czas: '} value={getTime(data.time)}></DataField>
                                <DataField title={'Pobrania: '} value={data.downloads}></DataField>
                                <DataField title={'Lajki: '} value={data.reactions.like}></DataField>
                                <DataField title={'Reakcje: '} value={data.reaction}></DataField>
                                <DataField title={'Polecana: '} value={data.isFeatured}></DataField>
                            </Box>
                        </Box>
                        {map && map.length > 0 && (
                            <Box sx={{ width: ['100%', '80%', '45%', '35%'], maxWidth: '300px', mb: '15px' }}>
                                <Box
                                    component="img"
                                    sx={{
                                        width: '300px',
                                    }}
                                    src={map[0].variants.square[1].url}
                                ></Box>
                            </Box>
                        )}
                    </Container>

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
                    <TextareaForm
                        title={'Opis:'}
                        value={newDescription}
                        setValue={setNewDescription}
                        highlight={true}
                        freeze={freeze}
                    />

                    <SwitchForm title={'Rekomendowane'} checked={recommended} setChecked={(e) => setRecommended(e)} />
                    <SwitchForm title={'Publiczna'} checked={isPublic} setChecked={(e) => setIsPublic(e)} />

                    <CheckboxList
                        title={'Trudność:'}
                        listOptions={config.difficulties}
                        values={difficulty}
                        setValues={(e) => setDifficulty(e)}
                    />

                    <CheckboxList
                        title={'Nawierzchnia:'}
                        listOptions={config.surfaces}
                        values={surface}
                        setValues={(e) => setSurface(e)}
                    />

                    <CheckboxList
                        title={'Tagi:'}
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
                        <Container
                            sx={{
                                display: 'flex',
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
                                    <Box
                                        component="img"
                                        sx={{ width: '100%', height: '100%' }}
                                        src={e.variants.square[1].url}
                                    ></Box>
                                </Box>
                            ))}
                        </Container>
                    )}

                    <Container
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            mt: '16px',
                        }}
                    >
                        <NextLink href={backUrl} passHref>
                            <Button sx={{ color: 'white', backgroundColor: 'gray' }} variant="contained">
                                Wróć do listy
                            </Button>
                        </NextLink>

                        <Button
                            type="button"
                            sx={{ marginLeft: 1 }}
                            onClick={handleSaveData}
                            variant="contained"
                            color="success"
                        >
                            Zmień / Zapisz
                        </Button>
                    </Container>
                </Box>
            )}

            <Box sx={{ mt: '20px' }}>
                <NavButtons />
            </Box>

            {showAlert && <BigAlert text={'Z A P I S A N O'} show={showAlert} />}
        </Container>
    );
};

export default Form;

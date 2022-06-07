import React, { useContext, useEffect, useState } from 'react';
import { Container, Heading, Grid, Label, Button } from 'theme-ui';
import { NotificationsContext } from '../../components/notifications/NotificationsApi';
import NotificationsGroupForm from '../../components/notifications/NotificationsGroupForm';
import NotificationsForm from '../../components/notifications/NotificationsForm';
import NotificationsGroupRow from '../../components/notifications/NotificationsGroupRow';
import { getAvailableLanguages, typeOptions } from '../../components/notifications/NotificationsUtils';
import { parseISO } from 'date-fns';

const NotificationsEdit: React.FC<{ handleNotificationGroup; editNotificationGroup; editValues; handleExit }> = ({
    handleNotificationGroup,
    editNotificationGroup,
    editValues,
    handleExit,
}) => {
    const { availableLanguages } = useContext(NotificationsContext);
    const [modalShow, setModalShow] = useState(false);
    const [formShow, setFormShow] = useState(false);
    const [preloadedValues, setPreloadedValues] = useState(null);
    const [preloadedGroupValues, setPreloadedGroupValues] = useState(editValues);
    const [notifications, setNotifications] = useState([]);
    const [displayEmpty, setDisplayEmpty] = useState(false);

    const langOptions = getAvailableLanguages([...availableLanguages]);

    useEffect(() => {
        if (editValues === null) {
            setFormShow(true);
        } else {
            const editedGroup = {
                id: editValues.id,
                fallbackLanguage: displayLanguageLabel(editValues),
                showDate: new Date(parseISO(editValues.showDate)),
                expDate: new Date(parseISO(editValues.expirationDate)),
                type: displayTypeLabel(editValues),
                draft: editValues.draft,
            };
            setNotifications(editValues.notifications);
            setPreloadedGroupValues(editedGroup);
            setFormShow(true);
        }
    }, [editValues]);

    useEffect(() => {
        notifications.length > 0 ? setDisplayEmpty(false) : setDisplayEmpty(true);
    }, [notifications]);

    const newNotificationHandler = (data) => {
        setModalShow(!modalShow);
        const newNotification = {
            id: Date.now(),
            language: data.language.value,
            data: { title: data.title, text: data.message },
        };
        setNotifications([...notifications, newNotification]);
    };

    const handleOpen = () => {
        setPreloadedValues('');
        setModalShow(!modalShow);
    };
    const handleEdit = (idProperty) => {
        const object = findId(idProperty);
        console.log(object);

        const newPreloadedValue = {
            id: object.id,
            language: displayLanguageLabel(object),
            title: object.data.title,
            message: object.data.text,
        };
        setPreloadedValues(newPreloadedValue);
        setModalShow(!modalShow);
    };

    const changeNotification = (editedNotification, preId) => {
        const edited = {
            id: preId,
            language: editedNotification.language.value,
            languageLabel: editedNotification.language.label,
            data: { title: editedNotification.title, text: editedNotification.message },
        };

        const editedArr = notifications.map((el) => {
            if (el.id === preId) {
                return edited;
            }
            return el;
        });

        setNotifications(editedArr);
        setModalShow(!modalShow);
    };

    const handleDelete = (idProperty) => setNotifications(filterId(idProperty));

    const findId = (idElement) => notifications.find((x) => x.id === idElement);

    const filterId = (idElement) => notifications.filter((el) => el.id !== idElement);

    const displayLanguageLabel = (property) =>
        langOptions.find((lang) => lang.value === property.fallbackLanguage || property.language);

    const displayTypeLabel = (property) => typeOptions.find((type) => type.value === property.type);

    return (
        <Container>
            <Container p="30px" marginX="auto" sx={{ maxWidth: '1200px' }}>
                <Heading
                    m="20px"
                    sx={{
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    Wersje językowe powiadomienia
                </Heading>
                <Container>
                    <Grid gap={2} columns="50px 190px 2fr" marginBottom="10px" sx={{ fontSize: '1.25em' }}>
                        <Label>Język</Label>
                        <Label>Tytuł</Label>
                        <Label>Treść</Label>
                    </Grid>
                    {displayEmpty ? (
                        <Container sx={{ textAlign: 'center', fontSize: '1.5em', color: '#555' }}>
                            Brak powiadomień
                        </Container>
                    ) : (
                        <Container>
                            {notifications.map((notification) => {
                                return (
                                    <NotificationsGroupRow
                                        id={notification.id}
                                        key={notification.id}
                                        language={notification.language}
                                        title={notification.data.title}
                                        text={notification.data.text}
                                        editHandler={handleEdit}
                                        deleteHandler={handleDelete}
                                    />
                                );
                            })}
                        </Container>
                    )}
                </Container>
                <Container
                    sx={{
                        maxWidth: '1200px',
                        marginTop: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button onClick={handleOpen} sx={{ textAlign: 'center', fontSize: '1.3em', cursor: 'pointer' }}>
                        Dodaj język
                    </Button>
                </Container>
                {modalShow && (
                    <NotificationsForm
                        show={modalShow}
                        handleOpen={handleOpen}
                        langOptions={langOptions}
                        typeOptions={typeOptions}
                        newNotificationHandler={newNotificationHandler}
                        preloadedValues={preloadedValues}
                        changeNotification={changeNotification}
                    />
                )}
                {formShow && (
                    <NotificationsGroupForm
                        notifications={notifications}
                        langOptions={langOptions}
                        typeOptions={typeOptions}
                        availableLanguages={availableLanguages}
                        preloadedGroupValues={preloadedGroupValues}
                        handleNotificationGroup={handleNotificationGroup}
                        editNotificationGroup={editNotificationGroup}
                        handleExit={handleExit}
                    />
                )}
            </Container>
        </Container>
    );
};

export default NotificationsEdit;

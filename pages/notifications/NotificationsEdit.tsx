import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material/';
import { NotificationsContext } from '../../components/notifications/NotificationsApi';
import NotificationsGroupForm from '../../components/notifications/NotificationsGroupForm';
import NotificationsForm from '../../components/notifications/NotificationsForm';
import NotificationsGroupRow from '../../components/notifications/NotificationsGroupRow';
import {
    getAvailableLanguages,
    typeOptions,
    langOffline,
    editedObject,
    displayLanguageLabel,
} from '../../components/notifications/NotificationsUtils';

import { LabelTypes } from '../../components/typings/Notifications';

interface IProps {
    handleNotificationGroup: (object: object) => void;
    editNotificationGroup: (object: object, id: number) => void;
    editValues: any;
    handleExit: () => void;
}

const NotificationsEdit: React.FC<IProps> = ({
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

    const langOptions: LabelTypes[] = getAvailableLanguages([...availableLanguages]);

    useEffect(() => {
        if (editValues === null) {
            setFormShow(true);
        } else {
            let undefinedDate = false;
            if (editValues.expirationDate === null) {
                undefinedDate = true;
            }

            const editedGroup = editedObject(editValues, langOptions, typeOptions, undefinedDate);
            setNotifications(editValues.notifications);
            setPreloadedGroupValues(editedGroup);
            setFormShow(true);
        }
    }, [editValues]);

    useEffect(() => {
        notifications?.length > 0 ? setDisplayEmpty(false) : setDisplayEmpty(true);
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

    const handleOpen = (): void => {
        setPreloadedValues('');
        setModalShow(!modalShow);
    };
    const handleEdit = (idProperty: number) => {
        const object = findId(idProperty);
        const newPreloadedValue = {
            id: object.id,
            language: displayLanguageLabel(langOptions, object),
            title: object.data.title,
            message: object.data.text,
        };
        setPreloadedValues(newPreloadedValue);
        setModalShow(!modalShow);
    };

    const changeNotification = (editedNotification, preId: number) => {
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

    const handleDelete = (idProperty: number) => setNotifications(filterId(idProperty));

    const findId = (idElement: number) => notifications.find((x) => x.id === idElement);

    const filterId = (idElement: number) => notifications.filter((el) => el.id !== idElement);

    return (
        <Container>
            <Container sx={{ maxWidth: '1200px', p: '30px', marginX: 'auto' }}>
                <Typography
                    variant="h2"
                    sx={{
                        m: '20px',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    Wersje językowe powiadomienia
                </Typography>
                <Container>
                    <Container
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 2fr 3fr 1fr',
                            mb: '10px',
                            fontSize: '1.25em',
                            gap: 2,
                        }}
                    >
                        <Typography variant="h5">Język</Typography>
                        <Typography variant="h5">Tytuł</Typography>
                        <Typography variant="h5">Treść</Typography>
                    </Container>
                    {displayEmpty ? (
                        <Box sx={{ textAlign: 'center', fontSize: '1.5em', color: '#555', fontWeight: 300, p: 2 }}>
                            Brak powiadomień
                        </Box>
                    ) : (
                        <Box>
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
                        </Box>
                    )}
                </Container>
                <Box
                    sx={{
                        maxWidth: '1200px',
                        marginTop: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button onClick={handleOpen} variant="contained">
                        Dodaj język
                    </Button>
                </Box>
                {modalShow && (
                    <NotificationsForm
                        handleOpen={handleOpen}
                        langOptions={langOptions}
                        newNotificationHandler={newNotificationHandler}
                        preloadedValues={preloadedValues}
                        changeNotification={changeNotification}
                    />
                )}
                <Box sx={{ ml: '48px' }}>
                    {formShow && (
                        <NotificationsGroupForm
                            notifications={notifications}
                            langOptions={langOptions}
                            typeOptions={typeOptions}
                            preloadedGroupValues={preloadedGroupValues}
                            handleNotificationGroup={handleNotificationGroup}
                            editNotificationGroup={editNotificationGroup}
                            handleExit={handleExit}
                        />
                    )}
                </Box>
            </Container>
        </Container>
    );
};

export default NotificationsEdit;

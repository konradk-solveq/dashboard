import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material/';
import NotificationsGroupForm from '../../components/notifications/NotificationsGroupForm';
import NotificationsForm from '../../components/notifications/NotificationsForm';
import NotificationsGroupRow from '../../components/notifications/NotificationsGroupRow';
import {
    getAvailableLanguages,
    typeOptions,
    langOffline,
    parseNotification,
    displayLanguageLabel,
} from '../../components/notifications/NotificationsUtils';

import { NotificationsContext } from '../../components/contexts/notifications';
import { ContentType, FormValues, GroupFormValues } from '../../components/typings/Notifications';
import useAppConfig from '../../components/services/useConfig';

const EditNotification: React.FC = () => {
    const { editValues } = useContext(NotificationsContext);

    const [modalShow, setModalShow] = useState<boolean>(false);
    const [formShow, setFormShow] = useState<boolean>(false);
    const [notificationTranslation, setNotificationTranslation] = useState<FormValues>(null);
    const [notificationAggregate, setNotificationAggregate] = useState<GroupFormValues>();
    const [notifications, setNotifications] = useState<ContentType[]>([]);
    const [displayEmpty, setDisplayEmpty] = useState<boolean>(false);

    const {
        data: { langs },
    } = useAppConfig();

    const langOptions = getAvailableLanguages(langs);

    useEffect(() => {
        if (editValues === null) {
            setFormShow(true);
        } else {
            let undefinedDate = false;
            if (editValues.expirationDate === null) {
                undefinedDate = true;
            }

            const editedGroup = parseNotification(editValues, langOptions, typeOptions, undefinedDate);
            setNotifications(editValues.contents);
            setNotificationAggregate(editedGroup);
            setFormShow(true);
        }
    }, [editValues]);

    useEffect(() => {
        notifications?.length > 0 ? setDisplayEmpty(false) : setDisplayEmpty(true);
    }, [notifications]);

    const newNotificationTranslation = (data: FormValues) => {
        setModalShow(!modalShow);
        const newNotification = {
            id: Date.now(),
            language: data.language.value,
            data: { title: data.title, text: data.message },
        };
        setNotifications([...notifications, newNotification]);
    };

    const handleOpen = (): void => {
        setNotificationTranslation(null);
        setModalShow(!modalShow);
    };
    const handleEdit = (id: number) => {
        const notificationData = findId(id);
        const newTranslation = {
            id: notificationData.id,
            language: displayLanguageLabel(langOptions, notificationData),
            title: notificationData.data.title,
            message: notificationData.data.text,
        };
        setNotificationTranslation(newTranslation);
        setModalShow(!modalShow);
    };

    const changeNotificationTranslation = (editedNotification: FormValues, preId: number) => {
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

    const handleDelete = (id: number) => setNotifications(filterId(id));

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
                                        notification={notification}
                                        key={notification.id}
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
                        newNotificationTranslation={newNotificationTranslation}
                        notificationTranslation={notificationTranslation}
                        changeNotificationTranslation={changeNotificationTranslation}
                    />
                )}
                <Box sx={{ ml: '48px' }}>
                    {formShow && (
                        <NotificationsGroupForm
                            notifications={notifications}
                            langOptions={langOptions}
                            typeOptions={typeOptions}
                            notificationAggregate={notificationAggregate}
                        />
                    )}
                </Box>
            </Container>
        </Container>
    );
};

export default EditNotification;

import React, { useEffect, useState, useContext } from 'react';
import { NextPage } from 'next';
import { Container, Typography, Button, Alert, Divider } from '@mui/material/';
import NotificationsEditPage from '../notifications/NotificationsEdit';
import NotificationsContainer from '../../components/notifications/NotificationsApi';
import NotificationsRow from '../../components/notifications/NotificationsRow';
import { NotificationsContext } from '../../components/notifications/NotificationsApi';
import { getNotifications } from '../../components/notifications/NotificationsUtils';
import NotificationsSortBar from '../../components/notifications/NotificationsSortBar';
import NotificationsPagination from '../../components/notifications/NotificationsPagination';

const NotificationMenager: React.FC<{}> = ({}) => {
    const { notifications, postNotifications, deleteNotifications, retrieveNotifications, editNotifications } =
        useContext(NotificationsContext);
    const [addFormShow, setAddFormShow] = useState(false);
    const [preloadedNotifications, setPreloadedNotifications] = useState([]);
    const [editValues, setEditValues] = useState(null);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [deleteId, setDeleteId] = useState();

    useEffect(() => {
        notifications && setPreloadedNotifications(getNotifications(notifications));
    }, [notifications]);

    function editHandler(idProperty) {
        const object = preloadedNotifications.find((x) => x.id === idProperty);
        setEditValues(object);
        setAddFormShow(!addFormShow);
    }

    function deleteHandler(idProperty) {
        const object = preloadedNotifications.find((x) => x.id === idProperty);
        setDeleteId(object.id);
        setDeletePopUp(!deletePopUp);
    }

    const handleClick = (e) => {
        e.preventDefault();
        setEditValues(null);
        setAddFormShow(!addFormShow);
    };

    const handleExit = () => {
        setEditValues(null);
        setAddFormShow(!addFormShow);
    };

    const handleNotificationGroup = (notificationGroup) => {
        postNotifications(notificationGroup);
        setAddFormShow(!addFormShow);
        retrieveNotifications();
    };

    const editNotificationGroup = (notificationGroup, idProperty) => {
        editNotifications(notificationGroup, idProperty);
        setAddFormShow(!addFormShow);
        retrieveNotifications();
    };

    const confirmDelete = () => {
        deleteNotifications(deleteId);
        setDeletePopUp(!deletePopUp);
        retrieveNotifications();
    };

    return (
        <Container>
            <Container sx={{ maxWidth: '1200px', p: '30px', marginX: 'auto' }}>
                {addFormShow ? (
                    <NotificationsEditPage
                        handleNotificationGroup={handleNotificationGroup}
                        editNotificationGroup={editNotificationGroup}
                        editValues={editValues}
                        handleExit={handleExit}
                    />
                ) : (
                    <>
                        {deletePopUp && (
                            <Alert sx={{ backgroundColor: '#555' }}>
                                Czy na pewno chcesz usunąć grupę powiadomień?
                                <Button
                                    sx={{ cursor: 'pointer', width: '120px', ml: 'auto', mr: '30px' }}
                                    onClick={confirmDelete}
                                >
                                    Tak
                                </Button>
                                <Button
                                    sx={{ cursor: 'pointer', backgroundColor: 'green', width: '120px' }}
                                    onClick={() => setDeletePopUp(!deletePopUp)}
                                >
                                    Nie
                                </Button>
                            </Alert>
                        )}

                        <Typography
                            variant="h2"
                            sx={{
                                m: '20px',
                                textAlign: 'center',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            Powiadomienia
                            <Button
                                onClick={handleClick}
                                sx={{ textAlign: 'center', fontSize: '0.75em', cursor: 'pointer' }}
                            >
                                Dodaj Powiadomienie
                            </Button>
                        </Typography>

                        <NotificationsSortBar />

                        <Typography sx={{ m: '20px' }}>Lista Powiadomień</Typography>

                        {preloadedNotifications?.length > 0 ? (
                            <Container sx={{ minHeight: '300px' }}>
                                {preloadedNotifications.map((notification) => {
                                    return (
                                        <NotificationsRow
                                            id={notification.id}
                                            key={notification.id}
                                            title={notification.groupTitle}
                                            deleteHandler={deleteHandler}
                                            editHandler={editHandler}
                                        />
                                    );
                                })}
                            </Container>
                        ) : (
                            <Container
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontSize: '2em',
                                    color: '#555',
                                    minHeight: '300px',
                                }}
                            >
                                Brak powiadomień
                            </Container>
                        )}

                        <NotificationsPagination />
                    </>
                )}
            </Container>
        </Container>
    );
};

const NotificationsPage: NextPage<{}> = ({}) => {
    return (
        <>
            <NotificationsContainer>
                <NotificationMenager />
            </NotificationsContainer>
        </>
    );
};

export default NotificationsPage;

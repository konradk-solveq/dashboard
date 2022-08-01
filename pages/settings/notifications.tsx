import React, { useEffect, useState, useContext } from 'react';
import { NextPage } from 'next';
import { Container, Typography, Button, Alert, Box, CircularProgress } from '@mui/material/';
import NotificationsEditPage from '../notifications/NotificationsEdit';
import NotificationsContainer from '../../components/notifications/NotificationsApi';
import NotificationsRow from '../../components/notifications/NotificationsRow';
import { NotificationsContext } from '../../components/notifications/NotificationsApi';
import { getNotifications } from '../../components/notifications/NotificationsUtils';
import NotificationsSortBar from '../../components/notifications/NotificationsSortBar';
import NotificationsPagination from '../../components/notifications/NotificationsPagination';
import BigListItem from '../../assets/BigListItem';

const NotificationMenager: React.FC<{}> = ({}) => {
    const {
        notifications,
        postNotifications,
        deleteNotifications,
        retrieveNotifications,
        editNotifications,
        sortParams,
        loading,
    } = useContext(NotificationsContext);
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
        postNotifications(notificationGroup).then((res) => {
            retrieveNotifications(sortParams.sortOrder, sortParams.sortTypeOrder, sortParams.type);
        });
        setAddFormShow(!addFormShow);
    };

    const editNotificationGroup = (notificationGroup, idProperty) => {
        editNotifications(notificationGroup, idProperty).then((res) => {
            retrieveNotifications(sortParams.sortOrder, sortParams.sortTypeOrder, sortParams.type);
        });
        setAddFormShow(!addFormShow);
    };

    const confirmDelete = () => {
        deleteNotifications(deleteId).then((res) => {
            retrieveNotifications(sortParams.sortOrder, sortParams.sortTypeOrder, sortParams.type);
        });

        setDeletePopUp(!deletePopUp);
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
                            <Alert
                                severity="error"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                action={
                                    <Box>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            sx={{ width: '120px', ml: 'auto', mr: '30px' }}
                                            onClick={confirmDelete}
                                        >
                                            Tak
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            sx={{ width: '120px' }}
                                            onClick={() => setDeletePopUp(!deletePopUp)}
                                        >
                                            Nie
                                        </Button>
                                    </Box>
                                }
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography variant="h5" style={{ fontWeight: 300 }}>
                                        Czy na pewno chcesz usunąć grupę powiadomień?
                                    </Typography>
                                </Box>
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
                            <Button variant="contained" onClick={handleClick}>
                                Dodaj Powiadomienie
                            </Button>
                        </Typography>

                        <NotificationsSortBar sortParams={sortParams} />

                        <Typography sx={{ m: '20px' }}>Lista Powiadomień</Typography>

                        {loading ? (
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
                                <CircularProgress />
                            </Container>
                        ) : preloadedNotifications?.length > 0 ? (
                            <Box sx={{ minHeight: '300px' }}>
                                {preloadedNotifications.map((notification) => {
                                    return (
                                        <BigListItem hover={true}>
                                            <NotificationsRow
                                                id={notification.id}
                                                key={notification.id}
                                                title={notification.groupTitle}
                                                deleteHandler={deleteHandler}
                                                editHandler={editHandler}
                                            />
                                        </BigListItem>
                                    );
                                })}
                            </Box>
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

                        <NotificationsPagination sortParams={sortParams} />
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

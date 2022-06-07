import React, { useEffect, useState, useContext } from 'react';
import { NextPage } from 'next';
import { Container, Heading, Button, Alert } from 'theme-ui';
import NotificationsEditPage from '../notifications/NotificationsEdit';
import NotificationsContainer from '../../components/notifications/NotificationsApi';
import NotificationsRow from '../../components/notifications/NotificationsRow';
import { NotificationsContext } from '../../components/notifications/NotificationsApi';
import { getNotifications } from '../../components/notifications/NotificationsUtils';

const NotificationMenager: React.FC<{}> = ({}) => {
    const { notifications } = useContext(NotificationsContext);
    const [addFormShow, setAddFormShow] = useState(false);
    const [preloadedNotifications, setPreloadedNotifications] = useState({});
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
        console.log('Nowe grupa powiadomień dodana');
        console.log('Dane grupy powiadomień', notificationGroup);
        setAddFormShow(!addFormShow);
    };

    const editNotificationGroup = (notificationGroup, idProperty) => {
        console.log('Zmiany zostały zapisane dla grupy powiadomień o ID', idProperty);
        console.log('Dane grupy powiadomień', notificationGroup);
        setAddFormShow(!addFormShow);
    };

    const confirmDelete = () => {
        console.log('Grupa powiadomień o ID zostanie usunięte, ID:', deleteId);
        setDeletePopUp(!deletePopUp);
    };

    return (
        <Container>
            <Container p="30px" marginX="auto" sx={{ maxWidth: '1200px' }}>
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

                        <Heading
                            m="20px"
                            sx={{
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
                        </Heading>

                        {preloadedNotifications?.length > 0 ? (
                            <Container>
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
                            <Container sx={{ textAlign: 'center', fontSize: '2em', color: '#555' }}>
                                Brak powiadomień
                            </Container>
                        )}
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

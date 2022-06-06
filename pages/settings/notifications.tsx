import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Container, Heading, Button, Alert } from 'theme-ui';
import NotificationsEditPage from '../notifications/NotificationsEdit';
import NotificationsContainer from '../../components/notifications/NotificationsApi';
import NotificationsRow from '../../components/notifications/NotificationsRow';

const NotificationMenager: React.FC<{}> = ({}) => {
    const [addFormShow, setAddFormShow] = useState(false);
    const [notificationsList, setNotificationsList] = useState([]);
    const [editValues, setEditValues] = useState(null);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [displayEmpty, setDisplayEmpty] = useState(false);

    const handlePostNotifications = () => {
        notificationsList.length > 0
            ? console.log('send notifications to BE', notificationsList)
            : setDisplayEmpty(!displayEmpty);
    };

    useEffect(() => {
        handlePostNotifications();
    }, [notificationsList]);

    const handleNotificationGroup = (data, notifications) => {
        const notificationGroupId = Date.now();
        const groupTitle = notifications.find((el) => el.language === data.fallbackLanguage.value);
        setAddFormShow(!addFormShow);

        const newNotificationgroup = {
            key: notificationGroupId,
            id: notificationGroupId,
            fallbackLanguage: { value: data.fallbackLanguage.value, label: data.fallbackLanguage.label },
            type: { value: data.type.value, label: data.type.label },
            expDate: data.expDate,
            showDate: data.showDate,
            notifications: notifications,
            groupTitle: groupTitle.title,
            draft: data.draft,
        };
        setNotificationsList([...notificationsList, newNotificationgroup]);
    };

    function editHandler(idProperty) {
        const object = notificationsList.find((x) => x.id === idProperty);
        setEditValues(object);
        setAddFormShow(!addFormShow);
    }

    const editNotificationGroup = (data, idProperty, notifications) => {
        setAddFormShow(!addFormShow);
        const groupTitle = notifications.find((el) => el.language === data.fallbackLanguage.value);
        const edited = {
            key: idProperty,
            id: idProperty,
            fallbackLanguage: { value: data.fallbackLanguage.value, label: data.fallbackLanguage.label },
            type: { value: data.type.value, label: data.type.label },
            expDate: data.expDate,
            showDate: data.showDate,
            notifications: notifications,
            groupTitle: groupTitle.title,
            draft: data.draft,
        };

        const editedArr = notificationsList.map((el) => {
            if (el.id === idProperty) {
                return edited;
            }
            return el;
        });
        setNotificationsList(editedArr);
    };
    function deleteHandler(idProperty) {
        const object = notificationsList.find((x) => x.id === idProperty);
        setDeleteId(object.id);
        setDeletePopUp(!deletePopUp);
    }

    const confirmDelete = () => {
        const removedItemArr = notificationsList.filter((el) => el.id !== deleteId);
        setNotificationsList(removedItemArr);
        setDeletePopUp(!deletePopUp);
    };

    const handleClick = (e) => {
        e.preventDefault();
        setEditValues(null);
        setAddFormShow(!addFormShow);
    };

    const handleExit = () => {
        setEditValues(null);
        setAddFormShow(!addFormShow);
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

                        {notificationsList.length > 0 ? (
                            <Container>
                                {notificationsList.map((notification) => {
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

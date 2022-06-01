import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Container, Heading, Button } from 'theme-ui';
import NotificationsEditPage from '../notifications/NotificationsEdit';
import NotificationsContainer from '../../components/notifications/NotificationsApi';
import NotificationsRow from '../../components/notifications/NotificationsRow';

interface IProps {
    handleNotificationGroup: () => void;
    editNotificationGroup: () => void;
}

const NotificationMenager: React.FC<IProps> = ({}) => {
    const [addFormShow, setAddFormShow] = useState(false);
    const [notificationsList, setNotificationsList] = useState([]);
    const [editValues, setEditValues] = useState(null);

    const handleNotificationGroup = (data, notifications) => {
        const notificationGroupId = Date.now();
        const groupTitle = notifications.find((el) => el.language === data.fallbackLanguage.value);

        const newNotificationgroup = {
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
        setAddFormShow(!addFormShow);
    };

    function editHandler(idProperty) {
        const object = notificationsList.find((x) => x.id === idProperty);
        setEditValues(object);
        setAddFormShow(!addFormShow);
    }

    const editNotificationGroup = () => {
        console.log('edit');
    };
    function deleteHandler(idProperty) {
        console.log('delete');
    }
    const handleClick = (e) => {
        e.preventDefault();
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
                    />
                ) : (
                    <>
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
                    </>
                )}
            </Container>
        </Container>
    );
};

const NotificationsPage: NextPage<IProps> = ({}) => {
    return (
        <>
            <NotificationsContainer>
                <NotificationMenager />
            </NotificationsContainer>
        </>
    );
};

export default NotificationsPage;

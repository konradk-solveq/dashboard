import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Container, Heading, Grid, Label, Button } from 'theme-ui';
import NotificationsContainer, { NotificationsContext } from '../../components/notifications/NotificationsApi';
import NotificationsGroupForm from '../../components/notifications/NotificationsGroupForm';
import NotificationsForm from '../../components/notifications/NotificationsForm';
import { number } from 'prop-types';
import NotificationsGroupRow from '../../components/notifications/NotificationsGroupRow';

interface IProps {
    notification: string;
    newNotificationHandler: () => void;
    id: string;
    language: string;
    languageLabel: string;
    title: string;
    message: string;
}

const NotificationsEdit: React.FC<IProps> = (props: IProps) => {
    const { availableLanguages } = useContext(NotificationsContext);

    const [modalShow, setModalShow] = useState(false);

    const [preloadedValues, setPreloadedValues] = useState({
        id: '',
        language: '',
        languageLabel: '',
        title: '',
        message: '',
    });

    const [notifications, setNotifications] = useState([]);

    const newNotificationHandler = (data) => {
        setModalShow(!modalShow);
        const newNotification = {
            id: Date.now(),
            language: data.language.value,
            languageLabel: data.language.label,
            title: data.title,
            text: data.message,
        };
        setNotifications([...notifications, newNotification]);
    };
    const closeHandler = () => handleOpen();

    const handleOpen = () => {
        setPreloadedValues('');
        setModalShow(!modalShow);
    };
    const handleEdit = (idProperty) => {
        const object = notifications.find((x) => x.id === idProperty);
        const newPreloadedValue = {
            id: object.id,
            language: { value: object.language, label: object.languageLabel },
            title: object.title,
            message: object.text,
        };
        setPreloadedValues(newPreloadedValue);
        setModalShow(!modalShow);
    };

    const changeNotification = (editedNotification, preId) => {
        const edited = {
            id: preId,
            language: editedNotification.language.value,
            languageLabel: editedNotification.language.label,
            title: editedNotification.title,
            text: editedNotification.message,
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

    const handleDelete = (idProperty) => {
        const removedItemArr = notifications.filter((el) => el.id !== idProperty);
        setNotifications(removedItemArr);
    };

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
                    {notifications.map((notification) => {
                        return (
                            <NotificationsGroupRow
                                id={notification.id}
                                key={notification.id}
                                language={notification.language}
                                title={notification.title}
                                text={notification.text}
                                editHandler={handleEdit}
                                deleteHandler={handleDelete}
                            />
                        );
                    })}
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
                        closeHandler={closeHandler}
                        availableLanguages={availableLanguages}
                        newNotificationHandler={newNotificationHandler}
                        preloadedValues={preloadedValues}
                        changeNotification={changeNotification}
                    />
                )}
                <NotificationsGroupForm availableLanguages={availableLanguages} />
            </Container>
        </Container>
    );
};

const NotificationsEditPage: NextPage<IProps> = (props) => {
    return (
        <>
            <NotificationsContainer>
                <NotificationsEdit />
            </NotificationsContainer>
        </>
    );
};

export default NotificationsEditPage;

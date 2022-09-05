import React, { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material/';
import EditNotification from '../notifications';
import NotificationsRow from '../../components/notifications/NotificationsRow';
import NotificationsSortBar from '../../components/notifications/NotificationsSortBar';
import NotificationsPagination from '../../components/notifications/NotificationsPagination';
import BigListItem from '../../assets/BigListItem';
import { LabelTypes, Notification } from '../../components/typings/Notifications';
import NotificationsContainer, { NotificationsContext } from '../../components/contexts/notifications';
import ConfirmDeleteModal from '../../components/notifications/ConfirmDeleteModal';
import { getAvailableLanguages, sortOptions } from '../../components/notifications/NotificationsUtils';
import useAppConfig from '../../components/services/useConfig';
import SortBar from '../../components/bar/SortBar';

const NotificationManager: React.FC<{}> = ({}) => {
    const {
        notificationsQuery,
        checkLoading,
        deleteNotificationMutation,
        handleAddNotificationClick,
        addNotificationFormState,
        sortParams,
        setSortParams,
    } = useContext(NotificationsContext);

    const { data } = useAppConfig();

    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number>(null);
    const [langOptions, setLangOptions] = useState<LabelTypes[]>(getAvailableLanguages(data?.langs));

    useEffect(() => {
        setLangOptions(getAvailableLanguages(data?.langs));
    }, [data]);

    let notifications = notificationsQuery?.data?.elements;

    function openDeleteModal(id: Notification['id']) {
        setDeleteId(id);
        setDeleteModal(!deleteModal);
    }

    const confirmDelete = () => {
        deleteNotificationMutation.mutate({ id: deleteId });
        setDeleteModal(!deleteModal);
    };

    const changeDeleteModalState = () => {
        setDeleteModal((prev) => !prev);
    };

    return (
        <Container>
            <Container sx={{ maxWidth: '1200px', p: '30px', marginX: 'auto' }}>
                {addNotificationFormState ? (
                    <EditNotification langOptions={langOptions} />
                ) : (
                    <>
                        {deleteModal && (
                            <ConfirmDeleteModal
                                confirmDelete={confirmDelete}
                                changeDeleteModalState={changeDeleteModalState}
                            />
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
                            <Button variant="contained" type="button" onClick={() => handleAddNotificationClick()}>
                                Dodaj Powiadomienie
                            </Button>
                        </Typography>

                        <SortBar params={sortParams} setParams={setSortParams} options={sortOptions} />

                        <Typography sx={{ m: '20px' }}>Lista Powiadomień</Typography>

                        {checkLoading ? (
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
                        ) : notifications.length > 0 ? (
                            <Box sx={{ minHeight: '300px' }}>
                                {notifications.map((notification) => (
                                    <BigListItem hover={true} key={notification.id}>
                                        <NotificationsRow
                                            notification={notification}
                                            key={notification.id}
                                            openDeleteModal={openDeleteModal}
                                        />
                                    </BigListItem>
                                ))}
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
                <NotificationManager />
            </NotificationsContainer>
        </>
    );
};

export default NotificationsPage;

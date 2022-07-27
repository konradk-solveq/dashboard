import React, { useContext } from 'react';
import { Button, Container, Divider } from '@mui/material/';
import { NotificationsContext } from './NotificationsApi';
import { sortParamsType } from '../typings/Notifications';

const NotificationsPagination: React.FC<{ sortParams: sortParamsType }> = ({ sortParams }) => {
    const { prevPageURL } = useContext(NotificationsContext);
    const { nextPageURL } = useContext(NotificationsContext);
    const { retrieveNotifications } = useContext(NotificationsContext);

    const handleNextPage = () =>
        retrieveNotifications(sortParams.sortOrder, sortParams.sortTypeOrder, sortParams.type, nextPageURL);
    const handlePrevPage = () =>
        retrieveNotifications(sortParams.sortOrder, sortParams.sortTypeOrder, sortParams.type, prevPageURL);

    return (
        <Container>
            <Divider />
            <Container sx={{ m: '10px 20px' }}>
                {prevPageURL && (
                    <Button variant="contained" sx={{ mr: '20px' }} onClick={handlePrevPage}>
                        Poprzednia
                    </Button>
                )}
                {nextPageURL && (
                    <Button variant="contained" onClick={handleNextPage}>
                        Następna
                    </Button>
                )}
            </Container>
            <Divider />
        </Container>
    );
};

export default NotificationsPagination;

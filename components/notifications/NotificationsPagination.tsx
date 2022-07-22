import React, { useContext } from 'react';
import { Button, Container, Divider } from '@mui/material/';
import { NotificationsContext } from './NotificationsApi';

const NotificationsPagination: React.FC<{}> = ({}) => {
    const { prevPageURL } = useContext(NotificationsContext);
    const { nextPageURL } = useContext(NotificationsContext);
    const { retrieveNotifications } = useContext(NotificationsContext);

    const handleNextPage = () => retrieveNotifications(nextPageURL);
    const handlePrevPage = () => retrieveNotifications(prevPageURL);

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

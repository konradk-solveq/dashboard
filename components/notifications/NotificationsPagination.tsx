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
            <Container sx={{ ml: '20px', mr: '20px' }}>
                {prevPageURL && (
                    <Button sx={{ cursor: 'pointer', mr: '20px' }} onClick={handlePrevPage}>
                        Poprzednia
                    </Button>
                )}
                {nextPageURL && (
                    <Button sx={{ cursor: 'pointer' }} onClick={handleNextPage}>
                        Następna
                    </Button>
                )}
            </Container>
            <Divider />
        </Container>
    );
};

export default NotificationsPagination;

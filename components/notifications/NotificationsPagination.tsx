import React, { useContext } from 'react';
import { Button, Container, Divider } from '@mui/material/';
import { NotificationsContext } from '../contexts/notifications';

const NotificationsPagination: React.FC = () => {
    const { setSortParams, notificationsQuery, sortParams } = useContext(NotificationsContext);

    const handlePrevPage = () => setSortParams((prev) => ({ ...prev, page: prev.page - 1 }));
    const handleNextPage = () => setSortParams((prev) => ({ ...prev, page: prev.page + 1 }));

    return (
        <Container>
            <Divider />
            <Container sx={{ m: '10px 20px' }}>
                {sortParams.page > 0 && notificationsQuery.data?.links?.prev && (
                    <Button variant="contained" sx={{ mr: '20px' }} onClick={handlePrevPage}>
                        Poprzednia
                    </Button>
                )}
                {!notificationsQuery.isPreviousData && notificationsQuery.data?.links?.next && (
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

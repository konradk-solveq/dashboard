import React, { useContext } from 'react';
import { Container, Pagination } from '@mui/material/';
import { NotificationsContext } from '../contexts/notifications';

const NotificationsPagination: React.FC = () => {
    const { setSortParams, notificationsQuery } = useContext(NotificationsContext);

    return (
        <Container sx={{ display: 'flex', width: '100%', justifyContent: 'center', margin: '20px' }}>
            <Pagination
                onChange={(e, value) => setSortParams((prev) => ({ ...prev, page: value }))}
                count={Math.ceil(notificationsQuery.data?.total / notificationsQuery.data?.limit)}
                showFirstButton
                showLastButton
            />
        </Container>
    );
};

export default NotificationsPagination;

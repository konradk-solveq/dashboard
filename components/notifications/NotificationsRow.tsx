import React, { useContext } from 'react';
import { Box, Button, Typography } from '@mui/material/';
import { Notification } from '../typings/Notifications';
import { NotificationsContext } from '../contexts/notifications';

const NotificationsRow: React.FC<{
    notification: Notification;
    key: number;
    openDeleteModal: (id: number) => void;
}> = ({ notification: { id, name }, openDeleteModal }) => {
    const { editHandler } = useContext(NotificationsContext);
    return (
        <Box display="flex" sx={{ ml: '24px', mr: '24px', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h5" fontWeight={200}>
                {name}
            </Typography>
            <Box display="flex">
                <Button variant="contained" color="success" onClick={() => editHandler(id)}>
                    Edytuj
                </Button>
                <Button variant="contained" color="error" onClick={() => openDeleteModal(id)} sx={{ ml: '16px' }}>
                    Usuń
                </Button>
            </Box>
        </Box>
    );
};

export default NotificationsRow;

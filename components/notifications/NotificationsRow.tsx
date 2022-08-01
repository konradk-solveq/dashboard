import React from 'react';
import { Button, Box, Typography } from '@mui/material/';

const NotificationsRow: React.FC<{
    title: string;
    id: number;
    key: number;
    deleteHandler;
    editHandler;
}> = ({ id, title, deleteHandler, editHandler }) => {
    return (
        <Box display="flex" sx={{ ml: '24px', mr: '24px', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h5" fontWeight={200}>
                {title}
            </Typography>
            <Box display="flex">
                <Button variant="contained" color="success" onClick={() => editHandler(id)}>
                    Edytuj
                </Button>
                <Button variant="contained" color="error" onClick={() => deleteHandler(id)} sx={{ ml: '16px' }}>
                    Usuń
                </Button>
            </Box>
        </Box>
    );
};

export default NotificationsRow;

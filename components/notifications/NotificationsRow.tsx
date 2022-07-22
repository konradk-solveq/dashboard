import React from 'react';
import { Button, Container, Box } from '@mui/material/';

const NotificationsRow: React.FC<{
    title: string;
    id: number;
    key: number;
    deleteHandler;
    editHandler;
}> = ({ id, title, deleteHandler, editHandler }) => {
    return (
        <Container sx={{ display: 'grid', gridTemplateColumns: '4fr 1fr 1fr', gap: '10px', margin: '20px' }}>
            <Box>{title}</Box>

            <Button variant="contained" color="success" onClick={() => editHandler(id)}>
                Edytuj
            </Button>
            <Button variant="contained" color="error" onClick={() => deleteHandler(id)}>
                Usuń
            </Button>
        </Container>
    );
};

export default NotificationsRow;

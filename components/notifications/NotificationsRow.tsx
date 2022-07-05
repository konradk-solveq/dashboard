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

            <Button
                onClick={() => editHandler(id)}
                sx={{ maxHeight: '40px', backgroundColor: 'green', cursor: 'pointer' }}
            >
                Edytuj
            </Button>
            <Button onClick={() => deleteHandler(id)} sx={{ maxHeight: '40px', cursor: 'pointer' }}>
                Usuń
            </Button>
        </Container>
    );
};

export default NotificationsRow;

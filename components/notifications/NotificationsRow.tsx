import React from 'react';
import { Button, Grid, Text } from 'theme-ui';

const NotificationsRow: React.FC<{
    title: string;
    id: number;
    key: number;
    deleteHandler;
    editHandler;
}> = ({ id, title, deleteHandler, editHandler }) => {
    return (
        <Grid columns="4fr 1fr 1fr" gap="10px" margin={'20px'}>
            <Text>{title}</Text>

            <Button
                onClick={() => editHandler(id)}
                sx={{ maxHeight: '40px', backgroundColor: 'green', cursor: 'pointer' }}
            >
                Edytuj
            </Button>
            <Button onClick={() => deleteHandler(id)} sx={{ maxHeight: '40px', cursor: 'pointer' }}>
                Usuń
            </Button>
        </Grid>
    );
};

export default NotificationsRow;

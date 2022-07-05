import React from 'react';
import { Button, Container, Box } from '@mui/material/';
import rowStyle from '../../styles/NotificationsGroupRow.module.css';

const NotificationsGroupRow: React.FC<{
    language: string;
    title: string;
    text: string;
    id: number;
    deleteHandler;
    editHandler;
}> = ({ id, language, title, text, deleteHandler, editHandler }) => {
    return (
        <Container className={rowStyle.container}>
            <Box className={rowStyle.language}>{language}</Box>
            <Box className={rowStyle.title}>{title}</Box>
            <Box className={rowStyle.text}>{text}</Box>
            <div className={rowStyle.buttons}>
                <Button
                    className={rowStyle.button}
                    onClick={() => editHandler(id)}
                    sx={{ maxHeight: '40px', backgroundColor: 'green' }}
                >
                    Edytuj
                </Button>
                <Button className={rowStyle.button} onClick={() => deleteHandler(id)} sx={{ maxHeight: '40px' }}>
                    Usuń
                </Button>
            </div>
        </Container>
    );
};

export default NotificationsGroupRow;

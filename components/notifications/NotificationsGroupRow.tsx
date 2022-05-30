import React from 'react';
import { Button, Container, Text } from 'theme-ui';
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
            <Text className={rowStyle.language}>{language}</Text>
            <Text className={rowStyle.title}>{title}</Text>
            <Text className={rowStyle.text}>{text}</Text>
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

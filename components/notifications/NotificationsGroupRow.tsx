import React from 'react';
import { Button, Box } from '@mui/material/';

const NotificationsGroupRow: React.FC<{
    language: string;
    title: string;
    text: string;
    id: number;
    deleteHandler;
    editHandler;
}> = ({ id, language, title, text, deleteHandler, editHandler }) => {
    return (
        <Box display="grid" gridTemplateColumns="1fr 2fr 3fr 1fr" gap={2} width="100%" ml="24px" mb={2}>
            <Box className="notifications-item" sx={{ maxHeight: '35px', maxWidth: '40px' }}>
                {language}
            </Box>
            <Box
                className="notifications-item"
                sx={{ maxWidth: '200px', maxHeight: '100px', overflowY: 'auto', wordBreak: 'break-all' }}
            >
                {title}
            </Box>
            <Box
                className="notifications-item"
                sx={{ maxWidth: '300px', maxHeight: '100px', overflowY: 'auto', wordBreak: 'break-all' }}
            >
                {text}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, maxHeight: '35px' }}>
                <Button onClick={() => editHandler(id)} variant="contained" color="success">
                    Edytuj
                </Button>
                <Button onClick={() => deleteHandler(id)} variant="contained" color="error">
                    Usuń
                </Button>
            </Box>
        </Box>
    );
};

export default NotificationsGroupRow;

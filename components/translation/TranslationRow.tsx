import React from 'react';
import { Button, Container, Input, Typography } from '@mui/material/';

const TranslationRow: React.FC<{
    code: string;
    version: string;
    controlSum: string;
    translation: string;
    deleteHandler;
}> = ({ code, version, controlSum, deleteHandler, translation }) => {
    return (
        <Container sx={{ display: 'grid', gridTemplateColumns: '50px 60px 230px 2fr 100px', mb: '10px' }}>
            <Typography sx={{ pt: '10px' }}>{code}</Typography>
            <Typography sx={{ pt: '10px' }}>{version}</Typography>
            <Typography sx={{ pt: '10px' }}>{controlSum}</Typography>
            <Input contentEditable={false} value={translation || ''} onChange={() => {}}></Input>
            <Button onClick={deleteHandler}>Usuń</Button>
        </Container>
    );
};
export default TranslationRow;

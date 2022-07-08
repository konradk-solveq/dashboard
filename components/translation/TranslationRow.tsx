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
        <Container
            sx={{
                display: 'grid',
                gridTemplateColumns: '0.25fr 0.5fr 2fr 3fr 1fr',
                mb: '10px',
                gap: 2,
                alignItems: 'center',
            }}
        >
            <Input
                value={code}
                disableUnderline={true}
                readOnly={true}
                className="input-black"
                sx={{ fontSize: '14px' }}
            ></Input>
            <Input
                value={version}
                disableUnderline={true}
                readOnly={true}
                className="input-black"
                sx={{ fontSize: '14px' }}
            ></Input>
            <Input
                value={controlSum}
                readOnly={true}
                disableUnderline={true}
                className="input-black"
                sx={{ fontSize: '14px' }}
            ></Input>
            <Input
                sx={{ fontSize: '14px' }}
                disableUnderline={true}
                className="document-select-form input-black"
                contentEditable={false}
                readOnly={true}
                value={translation || ''}
                onChange={() => {}}
            ></Input>
            <Button variant="contained" onClick={deleteHandler}>
                Usuń
            </Button>
        </Container>
    );
};
export default TranslationRow;

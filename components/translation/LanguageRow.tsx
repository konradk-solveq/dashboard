import React from 'react';
import { Button, Container, Checkbox, Input, Typography } from '@mui/material/';

const LanguageRow: React.FC<{
    name: string;
    code: string;
    icon: string;
    isActive: boolean;
    newLanguage?: boolean;
    saveHandler;
    deleteHandler;
    setter: (field, value) => void;
}> = ({ setter, code, name, icon, isActive, saveHandler, newLanguage, deleteHandler }) => {
    return (
        <Container
            sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: '0.5fr 1fr 10fr 1fr 1fr 1fr',
                alignItems: 'center',
            }}
        >
            <Input
                className="input-black"
                disableUnderline={true}
                sx={{ backgroundColor: `${!newLanguage ? 'lightgrey' : 'white'}`, fontSize: '14px' }}
                placeholder="kod"
                disabled={!newLanguage ? true : false}
                value={code}
                onChange={(e) => setter('code', e.target.value)}
            ></Input>
            <Input
                className="input-black"
                disableUnderline={true}
                sx={{ backgroundColor: 'white', fontSize: '14px' }}
                placeholder="nazwa"
                value={name || ''}
                onChange={(e) => setter('name', e.target.value)}
            ></Input>
            <Input
                className="input-black"
                disableUnderline={true}
                sx={{ backgroundColor: 'white', fontSize: '14px' }}
                placeholder="ikona"
                value={icon || ''}
                onChange={(e) => setter('icon', e.target.value)}
            ></Input>
            <Typography sx={{ p: '8px' }}>
                <Checkbox
                    sx={{ backgroundColor: 'white', fontSize: '14px' }}
                    checked={isActive}
                    onChange={(e) => setter('isActive', e.target.checked)}
                />
            </Typography>
            <Button variant="contained" color="success" onClick={saveHandler}>
                Zapisz
            </Button>
            <Button variant="contained" color="error" onClick={deleteHandler}>
                Usuń
            </Button>
        </Container>
    );
};
export default LanguageRow;

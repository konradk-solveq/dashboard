import React from 'react';
import { Button, Container, Checkbox, Input, InputLabel } from '@mui/material/';

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
        <Container sx={{ gap: 2, gridTemplateColumns: '50px 180px 2fr 40px 100px 100px', marginBottom: '10px' }}>
            <Input
                sx={{ backgroundColor: `${!newLanguage ? 'lightgrey' : 'white'}` }}
                placeholder="kod"
                disabled={!newLanguage ? true : false}
                value={code}
                onChange={(e) => setter('code', e.target.value)}
            ></Input>
            <Input
                sx={{ backgroundColor: 'white' }}
                placeholder="nazwa"
                value={name || ''}
                onChange={(e) => setter('name', e.target.value)}
            ></Input>
            <Input
                sx={{ backgroundColor: 'white' }}
                placeholder="ikona"
                value={icon || ''}
                onChange={(e) => setter('icon', e.target.value)}
            ></Input>
            <InputLabel sx={{ p: '8px' }}>
                <Checkbox
                    sx={{ backgroundColor: 'white' }}
                    checked={isActive}
                    onChange={(e) => setter('isActive', e.target.checked)}
                />
            </InputLabel>
            <Button sx={{ bg: 'green' }} onClick={saveHandler}>
                Zapisz
            </Button>
            <Button onClick={deleteHandler}>Usuń</Button>
        </Container>
    );
};
export default LanguageRow;

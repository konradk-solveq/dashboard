import React from 'react';
import { Button, Grid, Checkbox, Input, Label } from 'theme-ui';

export const LanguageRow: React.FC<{
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
        <Grid gap={2} columns="50px 180px 2fr 40px 100px 100px" marginBottom="10px">
            <Input
                bg={!newLanguage ? 'lightgrey' : 'white'}
                placeholder="kod"
                disabled={!newLanguage ? true : false}
                value={code}
                onChange={(e) => setter('code', e.target.value)}
            ></Input>
            <Input bg="white" placeholder="nazwa" value={name || ''} onChange={(e) => setter('name', e.target.value)}></Input>
            <Input bg="white" placeholder="ikona" value={icon || ''} onChange={(e) => setter('icon', e.target.value)}></Input>
            <Label p="8px">
                <Checkbox bg="white" checked={isActive} onChange={(e) => setter('isActive', e.target.checked)} />
            </Label>
            <Button bg="green" onClick={saveHandler}>
                Zapisz
            </Button>
            <Button onClick={deleteHandler}>Usuń</Button>
        </Grid>
    );
};

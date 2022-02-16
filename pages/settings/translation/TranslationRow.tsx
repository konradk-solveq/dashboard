import React from 'react';
import { Button, Grid, Input, Text } from 'theme-ui';

export const TranslationRow: React.FC<{
    code: string;
    version: string;
    controlSum: string;
    translation: string;
    deleteHandler;
}> = ({ code, version, controlSum, deleteHandler, translation }) => {
    return (
        <Grid gap={2} columns="50px 60px 230px 2fr 100px" marginBottom="10px">
            <Text pt="10px">{code}</Text>
            <Text pt="10px">{version}</Text>
            <Text pt="10px">{controlSum}</Text>
            <Input contentEditable={false} value={translation || ''} onChange={() => {}}></Input>
            <Button onClick={deleteHandler}>Usuń</Button>
        </Grid>
    );
};

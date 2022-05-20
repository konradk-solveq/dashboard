import React from 'react';
import { Box, Button, Grid, Input, Label } from 'theme-ui';

const TranslationAddForm = ({ newUiTranslations, setNewUiTranslationsValue, addUiTranslationAndNotify }) => {
    const { code, version, file } = newUiTranslations;
    const disabledAddTranslation = code && version && file ? false : true;
    return (
        <>
            <Grid gap={2} columns="50px 180px 1fr" marginBottom="10px">
                <Label>Kod</Label>
                <Label>Wersja</Label>
                <Label>Plik z tłumaczeniem UI</Label>
            </Grid>
            <Grid gap={2} columns="50px 180px 1fr" marginBottom="10px">
                <Input value={code} onChange={(e) => setNewUiTranslationsValue('code')(e.target.value)}></Input>
                <Input value={version} onChange={(e) => setNewUiTranslationsValue('version')(e.target.value)}></Input>
                <Input
                    type="file"
                    accept="application/json"
                    multiple={false}
                    onChange={(e) => setNewUiTranslationsValue('file')(e.target.files[0])}
                ></Input>
            </Grid>
            <Grid gap={2} columns="4fr 200px 4fr" mb="40px">
                <Box></Box>
                <Button
                    sx={{ textAlign: 'center' }}
                    onClick={() => addUiTranslationAndNotify(newUiTranslations)}
                    {...(disabledAddTranslation ? { bg: 'lightgrey', disabled: true } : {})}
                >
                    Dodaj tłumaczenie
                </Button>
            </Grid>
        </>
    );
};
export default TranslationAddForm;

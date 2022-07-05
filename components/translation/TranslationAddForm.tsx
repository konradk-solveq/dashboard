import React from 'react';
import { Box, Button, Container, Input, InputLabel } from '@mui/material/';

const TranslationAddForm = ({ newUiTranslations, setNewUiTranslationsValue, addUiTranslationAndNotify }) => {
    const { code, version, file } = newUiTranslations;
    const disabledAddTranslation = code && version && file ? false : true;
    return (
        <>
            <Container sx={{ display: 'grid', gridTemplateColumns: '50px 180px 1fr', mb: '10px' }}>
                <InputLabel>Kod</InputLabel>
                <InputLabel>Wersja</InputLabel>
                <InputLabel>Plik z tłumaczeniem UI</InputLabel>
            </Container>
            <Container sx={{ display: 'grid', gridTemplateColumns: '50px 180px 1fr', mb: '10px' }}>
                <Input value={code} onChange={(e) => setNewUiTranslationsValue('code')(e.target.value)}></Input>
                <Input value={version} onChange={(e) => setNewUiTranslationsValue('version')(e.target.value)}></Input>
                <Input
                    type="file"
                    accept="application/json"
                    multiple={false}
                    onChange={(e) => setNewUiTranslationsValue('file')(e.target.files[0])}
                ></Input>
            </Container>
            <Container sx={{ display: 'grid', gridTemplateColumns: '4fr 200px 4fr', mb: '40px' }}>
                <Box></Box>
                <Button
                    sx={{ textAlign: 'center' }}
                    onClick={() => addUiTranslationAndNotify(newUiTranslations)}
                    {...(disabledAddTranslation ? { bg: 'lightgrey', disabled: true } : {})}
                >
                    Dodaj tłumaczenie
                </Button>
            </Container>
        </>
    );
};
export default TranslationAddForm;

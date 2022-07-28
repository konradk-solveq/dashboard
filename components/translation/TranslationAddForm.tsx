import React from 'react';
import { Box, Button, Container, Input, Typography } from '@mui/material/';

const TranslationAddForm = ({ newUiTranslations, setNewUiTranslationsValue, addUiTranslationAndNotify }) => {
    const { code, version, file } = newUiTranslations;
    const disabledAddTranslation = code && version && file ? false : true;
    return (
        <>
            <Container sx={{ display: 'grid', gridTemplateColumns: '50px 180px 1fr', mb: '10px', gap: 2 }}>
                <Typography variant="h5">Kod</Typography>
                <Typography variant="h5">Wersja</Typography>
                <Typography variant="h5">Plik z tłumaczeniem UI</Typography>
            </Container>
            <Container sx={{ display: 'grid', gridTemplateColumns: '50px 180px 1fr', mb: 2, gap: 2 }}>
                <Input
                    className="document-input-form document-select-form"
                    disableUnderline={true}
                    value={code}
                    onChange={(e) => setNewUiTranslationsValue('code')(e.target.value)}
                ></Input>
                <Input
                    className="document-input-form document-select-form"
                    disableUnderline={true}
                    value={version}
                    onChange={(e) => setNewUiTranslationsValue('version')(e.target.value)}
                ></Input>
                <input
                    type="file"
                    accept="application/.json"
                    multiple={false}
                    required
                    hidden
                    value={version}
                    id="file"
                    onChange={(e) => setNewUiTranslationsValue('file')(e.target.files[0])}
                />
                <label htmlFor="file">
                    <Button
                        sx={{ width: '20%' }}
                        variant="contained"
                        component="span"
                        className="document-select-form document-input-form"
                    >
                        Dodaj Plik
                    </Button>
                </label>
            </Container>
            <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    sx={{ textAlign: 'center' }}
                    variant="contained"
                    color="success"
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

import React from 'react';
import { Box, Button, Grid, InputLabel, Container } from '@mui/material/';
import LanguageRow from './LanguageRow';

const LanguageTable = ({
    languageState,
    setLanguagesValue,
    updateLanguagesAndNotify,
    deleteLanguageAndNotify,
    setLanguageState,
}) => {
    const disabledAddLanguage =
        languageState.length < 1 ||
        !languageState.reduce((previous, current) => (previous ? previous : current.newLanguage || false), false)
            ? false
            : true;
    const nextLanguageId =
        languageState.length &&
        languageState.reduce((previous, current) => (previous > current.id ? previous : current.id), 0) + 1;
    return (
        <>
            <Container
                sx={{ display: 'grid', gridTemplateColumns: '50px 180px 2fr 40px 100px 100px', gap: 2, mb: '10px' }}
            >
                <InputLabel>Kod</InputLabel>
                <InputLabel>Nazwa</InputLabel>
                <InputLabel>Ikona</InputLabel>
                <InputLabel>Aktywny</InputLabel>
                <InputLabel></InputLabel>
            </Container>
            {languageState.length
                ? languageState.map(({ code, name, icon, isActive, newLanguage, id }) => {
                      return (
                          <LanguageRow
                              newLanguage={newLanguage || false}
                              key={id}
                              code={code}
                              name={name}
                              isActive={isActive}
                              icon={icon}
                              setter={setLanguagesValue(id)}
                              saveHandler={() =>
                                  updateLanguagesAndNotify(
                                      languageState.reduce((previous, current) =>
                                          current.code === code ? current : previous,
                                      ),
                                  )
                              }
                              deleteHandler={() => {
                                  deleteLanguageAndNotify(code);
                              }}
                          />
                      );
                  })
                : ''}
            <Grid sx={{ gap: 2, gridTemplateColumns: '4fr 200px 4fr' }}>
                <Box></Box>
                <Button
                    sx={{ backgroundColor: `${!disabledAddLanguage ? 'default' : 'lightgray'}`, textAlign: 'center' }}
                    disabled={disabledAddLanguage}
                    onClick={() => setLanguageState((p) => [...p, { id: nextLanguageId, code: '', newLanguage: true }])}
                >
                    Dodaj język
                </Button>
            </Grid>
        </>
    );
};
export default LanguageTable;

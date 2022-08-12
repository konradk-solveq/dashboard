import React from 'react';
import { Button, Typography, Container } from '@mui/material/';
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
            <Container sx={{ display: 'grid', gridTemplateColumns: '0.5fr 1fr 10fr 1fr 1fr 1fr', gap: 2, mb: '10px' }}>
                <Typography variant="h5">Kod</Typography>
                <Typography variant="h5">Nazwa</Typography>
                <Typography variant="h5">Ikona</Typography>
                <Typography variant="h5">Aktywny</Typography>
                <Typography></Typography>
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
                              saveHandler={() => {
                                  const data = languageState.reduce((previous, current) =>
                                      current.code === code ? current : previous,
                                  );
                                  updateLanguagesAndNotify({ data });
                              }}
                              deleteHandler={() => {
                                  deleteLanguageAndNotify({ code });
                              }}
                          />
                      );
                  })
                : ''}
            <Container sx={{ display: 'flex' }}>
                <Button
                    variant={!disabledAddLanguage ? 'contained' : 'outlined'}
                    size="large"
                    sx={{ ml: 'auto' }}
                    disabled={disabledAddLanguage}
                    onClick={() => setLanguageState((p) => [...p, { id: nextLanguageId, code: '', newLanguage: true }])}
                >
                    Dodaj język
                </Button>
            </Container>
        </>
    );
};
export default LanguageTable;

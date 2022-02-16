import React from 'react';
import { Box, Button, Grid, Label } from 'theme-ui';
import { LanguageRow } from './LanguageRow';

export const LanguageTable = ({
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
            <Grid gap={2} columns="50px 180px 2fr 40px 100px 100px" marginBottom="10px">
                <Label>Kod</Label>
                <Label>Nazwa</Label>
                <Label>Ikona</Label>
                <Label>Aktywny</Label>
                <Label></Label>
            </Grid>
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
            <Grid gap={2} columns="4fr 200px 4fr">
                <Box></Box>
                <Button
                    bg={!disabledAddLanguage ? 'default' : 'lightgray'}
                    disabled={disabledAddLanguage}
                    sx={{ textAlign: 'center' }}
                    onClick={() => setLanguageState((p) => [...p, { id: nextLanguageId, code: '', newLanguage: true }])}
                >
                    Dodaj język
                </Button>
            </Grid>
        </>
    );
};

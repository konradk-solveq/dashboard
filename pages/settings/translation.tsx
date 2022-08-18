import { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItemText } from '@mui/material/';
import TranslationsContainer, { TranslationsContext, LanguageData } from '../../components/contexts/translation';
import LanguageTable from '../../components/translation/LanguageTable';
import TranslationAddForm from '../../components/translation/TranslationAddForm';
import TranslationTable from '../../components/translation/TranslationTable';
import NotificationBox from '../../components/translation/NotificationBox';
import { readFromFile } from '../../helpers/readFromFile';
import { message } from '../../components/contexts/translation/index';

type LanguageState = Array<LanguageData & { newLanguage?: boolean }>;

const TranslationMenage: React.FC<{}> = () => {
    const {
        languages,
        updateLanguages,
        deleteLanguage,
        uiTranslations,
        updateUiTranslation,
        deleteUiTranslation,
        hasError,
        setLimitsAndOffset,
        uiTranslationCount,
        limitAndOffset,
        notification,
    } = useContext(TranslationsContext);
    const [languageState, setLanguageState] = useState<LanguageState>([]);
    const [uiTranslationsState, setUiTranslationsState] = useState([]);
    const [newUiTranslations, setNewUiTranslations] = useState<{ version: string; code: string; file: any }>({
        version: '',
        code: '',
        file: '',
    });

    const setLanguagesValue = (id: number) => (field: keyof LanguageState, value: any) => {
        setLanguageState(languageState.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)));
    };
    const setNewUiTranslationsValue = (field: string) => (value: any) => {
        setNewUiTranslations({ ...newUiTranslations, [field]: value });
    };

    const updateLanguagesAndNotify = ({ data }) => updateLanguages.mutate({ data });

    const deleteLanguageAndNotify = ({ code }) => deleteLanguage.mutate({ code });

    const addUiTranslationAndNotify = async ({ version, code, file }) => {
        const data = await readFromFile(file);
        updateUiTranslation.mutate({ data: { version, code, translation: data } });
    };
    const deleteUiTranslationAndNotify = ({ id }) => deleteUiTranslation.mutate({ id });

    useEffect(() => {
        if (languages) setLanguageState([...languages]);
    }, [languages]);

    useEffect(() => {
        if (uiTranslations) setUiTranslationsState([...uiTranslations]);
    }, [uiTranslations]);
    if (hasError) return <>{message.loadingError}</>;
    if (!languages && !uiTranslations) return <>{message.loading}</>;
    return (
        <Container>
            <Container
                sx={{
                    maxWidth: '1200px',
                    p: '30px',
                    marginX: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {notification && <NotificationBox>{notification}</NotificationBox>}
                <Typography variant="h2" sx={{ textAlign: 'center', m: '20px' }}>
                    Języki
                </Typography>
                <LanguageTable
                    {...{
                        languageState,
                        setLanguagesValue,
                        updateLanguagesAndNotify,
                        deleteLanguageAndNotify,
                        setLanguageState,
                    }}
                ></LanguageTable>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Podczas pracy może wystąpić błąd. Proszę wówczas sprawdzić, czy wykonywane czynności nie naruszają
                    zasad walidacji.
                    <List>
                        <ListItemText
                            primaryTypographyProps={{
                                fontSize: 16,
                                fontWeight: 300,
                                letterSpacing: 0,
                            }}
                        >
                            - Kod języka musi być poprawny. Posługujemy się ISO 639-1.
                        </ListItemText>
                        <ListItemText
                            primaryTypographyProps={{
                                fontSize: 16,
                                fontWeight: 300,
                                letterSpacing: 0,
                            }}
                        >
                            - Ikona musi być poprawnym kodem svg, minimum to &lt;svg&gt;&lt;/svg&gt;.
                        </ListItemText>
                        <ListItemText
                            primaryTypographyProps={{
                                fontSize: 16,
                                fontWeight: 300,
                                letterSpacing: 0,
                            }}
                        >
                            - Nie można aktywować niekompletnego języka.
                        </ListItemText>
                        <ListItemText
                            primaryTypographyProps={{
                                fontSize: 16,
                                fontWeight: 300,
                                letterSpacing: 0,
                            }}
                        >
                            - Przed usunięciem języka należy usunąć wszystkie tłumaczenia dotyczące tego języka.
                        </ListItemText>
                    </List>
                </Typography>
                <Box
                    sx={{
                        width: '80vw',
                        borderTop: '1px solid #2F4858',
                        textAlign: 'center',
                        ml: 'auto',
                        mr: 'auto',
                        mt: 2,
                    }}
                />
                <Typography sx={{ textAlign: 'center', m: '20px' }}>Tłumaczenia</Typography>
                <TranslationAddForm
                    {...{ newUiTranslations, setNewUiTranslationsValue, addUiTranslationAndNotify }}
                ></TranslationAddForm>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Podczas pracy może wystąpić błąd. Proszę wówczas sprawdzić, czy wykonywane czynności nie naruszają
                    zasad walidacji.
                    <List>
                        <ListItemText
                            primaryTypographyProps={{
                                fontSize: 16,
                                fontWeight: 300,
                                letterSpacing: 0,
                            }}
                        >
                            - Kod języka musi być poprawny. Posługujemy się ISO 639-1.
                        </ListItemText>
                        <ListItemText
                            primaryTypographyProps={{
                                fontSize: 16,
                                fontWeight: 200,
                                letterSpacing: 0,
                            }}
                        >
                            - Numer wersji musi być poprawny. Czyli np. 12.0.125.
                        </ListItemText>
                        <ListItemText
                            primaryTypographyProps={{
                                fontSize: 16,
                                fontWeight: 200,
                                letterSpacing: 0,
                            }}
                        >
                            - Plik z tłumaczeniem musi zawierać poprawny obiekt json.
                        </ListItemText>
                    </List>
                </Typography>
                <Box
                    sx={{
                        width: '80vw',
                        borderTop: '1px solid #2F4858',
                        textAlign: 'center',
                        ml: 'auto',
                        mr: 'auto',
                        mt: 2,
                        mb: 2,
                    }}
                />
                <TranslationTable
                    {...{
                        limitAndOffset,
                        setLimitsAndOffset,
                        uiTranslationCount,
                        uiTranslationsState,
                        deleteUiTranslationAndNotify,
                    }}
                ></TranslationTable>
            </Container>
        </Container>
    );
};

const TranslationPage: NextPage<{}> = (props) => {
    return (
        <TranslationsContainer>
            <TranslationMenage />
        </TranslationsContainer>
    );
};

export default TranslationPage;

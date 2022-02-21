import { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Heading, Divider } from 'theme-ui';
import TranslationsContainer, { TranslationsContext, LanguageData } from '../../components/contexts/translation';
import LanguageTable from '../../components/translation/LanguageTable';
import TranslationAddForm from '../../components/translation/TranslationAddForm';
import TranslationTable from '../../components/translation/TranslationTable';
import NotificationBox from '../../components/translation/NotificationBox';
import { readFromFile } from '../../helpers/readFromFile';

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
    } = useContext(TranslationsContext);
    const [notification, setNotification] = useState<string>('');
    const [languageState, setLanguageState] = useState<LanguageState>([]);
    const [uiTranslationsState, setUiTranslationsState] = useState([]);
    const [newUiTranslations, setNewUiTranslations] = useState<{ version: string; code: string; file: any }>({
        version: '',
        code: '',
        file: '',
    });
    const message = {
        save: 'Zapisano',
        delete: 'Usunięto',
        error: 'Wystąpił błąd',
        loading: 'Ładowanie',
        loadingError: 'Wystąpił błąd ładowania danych',
    };
    const setLanguagesValue = (id: number) => (field: keyof LanguageState, value: any) => {
        setLanguageState(languageState.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)));
    };
    const setNewUiTranslationsValue = (field: string) => (value: any) => {
        setNewUiTranslations({ ...newUiTranslations, [field]: value });
    };
    const useNotification =
        (fn, message, errMessage) =>
        async (...args) => {
            try {
                await fn(...args);
                setNotification(message);
            } catch (err) {
                setNotification(errMessage);
            }
        };
    const updateLanguagesAndNotify = useNotification(updateLanguages, message.save, message.error);
    const deleteLanguageAndNotify = useNotification(deleteLanguage, message.delete, message.error);
    const addUiTranslationAndNotify = useNotification(
        async ({ version, code, file }) => {
            const data = await readFromFile(file);
            await updateUiTranslation({ version, code, translation: data });
        },
        message.save,
        message.error,
    );
    const deleteUiTranslationAndNotify = useNotification(deleteUiTranslation, message.delete, message.error);
    useEffect(() => {
        if (notification) {
            const id = setTimeout(() => setNotification(''), 2000);
            return () => clearTimeout(id);
        }
    }, [notification]);
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
            <Container p="30px" marginX="auto" sx={{ maxWidth: '1200px' }}>
                {notification && <NotificationBox>{notification}</NotificationBox>}
                <Heading m="20px" sx={{ textAlign: 'center' }}>
                    Języki
                </Heading>
                <LanguageTable
                    {...{
                        languageState,
                        setLanguagesValue,
                        updateLanguagesAndNotify,
                        deleteLanguageAndNotify,
                        setLanguageState,
                    }}
                ></LanguageTable>
                <p>
                    Podczas pracy może wystąpić błąd. Proszę wówczas sprawdzić, czy wykonywane czynności nie naruszają
                    zasad walidacji.
                    <ul>
                        <li>Kod języka musi być poprawny. Posługujemy się ISO 639-1.</li>
                        <li>Ikona musi być poprawnym kodem svg, minimum to &lt;svg&gt;&lt;/svg&gt;.</li>
                        <li>Nie można aktywować niekompletnego języka.</li>
                        <li>Przed usunięciem języka należy usunąć wszystkie tłumaczenia dotyczące tego języka.</li>
                    </ul>
                </p>
                <Divider marginY="60px"></Divider>
                <Heading m="20px" sx={{ textAlign: 'center' }}>
                    Tłumaczenia
                </Heading>
                <TranslationAddForm
                    {...{ newUiTranslations, setNewUiTranslationsValue, addUiTranslationAndNotify }}
                ></TranslationAddForm>
                <p>
                    Podczas pracy może wystąpić błąd. Proszę wówczas sprawdzić, czy wykonywane czynności nie naruszają
                    zasad walidacji.
                    <ul>
                        <li>Kod języka musi być poprawny. Posługujemy się ISO 639-1.</li>
                        <li>Numer wersji musi być poprawny. Czyli np. 12.0.125.</li>
                        <li>Plik z tłumaczeniem musi zawierać poprawny obiekt json.</li>
                    </ul>
                </p>
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

import { createContext, useCallback, useEffect, useState } from 'react';
import qs from 'querystring';
import axios, { AxiosResponse } from 'axios';
import endpoints from '../../utils/apiEndpoints';
import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import getQueryFn from '../../utils/getQueryFn';
import config from '../../../helpers/queryConfig';

export interface LanguageData {
    id?: number;
    code: string;
    name?: string;
    icon?: string;
    controlSum?: string;
    isActive?: boolean;
}
export type LanguagesGetData = LanguageData[];
type LimitAndOffset = { limit: number; offset: number };
interface TranslationsContextProps {
    languages: LanguagesGetData;
    updateLanguages: UseMutationResult<AxiosResponse<LanguageData>>;
    deleteLanguage: UseMutationResult;
    uiTranslations: any;
    uiTranslationCount: number;
    updateUiTranslation: UseMutationResult;
    deleteUiTranslation: UseMutationResult;
    setLimitsAndOffset: (limitAndOffset: LimitAndOffset) => void;
    limitAndOffset: LimitAndOffset;
    hasError: boolean;
    notification: string;
}

export const TranslationsContext = createContext<TranslationsContextProps>(null!);

const updateLanguageHandler = ({ data: { code, name, icon, isActive } }) =>
    axios.post(endpoints.languages, { code, name, icon, isActive });

const deleteLanguageHandler = ({ code }) => axios.delete(`${endpoints.languages}/${code}`);

const updateUiTranslationHandler = ({ data }) => axios.post(endpoints.uiTranslation, data);

const deleteUiTranslationHandler = ({ id }) => axios.delete(`${endpoints.uiTranslation}/${id}`);

export enum message {
    save = 'Zapisano',
    delete = 'Usunięto',
    error = 'Wystąpił błąd',
    loading = 'Ładowanie',
    loadingError = 'Wystąpił błąd ładowania danych',
}

const TranslationsContainer: React.FC<{}> = ({ children }) => {
    const [limitAndOffset, setLimitAndOffsetState] = useState<LimitAndOffset>({ limit: 5, offset: 0 });
    const [notification, setNotification] = useState<string>('');
    const {
        data: languages,
        refetch: revalidateLanguages,
        isError: errorLanguage,
    } = useQuery(['languages'], () => getQueryFn(endpoints.languages), { ...config });

    const {
        data: uiTranslations,
        refetch: revalidateUiTranslations,
        isError: errorUiTranslations,
    } = useQuery(['uiTranslation'], () => getQueryFn(`${endpoints.uiTranslation}?${qs.stringify(limitAndOffset)}`), {
        ...config,
    });

    const revalidateAll = () => {
        revalidateLanguages();
        revalidateUiTranslations();
    };

    const updateLanguages = useMutation(updateLanguageHandler, {
        onSuccess: () => {
            revalidateLanguages(), setNotification(message.save);
        },
        onError: () => setNotification(message.error),
    });
    const deleteLanguage = useMutation(deleteLanguageHandler, {
        onSuccess: () => {
            revalidateLanguages(), setNotification(message.delete);
        },
        onError: () => setNotification(message.error),
    });
    const updateUiTranslation = useMutation(updateUiTranslationHandler, {
        onSuccess: () => {
            revalidateAll();
            setNotification(message.save);
        },
        onError: () => setNotification(message.error),
    });
    const deleteUiTranslation = useMutation(deleteUiTranslationHandler, {
        onSuccess: () => {
            setNotification(message.delete);
            revalidateAll();
        },
        onError: () => setNotification(message.error),
    });

    const setLimitsAndOffset = useCallback(
        (limitAndOffset: LimitAndOffset) => {
            setLimitAndOffsetState(limitAndOffset);
            revalidateUiTranslations();
        },
        [revalidateUiTranslations],
    );

    useEffect(() => {
        if (notification) {
            const id = setTimeout(() => setNotification(''), 2000);
            return () => clearTimeout(id);
        }
    }, [notification]);

    return (
        <TranslationsContext.Provider
            value={{
                languages: languages && languages.map((lang, index) => ({ ...lang, id: index })),
                hasError: !!errorLanguage || !!errorUiTranslations,
                updateLanguages,
                deleteLanguage,
                uiTranslations: uiTranslations?.translations || [],
                uiTranslationCount: uiTranslations?.count,
                updateUiTranslation,
                deleteUiTranslation,
                setLimitsAndOffset,
                limitAndOffset,
                notification,
            }}
        >
            {children}
        </TranslationsContext.Provider>
    );
};
function errorHandler({ status, statusText }) {
    if (status >= 400) {
        throw new Error(statusText);
    }
}

export default TranslationsContainer;

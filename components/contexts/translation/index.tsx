import { createContext, useCallback, useState } from 'react';
import useSWR from 'swr';
import qs from 'querystring';

const fetcher = (url) => fetch(url).then((r) => r.json());

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
    updateLanguages: (data: LanguageData) => {};
    deleteLanguage: (code: string) => {};
    uiTranslations: any;
    uiTranslationCount: number;
    updateUiTranslation: (data: any) => {};
    deleteUiTranslation: (id: number) => {};
    setLimitsAndOffset: (limitAndOffset: LimitAndOffset) => void;
    limitAndOffset: LimitAndOffset;
    hasError: boolean;
}

export const TranslationsContext = createContext<TranslationsContextProps>(null!);

const TranslationsContainer: React.FC<{}> = ({ children }) => {
    const [limitAndOffset, setLimitAndOffsetState] = useState<LimitAndOffset>({ limit: 5, offset: 0 });
    const {
        data: languages,
        revalidate: revalidateLanguages,
        error: errorLanguage,
    } = useSWR<LanguagesGetData>('/api/application/languages/manage', fetcher);
    const {
        data: uiTranslations,
        revalidate: revalidateUiTranslations,
        error: errorUiTranslations,
    } = useSWR(`/api/application/ui-translation/manage?${qs.stringify(limitAndOffset)}`, fetcher);
    const updateLanguages = useCallback(
        (data: LanguageData) => updateLanguageHandler(data).then(errorHandler).then(revalidateLanguages),
        [revalidateLanguages],
    );
    const setLimitsAndOffset = useCallback(
        (limitAndOffset: LimitAndOffset) => {
            setLimitAndOffsetState(limitAndOffset);
            revalidateUiTranslations();
        },
        [revalidateUiTranslations],
    );
    const deleteLanguage = useCallback(
        (code: string) => deleteLanguageHandler(code).then(errorHandler).then(revalidateLanguages),
        [revalidateLanguages],
    );
    const updateUiTranslation = useCallback(
        (data) =>
            updateUiTranslationHandler(data)
                .then(errorHandler)
                .then(() => {
                    revalidateUiTranslations();
                    revalidateLanguages();
                }),
        [revalidateUiTranslations, revalidateLanguages],
    );
    const deleteUiTranslation = useCallback(
        (id: number) =>
            deleteUiTranslationHandler(id)
                .then(errorHandler)
                .then(() => {
                    revalidateUiTranslations();
                }),
        [revalidateUiTranslations],
    );
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
            }}
        >
            {children}
        </TranslationsContext.Provider>
    );
};
export function errorHandler({ status, statusText }) {
    if (status >= 400) {
        throw new Error(statusText);
    }
}
function updateLanguageHandler(data: LanguageData) {
    const { code, name, isActive, icon } = data;
    return fetch(`/api/application/languages/manage`, {
        method: 'POST',
        body: JSON.stringify({ code, name, isActive, icon }),
    });
}
function deleteLanguageHandler(code: string) {
    return fetch(`/api/application/languages/manage/${code}`, {
        method: 'DELETE',
    });
}
function updateUiTranslationHandler(data) {
    return fetch(`/api/application/ui-translation/manage`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
function deleteUiTranslationHandler(id: number) {
    return fetch(`/api/application/ui-translation/manage/${id}`, {
        method: 'DELETE',
    });
}
export default TranslationsContainer;

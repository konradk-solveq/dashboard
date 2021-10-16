import { createContext, useCallback } from 'react';
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((r) => r.json());

export interface SettingsGetData {
    version: Record<'android' | 'ios', { i18n: string; value: string }>;
}
export interface SettingsPostData {
    version: Record<'android' | 'ios', string>;
}
interface SettingsContextProps {
    settings: SettingsGetData;
    hasError: boolean;
    setKey<K extends keyof SettingsGetData>(key: K, value: SettingsPostData[K]);
}

export const SettingsContext = createContext<SettingsContextProps>(null!);

const SettingsContainer: React.FC<{}> = ({ children }) => {
    const { data, revalidate, error } = useSWR<SettingsGetData>('/api/settings', fetcher);

    const setKey = useCallback(
        function <K extends keyof SettingsGetData>(key: K, value: SettingsPostData[K]) {
            return fetch(`/api/settings/${key}`, { method: 'POST', body: JSON.stringify(value) })
                .then(({ status, statusText }) => {
                    if (status >= 400) {
                        throw new Error(statusText);
                    }
                })
                .then(revalidate);
        },
        [revalidate],
    );

    return (
        <SettingsContext.Provider
            value={{
                settings: data,
                hasError: !!error,
                setKey,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsContainer;

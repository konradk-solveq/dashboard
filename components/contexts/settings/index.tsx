import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { createContext } from 'react';
import endpoints from '../../utils/apiEndpoints';
import getQueryFn from '../../utils/getQueryFn';

export interface SettingsGetData {
    version: Record<'android' | 'ios', { i18n: string; value: string }>;
}
export interface SettingsPostData {
    version: Record<'android' | 'ios', string>;
}
interface SettingsContextProps {
    settings: SettingsGetData;
    hasError: boolean;
    setKey: UseMutationResult<AxiosResponse<SettingsGetData>>;
}

export const SettingsContext = createContext<SettingsContextProps>(null!);

const postKey = ({ key, value }) => {
    return axios.post(`${endpoints.settings}/${key}`, JSON.stringify(value));
};

const SettingsContainer: React.FC<{}> = ({ children }) => {
    const queryClient = useQueryClient();

    const { data, error } = useQuery<SettingsGetData>(['settings'], () => getQueryFn(endpoints.settings));

    const setKey = useMutation(postKey, {
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications']);
        },
    });

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

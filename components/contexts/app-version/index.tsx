import { createContext, useCallback, useEffect, useState } from 'react';
import qs from 'querystring';
import axios, { AxiosResponse } from 'axios';
import endpoints from '../../utils/apiEndpoints';
import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import getQueryFn from '../../utils/getQueryFn';
import config from '../../../helpers/queryConfig';
import { message } from '../translation/index';

export interface AppPlatform {
    id?: number;
    name?: string;
}
export interface AppVersion {
    id?: number;
    number?: string;
    orderNumber?: string;
}
export interface AppVersionToPlatform {
    appVersionId?: number;
    appPlatformId?: number;
    published?: boolean;
    publishedAt?: string;
    forceUpdate?: boolean;
    appPlatform?: AppPlatform;
    appVersion?: AppVersion;
}
export interface CreateAppVersionToPlatform {
    appVersion: string;
    appPlatform: string;
}
export interface UpdateAppVersionToPlatform {
    published?: boolean;
    forceUpdate?: boolean;
}
export type AppVersionToPlatforms = AppVersionToPlatform[];
type LimitAndOffset = { limit: number; offset: number };

interface AppVersionToPlatformsContextProps {
    appVersionToPlatforms: AppVersionToPlatforms;
    appVersionToPlatformsCount: number;
    createAppVersionToPlatform: UseMutationResult<AxiosResponse<CreateAppVersionToPlatform>>;
    updateAppVersionToPlatform: UseMutationResult<AxiosResponse<UpdateAppVersionToPlatform>>;
    deleteAppVersionToPlatform: UseMutationResult;
    setLimitsAndOffset: (limitAndOffset: LimitAndOffset) => void;
    limitAndOffset: LimitAndOffset;
    hasError: boolean;
    notification: string;
}

export const AppVersionToPlatformsContext = createContext<AppVersionToPlatformsContextProps>(null!);

const createAppVersionToPlatformHandler = ({ data }) => axios.post(endpoints.appVersion, data);

const updateAppVersionToPlatformHandler = ({ appVersionId, appPlatformId, data }) =>
    axios.put(`${endpoints.appVersion}/${appPlatformId}/${appVersionId}`, data);

const deleteAppVersionToPlatformHandler = ({ appVersionId, appPlatformId }) =>
    axios.delete(`${endpoints.appVersion}/${appPlatformId}/${appVersionId}`);

const AppVersionToPlatformsContainer: React.FC<{}> = ({ children }) => {
    const [limitAndOffset, setLimitAndOffsetState] = useState<LimitAndOffset>({ limit: 10, offset: 0 });
    const [notification, setNotification] = useState<string>('');

    const {
        data,
        error: errorAppVersionToPlatforms,
        refetch: revalidateAppVersionToPlatforms,
    } = useQuery(
        ['appVersion', limitAndOffset],
        () => getQueryFn(`${endpoints.appVersion}?${qs.stringify(limitAndOffset)}`),
        {
            ...config,
        },
    );

    const setLimitsAndOffset = useCallback(
        (limitAndOffset: LimitAndOffset) => {
            setLimitAndOffsetState(limitAndOffset);
            revalidateAppVersionToPlatforms();
        },
        [limitAndOffset],
    );

    const updateAppVersionToPlatform = useMutation(updateAppVersionToPlatformHandler, {
        onSuccess: () => {
            revalidateAppVersionToPlatforms();
            setNotification(message.save);
        },
        onError: () => setNotification(message.error),
    });

    const deleteAppVersionToPlatform = useMutation(deleteAppVersionToPlatformHandler, {
        onSuccess: () => {
            revalidateAppVersionToPlatforms();
            setNotification(message.delete);
        },
        onError: () => setNotification(message.error),
    });

    const createAppVersionToPlatform = useMutation(createAppVersionToPlatformHandler, {
        onSuccess: () => {
            revalidateAppVersionToPlatforms();
            setNotification(message.save);
        },
        onError: () => setNotification(message.error),
    });

    useEffect(() => {
        if (notification) {
            const id = setTimeout(() => setNotification(''), 2000);
            return () => clearTimeout(id);
        }
    }, [notification]);

    return (
        <AppVersionToPlatformsContext.Provider
            value={{
                appVersionToPlatforms: data?.versionToAppPlatforms,
                appVersionToPlatformsCount: data?.count,
                createAppVersionToPlatform,
                updateAppVersionToPlatform,
                deleteAppVersionToPlatform,
                setLimitsAndOffset,
                limitAndOffset,
                hasError: !!errorAppVersionToPlatforms,
                notification,
            }}
        >
            {children}
        </AppVersionToPlatformsContext.Provider>
    );
};
export function errorHandler({ status, statusText }) {
    if (status >= 400) {
        throw new Error(statusText);
    }
}

export default AppVersionToPlatformsContainer;

import { createContext, useCallback, useState } from 'react';
import useSWR from 'swr';
import qs from 'querystring';

const fetcher = (url) => fetch(url).then((r) => r.json());

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
    createAppVersionToPlatform: (data: CreateAppVersionToPlatform) => {};
    updateAppVersionToPlatform: (appVersionId: number, appPlatformId: number, data: UpdateAppVersionToPlatform) => {};
    deleteAppVersionToPlatform: (appVersionId: number, appPlatformId: number) => {};
    setLimitsAndOffset: (limitAndOffset: LimitAndOffset) => void;
    limitAndOffset: LimitAndOffset;
    hasError: boolean;
}

export const AppVersionToPlatformsContext = createContext<AppVersionToPlatformsContextProps>(null!);

const AppVersionToPlatformsContainer: React.FC<{}> = ({ children }) => {
    const [limitAndOffset, setLimitAndOffsetState] = useState<LimitAndOffset>({ limit: 10, offset: 0 });

    const {
        data,
        revalidate: revalidateAppVersionToPlatforms,
        error: errorAppVersionToPlatforms,
    } = useSWR(`/api/app-version/manage?${qs.stringify(limitAndOffset)}`, fetcher);

    const setLimitsAndOffset = useCallback(
        (limitAndOffset: LimitAndOffset) => {
            setLimitAndOffsetState(limitAndOffset);
            revalidateAppVersionToPlatforms();
        },
        [revalidateAppVersionToPlatforms],
    );

    const updateAppVersionToPlatform = useCallback(
        (appVersionId: number, appPlatformId: number, data: UpdateAppVersionToPlatform) =>
            updateAppVersionToPlatformHandler(appVersionId, appPlatformId, data)
                .then(errorHandler)
                .then(() => {
                    revalidateAppVersionToPlatforms();
                }),
        [revalidateAppVersionToPlatforms],
    );

    const deleteAppVersionToPlatform = useCallback(
        (appVersionId: number, appPlatformId: number) =>
            deleteAppVersionToPlatformHandler(appVersionId, appPlatformId)
                .then(errorHandler)
                .then(() => {
                    revalidateAppVersionToPlatforms();
                }),
        [revalidateAppVersionToPlatforms],
    );

    const createAppVersionToPlatform = useCallback(
        (data: CreateAppVersionToPlatform) =>
            createAppVersionToPlatformHandler(data)
                .then(errorHandler)
                .then(() => {
                    revalidateAppVersionToPlatforms();
                }),
        [revalidateAppVersionToPlatforms],
    );

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
function createAppVersionToPlatformHandler(data: CreateAppVersionToPlatform) {
    return fetch(`/api/app-version/manage/`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
function updateAppVersionToPlatformHandler(appVersionId: number, appPlatformId: number, data) {
    return fetch(`/api/app-version/manage/${appPlatformId}/${appVersionId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}
function deleteAppVersionToPlatformHandler(appVersionId: number, appPlatformId: number) {
    return fetch(`/api/app-version/manage/${appPlatformId}/${appVersionId}`, {
        method: 'DELETE',
    });
}
export default AppVersionToPlatformsContainer;

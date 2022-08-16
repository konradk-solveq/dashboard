import { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material/';
import AppVersionToPlatformsContainer, { AppVersionToPlatformsContext } from '../../components/contexts/app-version';
import NotificationBox from '../../components/translation/NotificationBox';
import AppVersionToPlatformTable from '../../components/app-version/AppVersionToPlatformTable';

const AppVersionToPlatform: React.FC<{}> = () => {
    const {
        appVersionToPlatforms,
        appVersionToPlatformsCount,
        createAppVersionToPlatform,
        updateAppVersionToPlatform,
        deleteAppVersionToPlatform,
        setLimitsAndOffset,
        limitAndOffset,
        hasError,
    } = useContext(AppVersionToPlatformsContext);

    const [notification, setNotification] = useState<string>('');
    const [appVersionToPlatformsState, setAppVersionToPlatformsState] = useState([]);
    const [newAppVersionToPlatformState, setNewAppVersionToPlatformState] = useState<{
        appVersionNumber: string;
        appPlatformName: string;
    }>({
        appVersionNumber: '',
        appPlatformName: '',
    });
    const message = {
        save: 'Zapisano',
        delete: 'Usunięto',
        error: 'Wystąpił błąd',
        loading: 'Ładowanie',
        loadingError: 'Wystąpił błąd ładowania danych',
    };
    const setAppVersionToPlatformValue =
        (appVersionId: string, appPlatformId: string) => (field: 'published' | 'forceUpdate', value: string) => {
            setAppVersionToPlatformsState(
                appVersionToPlatformsState.map((appVersionToPlatform) =>
                    appVersionToPlatform.appPlatformId === appPlatformId &&
                    appVersionToPlatform.appVersionId === appVersionId
                        ? { ...appVersionToPlatform, [field]: value }
                        : appVersionToPlatform,
                ),
            );
        };
    const setNewAppVersionToPlatformValue = (field: 'appVersion' | 'appPlatform', value: string) => {
        setNewAppVersionToPlatformState({ ...newAppVersionToPlatformState, [field]: value });
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
    const updateAppVersionToPlatformAndNotify = useNotification(
        ({ appVersionId, appPlatformId, published, forceUpdate }) =>
            updateAppVersionToPlatform.mutate({
                appVersionId,
                appPlatformId,
                data: {
                    published,
                    forceUpdate,
                },
            }),
        message.save,
        message.error,
    );
    const deleteAppVersionToPlatformAndNotify = useNotification(
        ({ appVersionId, appPlatformId }) => deleteAppVersionToPlatform.mutate({ appVersionId, appPlatformId }),
        message.delete,
        message.error,
    );
    const createAppVersionToPlatformAndNotify = useNotification(
        ({ newAppVersionToPlatformState: { appVersionNumber, appPlatformName } }) =>
            createAppVersionToPlatform.mutate({ data: { appVersionNumber, appPlatformName } }),
        message.save,
        message.error,
    );
    useEffect(() => {
        if (notification) {
            const id = setTimeout(() => setNotification(''), 2000);
            return () => clearTimeout(id);
        }
    }, [notification]);

    useEffect(() => {
        if (appVersionToPlatforms && appVersionToPlatforms.length) {
            setAppVersionToPlatformsState([...appVersionToPlatforms]);
        }
    }, [appVersionToPlatforms]);

    if (hasError) return <Box>{message.loadingError}</Box>;
    if (!appVersionToPlatforms)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );

    return (
        <Container>
            <Container sx={{ maxWidth: '1200px', p: '30px', marginX: 'auto' }}>
                {notification && <NotificationBox>{notification}</NotificationBox>}
                <Typography variant="h2" sx={{ textAlign: 'center', m: '20px' }}>
                    Wersja Aplikacji - (v.2)
                </Typography>
                <AppVersionToPlatformTable
                    {...{
                        appVersionToPlatformsState,
                        setAppVersionToPlatformValue,
                        updateAppVersionToPlatformAndNotify,
                        deleteAppVersionToPlatformAndNotify,
                        createAppVersionToPlatformAndNotify,
                        newAppVersionToPlatformState,
                        setNewAppVersionToPlatformValue,
                        limitAndOffset,
                        setLimitsAndOffset,
                        appVersionToPlatformsCount,
                    }}
                ></AppVersionToPlatformTable>
            </Container>
        </Container>
    );
};

const AppVersionToPlatformsPage: NextPage<{}> = (props) => {
    return (
        <AppVersionToPlatformsContainer>
            <AppVersionToPlatform />
        </AppVersionToPlatformsContainer>
    );
};

export default AppVersionToPlatformsPage;

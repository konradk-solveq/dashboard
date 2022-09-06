import { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material/';
import AppVersionToPlatformsContainer, { AppVersionToPlatformsContext } from '../../components/contexts/app-version';
import NotificationBox from '../../components/translation/NotificationBox';
import AppVersionToPlatformTable from '../../components/app-version/AppVersionToPlatformTable';
import { message } from '../../components/contexts/translation/index';

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
        notification,
    } = useContext(AppVersionToPlatformsContext);

    const [appVersionToPlatformsState, setAppVersionToPlatformsState] = useState([]);
    const [newAppVersionToPlatformState, setNewAppVersionToPlatformState] = useState<{
        appVersionNumber: string;
        appPlatformName: string;
    }>({
        appVersionNumber: '',
        appPlatformName: '',
    });

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

    const updateAppVersionToPlatformAndNotify = ({ appVersionId, appPlatformId, published, forceUpdate }) =>
        updateAppVersionToPlatform.mutate({
            appVersionId,
            appPlatformId,
            data: {
                published,
                forceUpdate,
            },
        });

    const deleteAppVersionToPlatformAndNotify = ({ appVersionId, appPlatformId }) =>
        deleteAppVersionToPlatform.mutate({ appVersionId, appPlatformId });

    const createAppVersionToPlatformAndNotify = ({
        newAppVersionToPlatformState: { appVersionNumber, appPlatformName },
    }) => createAppVersionToPlatform.mutate({ data: { appVersionNumber, appPlatformName } });

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
                />
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

import { NextPage } from 'next';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Button, Container, Field, Flex, Grid } from 'theme-ui';
import SettingsContainer, { SettingsContext, SettingsPostData } from '../../components/contexts/settings';

const NewValueField: React.FC<{ name: string; label: string; defaultValue: string; setter: (v: string) => void }> = ({
    children,
    setter,
    ...props
}) => {
    return (
        <Box>
            <Container p={3}>
                <Field bg="white" {...props} onChange={(e) => setter(e.target.value)} />
            </Container>
        </Box>
    );
};

const VersionEditForm: React.FC<{}> = () => {
    const { settings, setKey, hasError } = useContext(SettingsContext);
    const [notification, setNotification] = useState<string>('');
    const [newValue, setNewValue] = useState<SettingsPostData['version']>({ android: '', ios: '' });
    const setPlatformValue = (platform: string) => (v: string) => setNewValue((d) => ({ ...d, [platform]: v }));
    const setKeyAndNotify = useCallback<typeof setKey>(
        async (platform, value) => {
            try {
                await setKey(platform, value);
                setNotification('Zapisano');
            } catch (err) {
                setNotification('Wystąpił błąd');
            }
        },
        [setKey, setNotification],
    );

    useEffect(() => {
        if (notification) {
            const id = setTimeout(() => setNotification(''), 5000);
            return () => clearTimeout(id);
        }
    }, [notification]);

    useEffect(() => {
        if (!settings?.version) {
            return;
        }
        setNewValue({
            android: settings.version.android.value,
            ios: settings.version.ios.value,
        });
    }, [settings]);

    if (hasError) {
        return <>Wystąpił błąd ładowania danych</>;
    }
    if (!settings) {
        return <>Ładowanie</>;
    }

    return (
        <Container>
            {Object.entries(settings.version).map(([platform, { i18n, value }]) => {
                return (
                    <NewValueField
                        name={platform}
                        label={i18n}
                        defaultValue={value}
                        setter={setPlatformValue(platform)}
                    />
                );
            })}
            <Grid gap={2} columns={[2, '20fr 3fr']}>
                <Box sx={{ textAlign: 'center' }}>{notification}</Box>
                <Button onClick={() => setKeyAndNotify('version', newValue)}>Zapisz</Button>
            </Grid>
        </Container>
    );
};

const VersionPage: NextPage<{}> = (props) => {
    return (
        <SettingsContainer>
            <VersionEditForm />
        </SettingsContainer>
    );
};

export default VersionPage;

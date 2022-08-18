import { NextPage } from 'next';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Alert } from '@mui/material/';
import SettingsContainer, { SettingsContext, SettingsPostData } from '../../components/contexts/settings';

const NewValueText: React.FC<{ name: string; label: string; defaultValue: string; setter: (v: string) => void }> = ({
    children,
    setter,
    ...props
}) => {
    return (
        <Box>
            <Container sx={{ p: 3 }}>
                <TextField
                    className="featured-text-field"
                    size="small"
                    color="primary"
                    sx={{ p: 1 }}
                    {...props}
                    onChange={(e) => setter(e.target.value)}
                />
            </Container>
        </Box>
    );
};

const VersionEditForm: React.FC<{}> = () => {
    const { settings, setKey, hasError } = useContext(SettingsContext);
    const [notification, setNotification] = useState<string>('');
    const [newValue, setNewValue] = useState<SettingsPostData['version']>({ android: '', ios: '' });
    const setPlatformValue = (platform: string) => (v: string) => setNewValue((d) => ({ ...d, [platform]: v }));

    useEffect(() => {
        if (setKey.isSuccess) setNotification('Dane zostały zapisane.');
        if (setKey.isError) setNotification('Wystąpił błąd przy zapisywaniu.');
    }, [setKey, setNotification]);

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
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', mt: 2 }}>
            {notification && <Alert severity="info">{notification}</Alert>}

            {Object.entries(settings.version).map(([platform, { i18n, value }]) => {
                return (
                    <NewValueText
                        name={platform}
                        label={i18n}
                        defaultValue={value}
                        setter={setPlatformValue(platform)}
                    />
                );
            })}
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={() => setKey.mutate({ key: 'version', newValue })}
                >
                    Zapisz
                </Button>
            </Container>
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

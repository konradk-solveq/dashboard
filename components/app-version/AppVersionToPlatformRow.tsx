import React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

const AppVersionToPlatformRow: React.FC<{
    published: boolean;
    publishedAt: string | null;
    forceUpdate: boolean;
    appPlatformName: string;
    appVersionNumber: string;
    saveHandler;
    deleteHandler;
    setter: (field, value) => void;
}> = ({
    setter,
    published,
    publishedAt = '',
    forceUpdate,
    appPlatformName = '',
    appVersionNumber = '',
    saveHandler,
    deleteHandler,
}) => {
    return (
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr 3fr 1fr 1fr 100px 100px' }}>
            <Input sx={{ backgroundColor: '#607D8B' }} disabled={true} value={appVersionNumber}></Input>
            <Input sx={{ backgroundColor: '#607D8B' }} disabled={true} value={appPlatformName}></Input>
            <Input sx={{ backgroundColor: '#607D8B' }} disabled={true} value={publishedAt || '-'}></Input>
            <InputLabel sx={{ p: '8px' }}>
                <Checkbox
                    sx={{ backgroundColor: 'white' }}
                    checked={published}
                    onChange={(e) => setter('published', e.target.checked)}
                />
            </InputLabel>
            <InputLabel sx={{ p: '8px' }}>
                <Checkbox
                    sx={{ backgroundColor: 'white' }}
                    checked={forceUpdate}
                    onChange={(e) => setter('forceUpdate', e.target.checked)}
                />
            </InputLabel>
            <Button sx={{ backgroundColor: '#green' }} onClick={saveHandler}>
                Zapisz
            </Button>
            <Button onClick={deleteHandler}>Usuń</Button>
        </Box>
    );
};
export default AppVersionToPlatformRow;

import React from 'react';
import { Input, Typography, Button, Checkbox, Box } from '@mui/material';

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
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 2fr 2fr 2fr 1fr 1fr 1fr', alignItems: 'center' }}>
            <Input
                sx={{ fontSize: '16px' }}
                disableUnderline={true}
                className="input-black"
                disabled={true}
                value={appVersionNumber}
            ></Input>
            <Input
                sx={{ fontSize: '16px' }}
                disableUnderline={true}
                className="input-black"
                disabled={true}
                value={appPlatformName}
            ></Input>
            <Input
                sx={{ fontSize: '16px' }}
                disableUnderline={true}
                className="input-black"
                disabled={true}
                value={publishedAt || '-'}
            ></Input>
            <Typography variant="body1">
                <Checkbox
                    sx={{ backgroundColor: 'white' }}
                    checked={published}
                    onChange={(e) => setter('published', e.target.checked)}
                />
            </Typography>
            <Typography variant="body1">
                <Checkbox
                    sx={{ backgroundColor: 'white' }}
                    checked={forceUpdate}
                    onChange={(e) => setter('forceUpdate', e.target.checked)}
                />
            </Typography>
            <Button variant="contained" color="success" sx={{ maxHeight: '30px' }} onClick={saveHandler}>
                Zapisz
            </Button>
            <Button variant="contained" color="error" sx={{ maxHeight: '30px' }} onClick={deleteHandler}>
                Usuń
            </Button>
        </Box>
    );
};
export default AppVersionToPlatformRow;

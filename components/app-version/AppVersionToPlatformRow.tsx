import React from 'react';
import { Button, Grid, Checkbox, Input, Label } from 'theme-ui';

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
        <Grid gap={2} columns="1fr 1fr 3fr 1fr 1fr 100px 100px" marginBottom="10px">
            <Input bg="lightgrey" disabled={true} value={appVersionNumber}></Input>
            <Input bg="lightgrey" disabled={true} value={appPlatformName}></Input>
            <Input bg="lightgrey" disabled={true} value={publishedAt || '-'}></Input>
            <Label p="8px">
                <Checkbox bg="white" checked={published} onChange={(e) => setter('published', e.target.checked)} />
            </Label>
            <Label p="8px">
                <Checkbox bg="white" checked={forceUpdate} onChange={(e) => setter('forceUpdate', e.target.checked)} />
            </Label>
            <Button bg="green" onClick={saveHandler}>
                Zapisz
            </Button>
            <Button onClick={deleteHandler}>Usuń</Button>
        </Grid>
    );
};
export default AppVersionToPlatformRow;

import React from 'react';
import { Input, Select, Typography, Button, Box, MenuItem } from '@mui/material';
import AppVersionToPlatformRow from './AppVersionToPlatformRow';

const AppVersionToPlatformTable = ({
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
}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', marginBottom: '20px', ml: 'auto', gap: '16px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                    <Typography variant="h5">Limit:</Typography>
                    <Select
                        className="document-select-form"
                        value={limitAndOffset.limit}
                        onChange={(e) => {
                            setLimitsAndOffset({ limit: parseInt(e.target.value), offset: 0 });
                        }}
                    >
                        <MenuItem style={{ fontSize: '14px' }} value={5}>
                            5
                        </MenuItem>
                        <MenuItem style={{ fontSize: '14px' }} value={10}>
                            10
                        </MenuItem>
                        <MenuItem style={{ fontSize: '14px' }} value={20}>
                            20
                        </MenuItem>
                        <MenuItem style={{ fontSize: '14px' }} value={40}>
                            40
                        </MenuItem>
                    </Select>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                    <Typography variant="h5">Strona:</Typography>
                    <Select
                        className="document-select-form"
                        value={limitAndOffset.offset}
                        onChange={(e) => {
                            setLimitsAndOffset({ ...limitAndOffset, offset: parseInt(e.target.value) });
                        }}
                    >
                        {calcPages(limitAndOffset.limit, appVersionToPlatformsCount).map(({ offset, label }, index) => {
                            return (
                                <MenuItem style={{ fontSize: '14px' }} key={index} value={offset}>
                                    {label}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 2fr 2fr 1fr 1fr 1fr',
                    marginBottom: '10px',
                    gap: 2,
                }}
            >
                <Typography variant="h5">Wersja</Typography>
                <Typography variant="h5">Platforma</Typography>
                <Typography variant="h5">Data publikacji</Typography>
                <Typography variant="h5">Opublikowana</Typography>
                <Typography variant="h5">Wymuszenie aktualizacji</Typography>
            </Box>
            {appVersionToPlatformsState.length
                ? appVersionToPlatformsState.map(
                      ({
                          published,
                          publishedAt,
                          forceUpdate,
                          appPlatformName,
                          appVersionNumber,
                          appPlatformId,
                          appVersionId,
                      }) => {
                          return (
                              <AppVersionToPlatformRow
                                  {...{ published, publishedAt, forceUpdate, appPlatformName, appVersionNumber }}
                                  key={appPlatformId + '_' + appVersionId}
                                  setter={setAppVersionToPlatformValue(appVersionId, appPlatformId)}
                                  saveHandler={() =>
                                      updateAppVersionToPlatformAndNotify(
                                          appVersionToPlatformsState.reduce(
                                              (previous, current) =>
                                                  current.appPlatformId === appPlatformId &&
                                                  current.appVersionId === appVersionId
                                                      ? current
                                                      : previous,
                                              {},
                                          ),
                                      )
                                  }
                                  deleteHandler={() => {
                                      deleteAppVersionToPlatformAndNotify(appVersionId, appPlatformId);
                                  }}
                              />
                          );
                      },
                  )
                : ''}
            <Box sx={{ width: '80vw', borderTop: '1px solid #2F4858', m: 4 }} />
            <Box sx={{ display: 'flex', marginBottom: '10px', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5">Wersja</Typography>
                    <Input
                        className="document-input-form document-select-form"
                        disableUnderline={true}
                        sx={{ textAlign: 'center', fontSize: '14px', width: '300px', mt: '12px' }}
                        value={newAppVersionToPlatformState.appVersionNumber}
                        onChange={(e) => setNewAppVersionToPlatformValue('appVersionNumber', e.target.value)}
                    ></Input>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5">Platforma</Typography>
                    <Input
                        className="document-input-form document-select-form"
                        disableUnderline={true}
                        sx={{ textAlign: 'center', fontSize: '14px', width: '300px', mt: '12px' }}
                        value={newAppVersionToPlatformState.appPlatformName}
                        onChange={(e) => setNewAppVersionToPlatformValue('appPlatformName', e.target.value)}
                    ></Input>
                </Box>
            </Box>
            <Box>
                <Button
                    sx={{ textAlign: 'center' }}
                    variant="contained"
                    onClick={() => createAppVersionToPlatformAndNotify(newAppVersionToPlatformState)}
                >
                    Dodaj wersję
                </Button>
            </Box>
        </Box>
    );
};
function calcPages(limit, count): { offset: number; label: string }[] {
    return ((arr) => {
        arr.shift();
        return arr.reverse();
    })(
        (function calcOffsets(limit, count, newCount) {
            return newCount > 0 ? [...calcOffsets(limit, count, newCount - limit), count - newCount] : [count];
        })(limit, count, count).map((offset) => ({
            offset,
            label: [offset + 1, offset + limit > count ? count : offset + limit].join('-'),
        })),
    );
}
export default AppVersionToPlatformTable;

import React, { useEffect, useState } from 'react';
import { Input, Select, Typography, Button, Box, MenuItem, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import AppVersionToPlatformRow from './AppVersionToPlatformRow';
import SortBar from '../bar/SortBar';
import PagesBar from '../bar/PagesBar';

const options = {
    limit: {
        description: 'Limit',
        options: [
            { value: 5, label: 5 },
            { value: 10, label: 10 },
            { value: 20, label: 20 },
            { value: 50, label: 50 },
        ],
    },
};

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
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLimitsAndOffset((prev) => ({ ...prev, offset: (page - 1) * limitAndOffset.limit }));
    }, [page]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box sx={{ alignSelf: 'flex-end' }}>
                <SortBar params={limitAndOffset} setParams={setLimitsAndOffset} options={options} />
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
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="h5">Data publikacji</Typography>
                    <Tooltip
                        sx={{ padding: '3px 0 0 7px' }}
                        title="Dokładna data, kiedy wersja aplikacji na daną platformę została opublikowana"
                    >
                        <InfoIcon color="primary" fontSize="small" />
                    </Tooltip>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="h5">Opublikowana</Typography>
                    <Tooltip
                        sx={{ padding: '3px 0 0 7px' }}
                        title="Po zaznaczeniu oraz zapisaniu publikuje wersję aplikacji"
                    >
                        <InfoIcon color="primary" fontSize="small" />
                    </Tooltip>
                </Box>
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
                                      deleteAppVersionToPlatformAndNotify({ appVersionId, appPlatformId });
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
                    <Select
                        className="document-select-form"
                        sx={{ fontSize: '14px', width: '300px', mt: '12px' }}
                        value={newAppVersionToPlatformState.appPlatformName}
                        onChange={(e) => setNewAppVersionToPlatformValue('appPlatformName', e.target.value)}
                    >
                        <MenuItem sx={{ fontSize: 14 }} value="ios">
                            IOS
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} value="android">
                            Android
                        </MenuItem>
                    </Select>
                </Box>
            </Box>
            <Box>
                <Button
                    sx={{ textAlign: 'center' }}
                    variant="contained"
                    onClick={() => createAppVersionToPlatformAndNotify({ newAppVersionToPlatformState })}
                >
                    Dodaj wersję
                </Button>
            </Box>
            <Box mt={5}>
                <PagesBar
                    pages={calcPages(limitAndOffset.limit, appVersionToPlatformsCount)}
                    page={calcPages(limitAndOffset.limit, appVersionToPlatformsCount)[page - 1].offset / 10 + 1}
                    setPage={setPage}
                />
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

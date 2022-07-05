import React from 'react';
import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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
        <>
            <Box sx={{ display: 'grid', columns: '1fr 20px 60px 30px 100px', marginBottom: '20px' }}>
                <p></p>
                <InputLabel sx={{ pt: '10px' }}>limit:</InputLabel>
                <Select
                    value={limitAndOffset.limit}
                    onChange={(e) => {
                        setLimitsAndOffset({ limit: parseInt(e.target.value), offset: 0 });
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={40}>40</option>
                </Select>
                <InputLabel sx={{ pt: '10px' }}>strona:</InputLabel>
                <Select
                    value={limitAndOffset.offset}
                    onChange={(e) => {
                        setLimitsAndOffset({ ...limitAndOffset, offset: parseInt(e.target.value) });
                    }}
                >
                    {calcPages(limitAndOffset.limit, appVersionToPlatformsCount).map(({ offset, label }, index) => {
                        return (
                            <option key={index} value={offset}>
                                {label}
                            </option>
                        );
                    })}
                </Select>
            </Box>
            <Box sx={{ display: 'grid', columns: '1fr 1fr 3fr 1fr 1fr 100px 100px', marginBottom: '10px', gap: 2 }}>
                <InputLabel>Wersja</InputLabel>
                <InputLabel>Platforma</InputLabel>
                <InputLabel>Data publikacji</InputLabel>
                <InputLabel>Opublikowana</InputLabel>
                <InputLabel>Wymuszenie aktualizacji</InputLabel>
                <InputLabel></InputLabel>
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
            <Divider sx={{ marginY: '40px' }}></Divider>
            <Box sx={{ display: 'grid', columns: '1fr 150px 150px 1fr', marginBottom: '10px', gap: 2 }}>
                <Box></Box>
                <InputLabel>Wersja</InputLabel>
                <InputLabel>Platforma</InputLabel>
                <Box></Box>
            </Box>
            <Box sx={{ display: 'grid', columns: '1fr 150px 150px 1fr', marginBottom: '10px', gap: 2 }}>
                <Box></Box>
                <Input
                    sx={{ backgroundColor: 'white' }}
                    value={newAppVersionToPlatformState.appVersionNumber}
                    onChange={(e) => setNewAppVersionToPlatformValue('appVersionNumber', e.target.value)}
                ></Input>
                <Input
                    sx={{ backgroundColor: 'white' }}
                    value={newAppVersionToPlatformState.appPlatformName}
                    onChange={(e) => setNewAppVersionToPlatformValue('appPlatformName', e.target.value)}
                ></Input>
                <Box></Box>
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    columns: '4fr 200px 4fr',
                    marginBottom: '10px',
                    gap: 2,
                }}
            >
                <Box></Box>
                <Button
                    sx={{ textAlign: 'center' }}
                    onClick={() => createAppVersionToPlatformAndNotify(newAppVersionToPlatformState)}
                >
                    Dodaj wersję
                </Button>
            </Box>
        </>
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

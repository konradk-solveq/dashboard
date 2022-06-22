import React from 'react';
import { Box, Button, Grid, Label, Divider, Input, Select } from 'theme-ui';
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
    appVersionToPlatformsCount
}) => {
    return (
        <>
            <Grid columns="1fr 20px 60px 30px 100px" marginBottom="20px">
                <p></p>
                <Label pt="10px">limit:</Label>
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
                <Label pt="10px">strona:</Label>
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
            </Grid>
            <Grid gap={2} columns="1fr 1fr 3fr 1fr 1fr 100px 100px" marginBottom="10px">
                <Label>Wersja</Label>
                <Label>Platforma</Label>
                <Label>Data publikacji</Label>
                <Label>Opublikowana</Label>
                <Label>Wymuszenie aktualizacji</Label>
                <Label></Label>
            </Grid>
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
            <Divider marginY="40px"></Divider>
            <Grid gap={2} columns="1fr 150px 150px 1fr" marginBottom="10px">
                <Box></Box>
                <Label>Wersja</Label>
                <Label>Platforma</Label>
                <Box></Box>
            </Grid>
            <Grid gap={2} columns="1fr 150px 150px 1fr" marginBottom="10px">
                <Box></Box>
                <Input
                    bg="white"
                    value={newAppVersionToPlatformState.appVersionNumber}
                    onChange={(e) => setNewAppVersionToPlatformValue('appVersionNumber', e.target.value)}
                ></Input>
                <Input
                    bg="white"
                    value={newAppVersionToPlatformState.appPlatformName}
                    onChange={(e) => setNewAppVersionToPlatformValue('appPlatformName', e.target.value)}
                ></Input>
                <Box></Box>
            </Grid>
            <Grid gap={2} columns="4fr 200px 4fr">
                <Box></Box>
                <Button
                    bg="default"
                    sx={{ textAlign: 'center' }}
                    onClick={() => createAppVersionToPlatformAndNotify(newAppVersionToPlatformState)}
                >
                    Dodaj wersję
                </Button>
            </Grid>
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

import React from 'react';
import { Container, Typography, Select, Box, MenuItem } from '@mui/material/';
import TranslationRow from './TranslationRow';

const TranslationTable = ({
    limitAndOffset,
    setLimitsAndOffset,
    uiTranslationCount,
    uiTranslationsState,
    deleteUiTranslationAndNotify,
}) => {
    return (
        <>
            <Container sx={{ display: 'flex' }}>
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
                            {calcPages(limitAndOffset.limit, uiTranslationCount).map(({ offset, label }, index) => {
                                return (
                                    <MenuItem style={{ fontSize: '14px' }} key={index} value={offset}>
                                        {label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Box>
                </Box>
            </Container>
            <Container sx={{ display: 'grid', gridTemplateColumns: '0.25fr 0.5fr 2fr 3fr 1fr', mb: '10px', gap: 2 }}>
                <Typography variant="h5">Kod</Typography>
                <Typography variant="h5">Wersja</Typography>
                <Typography variant="h5">Suma kontrolna</Typography>
                <Typography variant="h5">Tłumaczenie</Typography>
                <Typography variant="h5"></Typography>
            </Container>
            {uiTranslationsState.length &&
                uiTranslationsState.map(({ controlSum, id, version, code, translation }) => (
                    <TranslationRow
                        controlSum={controlSum}
                        deleteHandler={() => deleteUiTranslationAndNotify(id)}
                        code={code}
                        version={version}
                        key={id}
                        translation={JSON.stringify(translation)}
                    ></TranslationRow>
                ))}
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
export default TranslationTable;

import React from 'react';
import { Container, InputLabel, Select } from '@mui/material/';
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
            <Container sx={{ display: 'grid', gridTemplateColumns: '1fr 20px 60px 30px 100px', mb: '20px' }}>
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
                    {calcPages(limitAndOffset.limit, uiTranslationCount).map(({ offset, label }, index) => {
                        return (
                            <option key={index} value={offset}>
                                {label}
                            </option>
                        );
                    })}
                </Select>
            </Container>
            <Container sx={{ display: 'grid', gridTemplateColumns: '50px 60px 230px 2fr 100px', mb: '10px' }}>
                <InputLabel>Kod</InputLabel>
                <InputLabel>Wersja</InputLabel>
                <InputLabel>Suma kontrolna</InputLabel>
                <InputLabel>Tłumaczenie</InputLabel>
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

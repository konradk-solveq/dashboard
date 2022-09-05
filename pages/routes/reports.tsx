import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Tooltip } from '@mui/material/';
import { useQuery } from '@tanstack/react-query';
import InfoIcon from '@mui/icons-material/Info';
import getQueryFn from '../../components/utils/getQueryFn';
import endpoints from '../../components/utils/apiEndpoints';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { compareAsc, compareDesc, addDays, subDays } from 'date-fns';
import config from '../../helpers/queryConfig';
import ReportModal from '../../componentsSSP/routes/reports/Modal';

export default function Page({}) {
    const latestReport = subDays(new Date(), 1);
    const [startDate, setStartDate] = useState<Date>(latestReport);
    const [endDate, setEndDate] = useState<Date>();
    const [chosenDate, setChosenDate] = useState<string>();
    const [filteredDates, setFilteredDates] = useState<Array<string>>();
    const [open, setOpen] = useState<boolean>(false);

    const reportRange = addDays(startDate, 100);
    const maxEndDate = compareAsc(reportRange, latestReport) === 1 ? latestReport : reportRange;

    const { data: dates, error: errorDates } = useQuery(['reportDates'], () => getQueryFn(endpoints.reports), {
        ...config,
    });

    const date = dates ? dates[0] : undefined;

    const handleClose = () => setOpen(false);

    useEffect(() => setEndDate(maxEndDate), [startDate]);

    useEffect(() => {
        setFilteredDates(
            dates?.filter(
                (date) =>
                    compareAsc(new Date(date), subDays(startDate, 1)) === 1 &&
                    compareDesc(new Date(date), endDate) === 1,
            ),
        );
    }, [endDate, startDate]);

    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ mb: '16px', position: 'relative' }}>Dzienne raporty</Typography>
                <Tooltip
                    sx={{ position: 'absolute', pt: '50px' }}
                    title="Zaznacz daty raportów które cię interesują, max 100 dni, i kliknij na przycisk aby zobaczyć podgląd"
                >
                    <InfoIcon color="primary" fontSize="small" />
                </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                        m: '20px 0 40px',
                    }}
                >
                    <Typography variant="h4">Od</Typography>
                    <Box>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                                compareAsc(endDate, reportRange) && setEndDate(maxEndDate);
                            }}
                            selectsStart
                            dateFormat="dd/MM/yyyy"
                            startDate={startDate}
                            endDate={endDate}
                            minDate={date ? new Date(date) : undefined}
                            maxDate={latestReport}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                        m: '20px 0 40px',
                    }}
                >
                    <Typography variant="h4">Do</Typography>
                    <Box>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            dateFormat="dd/MM/yyyy"
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            maxDate={maxEndDate}
                        />
                    </Box>
                </Box>
            </Box>
            {filteredDates && (
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    {filteredDates?.map((date) => (
                        <Button
                            variant="contained"
                            key={date}
                            onClick={() => {
                                setOpen((prev) => !prev);
                                setChosenDate(date);
                            }}
                        >
                            {' ' + date}
                        </Button>
                    ))}
                </Box>
            )}
            {!!chosenDate && (
                <ReportModal
                    open={open}
                    handleClose={handleClose}
                    chosenDate={chosenDate}
                    setChosenDate={setChosenDate}
                    startDate={startDate}
                    maxEndDate={maxEndDate}
                />
            )}
        </Container>
    );
}

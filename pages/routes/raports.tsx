import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material/';
import fetcher from '../../helpers/fetcher';
import useSWR from 'swr';

export default function Page({}) {
    enum ReportType {
        NUMBER_OF_ROUTES = 'NumberOfRoutes',
        NUMBER_OF_ACCOUNTS = 'NumberOfAccounts',
        NUMBER_OF_ROUTES_PUBLISHED = 'NumberOfRoutesPublished',
    }
    const names = {
        [ReportType.NUMBER_OF_ROUTES]: 'Liczba wszystkich tras',
        [ReportType.NUMBER_OF_ROUTES_PUBLISHED]: 'Lista tras opublikowanych',
        [ReportType.NUMBER_OF_ACCOUNTS]: 'Liczba kont',
    };

    const { data: dates, error: errorDates } = useSWR<any>('/api/report', fetcher);
    const date = dates ? dates[0] : undefined;
    const [chosenDate, setChosenDate] = useState(date);
    const { data: reports, error: reportsError } = useSWR<any>(`/api/report/${chosenDate}`, fetcher);
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                mx: 'auto',
            }}
        >
            <Typography sx={{ textAlign: 'center', mb: '16px' }}>Dzienne raporty</Typography>
            <h4>
                {dates?.map((date) => (
                    <button key={date} onClick={() => setChosenDate(date)}>
                        {' ' + date}
                    </button>
                ))}
            </h4>
            {chosenDate ? (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography>{'Raport z dnia: ' + chosenDate}</Typography>
                    <Box sx={{ ml: 5 }}>
                        <ol>
                            {reports && reports.length
                                ? reports.map((report) => (
                                      <li key={report.key}>
                                          {names[report.type]}: <strong>{report.value}</strong>
                                      </li>
                                  ))
                                : ''}
                        </ol>{' '}
                    </Box>
                </Box>
            ) : (
                ''
            )}
        </Container>
    );
}

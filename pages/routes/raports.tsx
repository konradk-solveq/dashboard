import React, { useState } from 'react';
import { Flex } from 'theme-ui';
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
        <Flex
            sx={{
                flexDirection: 'column',
                mx: 'auto',
            }}
        >
            <h1 style={{ textAlign: 'center' }}>Dzienne raporty</h1>
            <h4>
                {dates?.map((date) => (
                    <button key={date} onClick={() => setChosenDate(date)}>
                        {' ' + date}
                    </button>
                ))}
            </h4>
            {chosenDate ? (
                <div>
                    <h2>{'Raport z dnia: ' + chosenDate}</h2>
                    <ol>
                        {reports && reports.length
                            ? reports.map((report) => (
                                  <li key={report.key}>
                                      {names[report.type]}: <strong>{report.value}</strong>
                                  </li>
                              ))
                            : ''}
                    </ol>{' '}
                </div>
            ) : (
                ''
            )}
        </Flex>
    );
}

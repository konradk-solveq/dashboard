import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { Container, Typography } from '@mui/material/';

const ChartHoursOfDay: React.FC<{ data: any; day: number; id: string; title: string; page: any }> = ({
    data,
    day,
    id,
    title,
    page,
}) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!data) return;

        let tempData = [];

        for (let d of data) {
            const date = new Date(d.createdAt);
            const itemDay = date.getDay();
            if (itemDay != day) continue;

            const hour = date.getHours();

            const broken = typeof d.images.find(({ type }) => type === 'map') == 'undefined';

            let item = tempData.find((e) => {
                const eHour = e[0];
                if (eHour == hour) return e;
            });

            if (item) {
                item[1] += 1;
                if (d.isPublic) item[2] += 1;
                if (broken) item[3] += 1;
            } else {
                const newItem = [hour, 1, d.isPublic ? 1 : 0, broken ? 1 : 0];
                tempData.push(newItem);
            }
        }

        tempData.sort((a, b) => {
            let aDate = a[0];
            let bDate = b[0];
            if (aDate > bDate) return 1;
            if (aDate < bDate) return -1;
        });

        tempData.unshift([{ label: 'dni' }, 'Wszystkich', 'Publicznych', 'Uszkodzonych']);

        setChartData(tempData);
        // console.table(tempData);
    }, [data, page]);

    return (
        <>
            <Container sx={{ display: 'flex', width: '300px', justifyContent: 'space-around', height: 0 }}>
                <Typography
                    sx={{ fontFamily: 'din-b', fontSize: '18px', position: 'relative', top: '10px', zIndex: 100 }}
                >
                    {title}
                </Typography>
            </Container>

            {chartData && (
                <Chart
                    width={'300px'}
                    height={'300px'}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={chartData}
                    options={{
                        titlePosition: 'top',
                        width: 300,
                        height: 300,
                        chartArea: { width: '85%', height: '75%' },
                        legend: { position: 'bottom' },
                    }}
                    rootProps={{ 'data-testid': id }}
                />
            )}
        </>
    );
};

export default ChartHoursOfDay;

import { Box } from '@theme-ui/components';
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";


const LineChartDay: React.FC<{ data: any, title: string, page: any }> = ({
    data, title, page
}) => {

    const [chartData, setChartData] = useState(null)
    const WEEK_DAY = ['niedziela', 'poniedziałęk', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];

    useEffect(() => {
        if (!data) return;

        let tempData = [];

        for (let d of WEEK_DAY) {
            const newItem = [
                d, 0, 0, 0
            ]
            tempData.push(newItem)
        }

        for (let d of data) {
            const date = new Date(d.createdAt)
            const day = WEEK_DAY[date.getDay()];

            const broken = typeof d.images.find(({ type }) => type === 'map') == 'undefined';

            let item = tempData.find(e => {
                const eDay = e[0];
                if (
                    eDay == day
                ) return e
            });


            if (item) {
                item[1] += 1;
                if (d.isPublic) item[2] += 1;
                if (broken) item[3] += 1;

            }
        }

        tempData.unshift([
            { label: 'dni' },
            'Wszystkich',
            'Publicznych',
            'Uszkodzonych',
        ])

        setChartData(tempData);
        // console.table(tempData)
    }, [data, page])

    return (<Box sx={{ maxWidth: '700px' }}>
        {chartData && <Chart
            width={'700px'}
            height={'500px'}
            chartType="Line"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
                chart: {
                    title: title,
                },
                width: 700,
                height: 500,
            }}
        />
        }
    </Box>);
};

export default LineChartDay;


import { Box } from '@theme-ui/components';
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";


const ChartHour: React.FC<{ data: any, title: string, page: any }> = ({
    data, title, page
}) => {

    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        if (!data) return;

        let tempData = [];

        for (let d of data) {
            const date = new Date(d.createdAt)
            const hour = date.getHours();

            const broken = typeof d.images.find(({ type }) => type === 'map') == 'undefined';

            let item = tempData.find(e => {
                const eHour = e[0];
                if (
                    eHour == hour
                ) return e
            });

            if (item) {
                item[1] += 1;
                if (d.isPublic) item[2] += 1;
                if (broken) item[3] += 1;
            } else {
                const newItem = [
                    hour,
                    1,
                    d.isPublic ? 1 : 0,
                    broken ? 1 : 0,
                ]
                tempData.push(newItem)
            }
        }

        tempData.sort((a, b) => {
            let aDate = a[0];
            let bDate = b[0];
            if (aDate > bDate) return 1;
            if (aDate < bDate) return -1;
        });

        tempData.unshift([
            { label: 'dni' },
            'Wszystkich',
            'Publicznych',
            'Uszkodzonych',
        ])

        setChartData(tempData);
        // console.table(tempData);
    }, [data, page])

    return (<>
        {chartData && <Chart
            width={'500px'}
            height={'500px'}
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
                chart: {
                    title: title,
                },
                width: 500,
                height: 500,
                'chartArea': {'width': '85%', 'height': '75%'},
                'legend': {'position': 'bottom'}
 
            }}
            rootProps={{ 'data-testid': '4' }}
        />
        }
    </>);
};

export default ChartHour;


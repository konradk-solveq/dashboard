import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { Flex, Text } from 'theme-ui';

// const now = new Date(Date.now());

const ChartDate: React.FC<{ data: any, title: string, page: any }> = ({
    data, title, page
}) => {

    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        if (!data) return;

        let tempData = [];

        for (let d of data) {
            const date = new Date(d.createdAt);
            // if (date > now) continue;

            const day = new Date(date.getFullYear(), date.getMonth(), date.getDate())
            const broken = typeof d.images.find(({ type }) => type === 'map') == 'undefined';

            let item = tempData.find(e => {
                const eDay = new Date(e[0]);
                if (
                    eDay.getFullYear() == day.getFullYear() &&
                    eDay.getMonth() == day.getMonth() &&
                    eDay.getDate() == day.getDate()
                ) return e
            });


            if (item) {
                item[1] += 1;
                if (d.isPublic) item[2] += 1;
                if (broken) item[3] += 1;

            } else {
                const newItem = [
                    day,
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
            'dni',
            'Wszystkich',
            'Publicznych',
            'Uszkodzonych',
        ])

        setChartData(tempData);
        // console.table(tempData)
    }, [data, page])

    return (<>
        <Flex sx={{ width: '1200px', justifyContent: 'space-around', height: 0 }}>
            <Text sx={{ fontFamily: 'din-b', fontSize: '18px', position: 'relative', top: '25px', zIndex: 100 }}>{title}</Text>
        </Flex>
        {chartData && <Chart
            width={'100%'}
            height={'500px'}
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
                width: 1200,
                height: 500,
                'chartArea': { 'width': '85%', 'height': '75%' },
                'legend': { 'position': 'bottom' }
            }}
            rootProps={{ 'data-testid': '2' }}
        />
        }
    </>);
};

export default ChartDate;
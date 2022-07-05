import { Box } from '@mui/material/';
import * as React from 'react';
import { Chart } from 'react-google-charts';

const ChartTypes3D: React.FC<{ data: any; title: string }> = ({ data, title }) => {
    return (
        <Box sx={{ maxWidth: '500px' }}>
            <Chart
                width={'500px'}
                height={'500px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    title: title,
                    is3D: true,
                    slices: {
                        0: { color: '#68B028' },
                        1: { color: '#69b3a2' },
                        3: { color: '#cf0f36' },
                    },
                    width: 500,
                    height: 350,
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </Box>
    );
};

export default ChartTypes3D;

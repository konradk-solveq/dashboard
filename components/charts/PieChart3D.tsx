import * as React from "react";
import { Chart } from "react-google-charts";


const PieChart3D: React.FC<{ data: any, title: string }> = ({
    data, title
}) => {
    return (
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
                title: title,
                is3D: true,
            }}
            rootProps={{ 'data-testid': '2' }}
        />
    );
};

export default PieChart3D;
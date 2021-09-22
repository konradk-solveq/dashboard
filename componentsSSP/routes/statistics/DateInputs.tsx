import { Box } from '@theme-ui/components';
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";


const ChartDay: React.FC<{ data: any, firstDate: string, lastDate: any }> = ({
    data, firstDate, lastDate
}) => {


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));


    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<ExampleCustomInput />}
        />
    );
};

export default ChartDay;


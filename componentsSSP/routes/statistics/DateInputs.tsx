import { Box, Container, Typography, Button } from '@mui/material/';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Btn: React.FC<{ title: string; onclick: () => void }> = ({ title, onclick }) => {
    return (
        <Button variant="contained" type="button" sx={{ fontSize: '12px', mr: '8px' }} onClick={onclick}>
            {title}
        </Button>
    );
};

const Title: React.FC<{ title: string }> = ({ title }) => {
    return <Typography sx={{ fontSize: '16px' }}>{title}</Typography>;
};

interface Props {
    startDate: Date;
    setStartDate: (e) => void;
    endDate: Date;
    setEndDate: (e) => void;
    veryStartDate: Date;
    veryEndDate: Date;
}

const DateInputs: React.FC<Props> = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    veryStartDate,
    veryEndDate,
}: Props) => {
    const [localStartDate, setLocalStartDate] = useState(startDate);
    const [localEndDate, setLocalEndDate] = useState(endDate);

    useEffect(() => {
        setLocalStartDate(startDate);
    }, [startDate]);
    useEffect(() => {
        setLocalEndDate(endDate);
    }, [endDate]);

    return (
        <Container sx={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
            <Box sx={{ width: '180px' }}>
                <Title title={'Data początkowa'} />

                <Box sx={{ mt: '8px', mb: '8px' }}>
                    <Btn title={'pierwsza'} onclick={() => setStartDate(veryStartDate)} />
                </Box>

                <DatePicker
                    dateFormat="yyyy/MM/dd"
                    closeOnScroll={(e) => e.target === document}
                    selected={localStartDate}
                    onChange={(date) => setStartDate(date)}
                />
            </Box>

            <Box sx={{ width: '180px' }}>
                <Title title={'Data końcowa'} />

                <Box sx={{ mt: '8px', mb: '8px' }}>
                    <Btn title={'teraz'} onclick={() => setEndDate(new Date())} />
                    <Btn title={'ostatnia'} onclick={() => setEndDate(veryEndDate)} />
                </Box>

                <DatePicker
                    dateFormat="yyyy/MM/dd"
                    closeOnScroll={(e) => e.target === document}
                    selected={localEndDate}
                    onChange={(date) => setEndDate(date)}
                />
            </Box>
        </Container>
    );
};

export default DateInputs;

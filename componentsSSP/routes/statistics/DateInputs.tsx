import { Box, Flex, Text, Button } from '@theme-ui/components';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    startDate: Date,
    setStartDate: (e) => void;
    endDate: Date;
    setEndDate: (e) => void;
    veryStartDate: Date;
    veryEndDate: Date;
}

const Btn: React.FC<{ title: string, onclick: Function }> = ({
    title, onclick
}: Props) => {
    return (<Button
        className='sys-btn'
        type='button'
        sx={{
            fontFamily: 'din-r', fontSize: '16px',
            py: '0px',
            px: '10px',
            height: '25px',
            mr: '5px',
            bg: 'primary',
            minWidth: '62px',
        }}
        onClick={onclick}
    >{title}</Button>)
}

const Title: React.FC<{ title: string }> = ({ title }: Props) => {
    return (<Text sx={{ fontFamily: 'din-b', fontSize: '16px' }}>{title}</Text>)
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


    useEffect(() => { setLocalStartDate(startDate) }, [startDate])
    useEffect(() => { setLocalEndDate(endDate) }, [endDate])

    return (
        <Flex sx={{ width: '100%', justifyContent: 'flex-start' }}>
            <Box sx={{ width: '180px' }}>
                <Title title={'data początkowa'} />

                <Box>
                    <Btn
                        title={'pierwsza'}
                        onclick={() => setStartDate(veryStartDate)}
                    />
                </Box>

                <DatePicker
                    dateFormat="yyyy/MM/dd"
                    closeOnScroll={(e) => e.target === document}
                    selected={localStartDate}
                    onChange={(date) => setStartDate(date)}
                />
            </Box>

            <Box sx={{ width: '180px' }}>
                <Title title={'data końcowa'} />

                <Box>
                    <Btn
                        title={'teraz'}
                        onclick={() => setEndDate(new Date())}
                    />
                    <Btn
                        title={'ostatnia'}
                        onclick={() => setEndDate(veryEndDate)}
                    />
                </Box>

                <DatePicker
                    dateFormat="yyyy/MM/dd"
                    closeOnScroll={(e) => e.target === document}
                    selected={localEndDate}
                    onChange={(date) => setEndDate(date)}
                />
            </Box>
        </Flex>
    );
};

export default DateInputs;


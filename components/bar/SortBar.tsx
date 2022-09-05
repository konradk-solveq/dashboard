import { Box, Button, Divider, Typography } from '@mui/material';
import React, { SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

type Params = { [name: string]: string | number };

type Options = {
    [name: string]: {
        description?: string;
        options: {
            value: string | number;
            label: string | number;
        }[];
    };
};

type FormData = {
    [name: string]: {
        value: string | number;
        label: string | number;
    };
};

interface IProps {
    params: Params;
    setParams: React.Dispatch<SetStateAction<Params>>;
    options: Options;
}

const SortBar: React.FC<IProps> = ({ params, setParams, options }) => {
    const defaultValues = Object.entries(options).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value.options.find((e) => e.value === params[key]) }),
        {},
    );

    const { handleSubmit, control } = useForm({
        defaultValues: defaultValues,
    });

    const onSubmit: any = (data: FormData) => {
        let paramsToAssign = params;
        Object.keys(options).forEach((key) => Object.assign(paramsToAssign, { [key]: data[key].value }));
        setParams((prev) => ({ ...prev, ...paramsToAssign }));
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                width: 'auto',
                m: '20px',
            }}
        >
            <Divider />
            <Box
                sx={{
                    m: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '1em',
                        gap: '20px',
                    }}
                >
                    {Object.keys(options).map((key) => (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {options[key].description && (
                                <Typography variant="h5">{options[key].description}: &nbsp;</Typography>
                            )}
                            <Controller
                                key={key}
                                control={control}
                                rules={{ required: true }}
                                name={key as never}
                                render={({ field }) => (
                                    <Select
                                        options={options[key].options as any}
                                        placeholder="Wybierz..."
                                        instanceId={key}
                                        {...field}
                                    />
                                )}
                            />
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ textAlign: 'center', fontSize: '1em', cursor: 'pointer', ml: 'auto' }}
                    >
                        Sortuj
                    </Button>
                </Box>
            </Box>
            <Divider />
        </Box>
    );
};

export default SortBar;

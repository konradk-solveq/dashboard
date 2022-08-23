import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Divider, Box } from '@mui/material/';
import Select from 'react-select';
import { ManagePublicationsContext } from '../../contexts/publication/ManagePublication';

type SelectOptions = {
    value: string;
    label: string;
};
interface FormValues {
    type: SelectOptions;
    order: SelectOptions;
    orderBy: SelectOptions;
    limit: { value: number; label: string };
}

const typeOptions = [
    { value: '', label: 'Wszystkie' },
    { value: 'terms', label: 'Regulamin' },
    { value: 'policy', label: 'Polityka Prywatności' },
];

const orderOptions = [
    { value: 'DESC', label: 'Malejąco' },
    { value: 'ASC', label: 'Rosnąco' },
];

const orderByOptions = [
    { value: 'showDate', label: 'Data Pokazania' },
    { value: 'publicationDate', label: 'Data Publikacji' },
    { value: 'id', label: 'ID' },
    { value: 'type', label: 'Typ' },
];

const limitOptions = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
];

const Sort: React.FC = () => {
    const { setParams } = useContext(ManagePublicationsContext);

    const { handleSubmit, control } = useForm<FormValues>({
        shouldUnregister: true,
        defaultValues: {
            type: typeOptions[0],
            order: orderOptions[0],
            orderBy: orderByOptions[0],
            limit: limitOptions[0],
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
        setParams((prev) => ({
            ...prev,
            order: data.order.value,
            orderBy: data.orderBy.value,
            type: data.type.value,
            limit: data.limit.value,
        }));
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
            }}
        >
            <Divider />
            <Box
                sx={{
                    m: '20px',
                    mb: '20px',
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
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="type"
                        render={({ field }) => (
                            <Select options={typeOptions} placeholder="Wybierz..." instanceId="type" {...field} />
                        )}
                    />
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="order"
                        render={({ field }) => (
                            <Select options={orderOptions} placeholder="Wybierz..." instanceId="order" {...field} />
                        )}
                    />
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="orderBy"
                        render={({ field }) => (
                            <Select options={orderByOptions} placeholder="Wybierz..." instanceId="orderBy" {...field} />
                        )}
                    />
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="limit"
                        render={({ field }) => (
                            <Select options={limitOptions} placeholder="Wybierz..." instanceId="limit" {...field} />
                        )}
                    />
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

export default Sort;

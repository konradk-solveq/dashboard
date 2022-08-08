import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Divider, Box } from '@mui/material/';
import Select from 'react-select';
import { sortingTypesDisplay, orderByOptions, orderOptions, displaySortLabel } from './NotificationsUtils';
import { NotificationsContext } from '../contexts/notifications';
import { LabelWithUndefined } from '../typings/Notifications';

type FormValues = {
    type: LabelWithUndefined;
    order: LabelWithUndefined;
    orderBy: LabelWithUndefined;
};

const NotificationsSortBar: React.FC = () => {
    const { sortParams, setSortParams } = useContext(NotificationsContext);

    const { handleSubmit, control } = useForm<FormValues>({
        shouldUnregister: true,
        defaultValues: {
            type: displaySortLabel(sortingTypesDisplay, sortParams.type),
            order: displaySortLabel(orderOptions, sortParams.order),
            orderBy: displaySortLabel(orderByOptions, sortParams.orderBy),
        },
    });

    const onSubmit = (data: FormValues) => {
        setSortParams((prev) => ({
            ...prev,
            order: data.order.value,
            orderBy: data.orderBy.value,
            type: data.type.value,
        }));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                            <Select
                                options={sortingTypesDisplay}
                                placeholder="Wybierz..."
                                instanceId="type"
                                {...field}
                            />
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
        </form>
    );
};

export default NotificationsSortBar;

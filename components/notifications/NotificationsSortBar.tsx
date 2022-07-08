import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Divider, Box } from '@mui/material/';
import Select from 'react-select';
import { sortingTypesDisplay, sortingByOrder, sortingByOrderType, defaultFormValues } from './NotificationsUtils';
import { NotificationsContext } from './NotificationsApi';

const NotificationsSortBar: React.FC<{}> = ({}) => {
    const { retrieveNotifications } = useContext(NotificationsContext);
    const { handleSubmit, control } = useForm({ shouldUnregister: true, defaultValues: defaultFormValues });

    const onSubmit = (data) => {
        let url = `/api/notifications/manage?page=1&limit=10`;
        retrieveNotifications(url, data.sortOrder.value, data.sortTypeOrder.value, data.type.value);
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
                        name="sortOrder"
                        render={({ field }) => (
                            <Select
                                options={sortingByOrder}
                                placeholder="Wybierz..."
                                instanceId="sortOrder"
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="sortTypeOrder"
                        render={({ field }) => (
                            <Select
                                options={sortingByOrderType}
                                placeholder="Wybierz..."
                                instanceId="sortTypeOrder"
                                {...field}
                            />
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

import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Container, Divider } from 'theme-ui';
import Select from 'react-select';
import { sortingTypesDisplay, sortingByOrder, sortingByOrderType, defaultFormValues } from './NotificationsUtils';
import { NotificationsContext } from './NotificationsApi';
import { LabelTypes } from '../typings/Notifications';

interface IProps {
    sortingTypesDisplay: LabelTypes[];
    sortingByOrder: LabelTypes[];
    sortingByOrderType: LabelTypes[];
}

const NotificationsSortBar: React.FC<IProps> = ({}) => {
    const { retrieveNotifications } = useContext(NotificationsContext);
    const { handleSubmit, control } = useForm({ shouldUnregister: true, defaultValues: defaultFormValues });

    const onSubmit = (data) => {
        let url = `/api/notifications/manage?page=1&limit=10`;
        retrieveNotifications(url, data.sortOrder.value, data.sortTypeOrder.value, data.type.value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Divider />
            <Container
                sx={{
                    m: '20px',
                    mb: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                }}
            >
                <Container>
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
                </Container>
                <Container
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
                </Container>
                <Container sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Button
                        type="submit"
                        sx={{ textAlign: 'center', fontSize: '1em', cursor: 'pointer', ml: 'auto', mr: '40px' }}
                    >
                        Sortuj
                    </Button>
                </Container>
            </Container>
            <Divider />
        </form>
    );
};

export default NotificationsSortBar;

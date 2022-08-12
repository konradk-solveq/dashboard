import React, { useContext, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button, Typography, Alert, Box, IconButton } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import notificationGroupStyle from '../../styles/NotificationsGroupForm.module.css';
import { notificationObject } from './NotificationsUtils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LabelTypes, SingleNotification, GroupFormValues } from '../typings/Notifications';
import { NotificationsContext } from '../contexts/notifications';

interface IProps {
    langOptions: LabelTypes[];
    typeOptions: LabelTypes[];
    notifications: SingleNotification[];
    notificationAggregate: GroupFormValues;
}

const NotificationsGroupForm: React.FC<IProps> = ({
    typeOptions,
    langOptions,
    notifications,
    notificationAggregate,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        getValues,
    } = useForm<GroupFormValues>({
        shouldUnregister: true,
        defaultValues: notificationAggregate,
    });
    const [alert, setAlert] = useState(false);

    const { putNotificationAggregate, postNotificationAggregate, exitModal } = useContext(NotificationsContext);

    const currentDate = new Date();

    const onSubmit: SubmitHandler<GroupFormValues> = (data: GroupFormValues) => {
        const mainNotification = notifications.find((el) => el.language === data.fallbackLanguage.value);
        if (!mainNotification) {
            setAlert(true);
            return;
        }
        const object = notificationObject(
            {
                draft: data.draft,
                expirationDate: data.expDate,
                fallbackLanguage: data.fallbackLanguage.value,
                showDate: data.showDate,
                type: data.type.value as 'promo' | 'info' | 'documents',
            },
            mainNotification.data.title,
            notifications,
        );
        console.log(object);

        notificationAggregate
            ? putNotificationAggregate(object, notificationAggregate.id)
            : postNotificationAggregate(object);
        reset(data);
    };

    const handleExitClick = () => exitModal();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
                {alert && (
                    <Alert
                        action={
                            <IconButton aria-label="close" color="inherit" size="small" onClick={() => setAlert(false)}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        severity="error"
                        sx={{ mt: '30px' }}
                    >
                        Proszę dodaj powiadomienie dla języka domyślnego.
                    </Alert>
                )}
                <Box className={notificationGroupStyle.content}>
                    <Box className={notificationGroupStyle.container}>
                        <Typography variant="h5">Język domyślny</Typography>
                        <Controller
                            control={control}
                            rules={{ required: 'Język domyślny jest wymagany.' }}
                            name="fallbackLanguage"
                            render={({ field }) => (
                                <Select
                                    className={notificationGroupStyle.select}
                                    instanceId="fallbackLanguage"
                                    placeholder="Wybierz..."
                                    options={langOptions}
                                    {...field}
                                />
                            )}
                        />
                        {errors.fallbackLanguage && <p>{(errors.fallbackLanguage as any).message}</p>}
                    </Box>

                    <Box className={notificationGroupStyle.container}>
                        <Typography variant="h5">Typ</Typography>
                        <Controller
                            control={control}
                            rules={{ required: 'Typ jest wymagany.' }}
                            name="type"
                            render={({ field }) => (
                                <Select
                                    className={notificationGroupStyle.select}
                                    instanceId="type"
                                    placeholder="Wybierz..."
                                    options={typeOptions}
                                    {...field}
                                />
                            )}
                        />
                        {errors.type && <p>{(errors.type as any)?.message}</p>}
                    </Box>
                    <Box className={notificationGroupStyle.container} sx={{ maxWidth: '200px' }}>
                        <Typography variant="h5">Data pokazania powiadomienia</Typography>
                        <Controller
                            control={control}
                            name="showDate"
                            render={({ field }) => (
                                <DatePicker
                                    wrapperClassName="date-picker"
                                    minDate={currentDate}
                                    showTimeSelect
                                    timeIntervals={15}
                                    timeFormat="HH:mm"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    placeholderText="Wybierz datę"
                                    onChange={(date) => field.onChange(date)}
                                    selected={field.value}
                                />
                            )}
                            rules={{
                                required: 'Data pokazania jest wymagana.',
                                validate: {
                                    afterNow: (v) => v > new Date() || 'Data pokazania nie może być w przeszłości!',

                                    beforeExpDate: (v) =>
                                        v <= getValues('expDate') || 'Data pokazanie nie może być po dacie wygaśnięcia',
                                },
                            }}
                        />
                        {errors.showDate && <Box sx={{ mt: 2 }}>{(errors.showDate as any)?.message}</Box>}
                    </Box>
                    <Box sx={{ maxWidth: '200px' }} className={notificationGroupStyle.container}>
                        <Typography variant="h5">Data wygaśnięcia powiadomienia</Typography>
                        <Controller
                            control={control}
                            name="expDate"
                            render={({ field }) => (
                                <DatePicker
                                    wrapperClassName="date-picker"
                                    showTimeSelect
                                    timeIntervals={15}
                                    timeFormat="HH:mm"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    minDate={currentDate}
                                    placeholderText="Wybierz datę"
                                    onChange={(date) => field.onChange(date)}
                                    selected={field.value}
                                />
                            )}
                            rules={{
                                validate: {
                                    afterNow: (v) => v > new Date() || 'Data wygaśnięcia nie może być w przeszłości!',
                                    afterShowDate: (v) =>
                                        v >= getValues('showDate') ||
                                        'Data wygaśnięcia nie może być przed datą publikacji',
                                },
                            }}
                        />
                        {errors.expDate && <Box sx={{ mt: 2 }}>{(errors.showDate as any)?.message}</Box>}
                    </Box>
                </Box>
                <Box className={notificationGroupStyle.buttonContainer}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        <Typography variant="h5">Wersja robocza</Typography>
                        <input
                            type="checkbox"
                            placeholder="Draft"
                            className={notificationGroupStyle.switch_1}
                            {...register('draft', {})}
                        />
                    </Box>
                    <Box sx={{ m: 2 }}>
                        <Button onClick={handleExitClick} variant="contained">
                            Wyjdź
                        </Button>
                        <Button type="submit" variant="contained" color="success" sx={{ ml: '8px' }}>
                            Zapisz
                        </Button>
                    </Box>
                </Box>
            </Box>
        </form>
    );
};

export default NotificationsGroupForm;

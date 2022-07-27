import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button, Typography, Alert, Box, IconButton } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import notificationGroupStyle from '../../styles/NotificationsGroupForm.module.css';
import { notificationObject } from './NotificationsUtils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LabelTypes, SingleNotification, GroupFormValues } from '../typings/Notifications';

interface IProps {
    langOptions: LabelTypes[];
    typeOptions: LabelTypes[];
    notifications: SingleNotification[];
    preloadedGroupValues: GroupFormValues;
    handleNotificationGroup: (object: object) => void;
    editNotificationGroup: (object: object, id: number) => void;
    handleExit: () => void;
}

const NotificationsGroupForm: React.FC<IProps> = ({
    typeOptions,
    langOptions,
    notifications,
    preloadedGroupValues,
    handleNotificationGroup,
    editNotificationGroup,
    handleExit,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<GroupFormValues>({
        shouldUnregister: true,
        defaultValues: preloadedGroupValues,
    });
    const [alert, setAlert] = useState(false);
    const [currentDate, setCurrentDate] = useState<Date>();
    const getDate = () => setCurrentDate(new Date());

    useEffect(() => {
        getDate();
    }, []);

    const handleClick = (data) => {
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
                type: data.type.value,
            },
            mainNotification.data.title,
            notifications,
        );

        preloadedGroupValues ? editNotificationGroup(object, preloadedGroupValues.id) : handleNotificationGroup(object);
        reset(data);
    };

    const handleExitClick = () => handleExit();

    const onSubmit: SubmitHandler<GroupFormValues> = (data) => handleClick(data);
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
                        {errors.type && <p>{(errors.type as any).message}</p>}
                    </Box>
                    <Box className={notificationGroupStyle.container}>
                        <Typography variant="h5">Data pokazania powiadomienia</Typography>
                        <Controller
                            control={control}
                            name="showDate"
                            rules={{ required: 'Data pokazania jest wymagana.' }}
                            render={({ field }) => (
                                <DatePicker
                                    wrapperClassName="date-picker"
                                    minDate={currentDate}
                                    placeholderText="Wybierz datę"
                                    onChange={(date) => field.onChange(date)}
                                    selected={field.value}
                                />
                            )}
                        />
                        {errors.showDate && <p>{(errors.showDate as any).message}</p>}
                    </Box>
                    <Box className={notificationGroupStyle.container}>
                        <Typography variant="h5">Data wygaśnięcia powiadomienia</Typography>
                        <Controller
                            control={control}
                            name="expDate"
                            render={({ field }) => (
                                <DatePicker
                                    wrapperClassName="date-picker"
                                    minDate={currentDate}
                                    placeholderText="Wybierz datę"
                                    onChange={(date) => field.onChange(date)}
                                    selected={field.value}
                                />
                            )}
                        />
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
                    <Box>
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

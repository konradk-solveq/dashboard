import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button, InputLabel, Container, Alert } from '@mui/material/';
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
            <div>
                {alert && (
                    <Alert sx={{ mt: '30px' }}>
                        Proszę dodaj powiadomienie dla języka domyślnego.
                        <CloseIcon sx={{ ml: 'auto', cursor: 'pointer' }} onClick={() => setAlert(false)} />
                    </Alert>
                )}
                <div className={notificationGroupStyle.content}>
                    <Container className={notificationGroupStyle.container}>
                        <InputLabel>Język domyślny</InputLabel>
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
                    </Container>

                    <Container className={notificationGroupStyle.container}>
                        <InputLabel>Typ</InputLabel>
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
                    </Container>
                    <Container className={notificationGroupStyle.container}>
                        <InputLabel>Data pokazania powiadomienia</InputLabel>
                        <Controller
                            control={control}
                            name="showDate"
                            rules={{ required: 'Data pokazania jest wymagana.' }}
                            render={({ field }) => (
                                <DatePicker
                                    wrapperClassName="date-picker"
                                    placeholderText="Wybierz datę"
                                    onChange={(date) => field.onChange(date)}
                                    selected={field.value}
                                />
                            )}
                        />
                        {errors.showDate && <p>{(errors.showDate as any).message}</p>}
                    </Container>
                    <Container className={notificationGroupStyle.container}>
                        <InputLabel>Data wygaśnięcia powiadomienia</InputLabel>
                        <Controller
                            control={control}
                            name="expDate"
                            render={({ field }) => (
                                <DatePicker
                                    wrapperClassName="date-picker"
                                    placeholderText="Wybierz datę"
                                    onChange={(date) => field.onChange(date)}
                                    selected={field.value}
                                />
                            )}
                        />
                    </Container>
                </div>
                <Container className={notificationGroupStyle.buttonContainer}>
                    <div>
                        <InputLabel>Wersja robocza</InputLabel>
                        <input
                            type="checkbox"
                            placeholder="Draft"
                            className={notificationGroupStyle.switch_1}
                            {...register('draft', {})}
                        />
                    </div>
                    <div>
                        <Button onClick={handleExitClick}>Wyjdź</Button>
                        <Button type="submit" sx={{ backgroundColor: 'green', ml: '20px' }}>
                            Zapisz
                        </Button>
                    </div>
                </Container>
            </div>
        </form>
    );
};

export default NotificationsGroupForm;

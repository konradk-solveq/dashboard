import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Label, Container, Alert, Close } from 'theme-ui';
import Select from 'react-select';
import notificationGroupStyle from '../../styles/NotificationsGroupForm.module.css';
import { notificationObject } from './NotificationsUtils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IProps {
    langOptions: {};
    typeOptions: {};
    notifications: [];
    preloadedGroupValues: {};
    notificationGroup: {};
    handleNotificationGroup: () => void;
    editNotificationGroup: () => void;
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
    } = useForm({ shouldUnregister: true, defaultValues: preloadedGroupValues });
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
            mainNotification,
            notifications,
        );
        preloadedGroupValues ? editNotificationGroup(object, preloadedGroupValues.id) : handleNotificationGroup(object);
        reset(data);
    };

    const handleExitClick = () => handleExit();

    const onSubmit = (data) => handleClick(data);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                {alert && (
                    <Alert sx={{ mt: '30px' }}>
                        Proszę dodaj powiadomienie dla języka domyślnego.
                        <Close sx={{ ml: 'auto', cursor: 'pointer' }} onClick={() => setAlert(false)} />
                    </Alert>
                )}
                <div className={notificationGroupStyle.content}>
                    <Container className={notificationGroupStyle.container}>
                        <Label>Język domyślny</Label>
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
                        {errors.fallbackLanguage && <p>{errors.fallbackLanguage.message}</p>}
                    </Container>

                    <Container className={notificationGroupStyle.container}>
                        <Label>Typ</Label>
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
                        {errors.type && <p>{errors.type.message}</p>}
                    </Container>
                    <Container className={notificationGroupStyle.container}>
                        <Label>Data pokazania powiadomienia</Label>
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
                        {errors.showDate && <p>{errors.showDate.message}</p>}
                    </Container>
                    <Container className={notificationGroupStyle.container}>
                        <Label>Data wygaśnięcia powiadomienia</Label>
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
                        <Label>Wersja robocza</Label>
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

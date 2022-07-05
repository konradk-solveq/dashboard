import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Box, Input, InputLabel } from '@mui/material/';
import Select from 'react-select';
import notificationStyle from '../../styles/NotificationsForm.module.css';
import { FormValues } from '../typings/Notifications';

interface IProps {
    langOptions: { value: string; label: string }[];
    handleOpen(): void;
    newNotificationHandler: (data: object) => void;
    preloadedValues: FormValues;
    changeNotification: (data: object, id: number) => void;
}

const NotificationsForm: React.FC<IProps> = ({
    langOptions,
    handleOpen,
    newNotificationHandler,
    preloadedValues,
    changeNotification,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<FormValues>({ shouldUnregister: true, defaultValues: preloadedValues });

    const handleClick = (data) => {
        preloadedValues ? changeNotification(data, preloadedValues.id) : newNotificationHandler(data);
        reset(data);
    };

    const onSubmit = (data) => handleClick(data);

    return (
        <form className={notificationStyle.content} onSubmit={handleSubmit(onSubmit)}>
            <div className={notificationStyle.contentblock}>
                <div className={notificationStyle.close} onClick={handleOpen}>
                    {'\u2715'}
                </div>
                <Box sx={{ display: 'grid', gridTemplateColumns: '50px 380px 1fr' }}>
                    <InputLabel>Tytuł</InputLabel>

                    <Input className={notificationStyle.title} type="text" {...register('title', { required: true })} />
                    {errors.title && <p>Tytuł jest wymagany.</p>}
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '50px 380px 1fr' }}>
                    <InputLabel>Treść</InputLabel>
                    <textarea {...register('message', { required: true })} />
                    {errors.message && <p>Treść jest wymagana.</p>}
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '50px 380px 1fr' }}>
                    <InputLabel>Język</InputLabel>
                    <Controller
                        control={control}
                        rules={{ required: 'Język jest wymagany.' }}
                        name="language"
                        render={({ field }) => (
                            <Select instanceId="language" placeholder="Wybierz..." options={langOptions} {...field} />
                        )}
                    />
                    {errors.language && <p>{(errors.language as any).message}</p>}
                </Box>
                <div className={notificationStyle.buttonContainer}>
                    <Button type="submit">Zapisz</Button>
                </div>
            </div>
        </form>
    );
};

export default NotificationsForm;

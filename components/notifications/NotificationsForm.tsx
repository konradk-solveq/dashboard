import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Box, Input, Typography } from '@mui/material/';
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
            <Box className={notificationStyle.contentblock}>
                <Box sx={{ display: 'flex', width: '400px', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="h5">Tytuł</Typography>
                    <Box>
                        <Input
                            className={notificationStyle.title}
                            type="text"
                            {...register('title', { required: true })}
                        />
                        <Box>{errors.title && <Typography variant="caption">Tytuł jest wymagany.</Typography>}</Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '400px', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="h5">Treść</Typography>
                    <Box>
                        <textarea {...register('message', { required: true })} />
                        <Box>{errors.message && <Typography variant="caption">Treść jest wymagana.</Typography>}</Box>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', width: '400px', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="h5">Język</Typography>
                    <Box sx={{ width: '320px', fontSize: '16px', fontWeight: '200' }}>
                        <Controller
                            control={control}
                            rules={{ required: 'Język jest wymagany.' }}
                            name="language"
                            render={({ field }) => (
                                <Select
                                    instanceId="language"
                                    placeholder="Wybierz..."
                                    options={langOptions}
                                    {...field}
                                />
                            )}
                        />
                        <Box sx={{ mt: 1 }}>
                            {errors.language && (
                                <Typography variant="caption">{(errors.language as any).message}</Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
                <Box className={notificationStyle.buttonContainer}>
                    <Button variant="contained" color="error" onClick={handleOpen}>
                        Wyjdź
                    </Button>
                    <Button variant="contained" color="success" type="submit">
                        Zapisz
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default NotificationsForm;

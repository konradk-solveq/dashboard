import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Box, Input, Typography } from '@mui/material/';
import Select from 'react-select';
import { FormValues, SingleNotification } from '../typings/Notifications';
import Modal from '../../assets/components/modal';
import { Notifications } from '@mui/icons-material';

interface IProps {
    langOptions: { value: string; label: string }[];
    handleOpen(): void;
    newNotificationTranslation: (data: object) => void;
    notificationTranslation: FormValues;
    changeNotificationTranslation: (data: object, id: number) => void;
    notifications: SingleNotification[];
}

const NotificationsForm: React.FC<IProps> = ({
    langOptions,
    handleOpen,
    newNotificationTranslation,
    notificationTranslation,
    changeNotificationTranslation,
    notifications,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<FormValues>({ shouldUnregister: true, defaultValues: notificationTranslation });
    const modalRef = useRef<HTMLInputElement | null>(null);

    console.log(errors);

    const closeModal = (e: React.MouseEvent<HTMLElement>) => {
        if (modalRef.current === e.target) {
            handleOpen();
        }
    };

    const onSubmit = (data: FormValues) => {
        notificationTranslation
            ? changeNotificationTranslation(data, notificationTranslation.id)
            : newNotificationTranslation(data);
        reset(data);
    };

    return (
        <Modal
            title="Dodaj Powiadomienie"
            closeIcon={true}
            onClickRef={closeModal}
            refProps={modalRef}
            onCloseFunction={handleOpen}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Box sx={{ display: 'flex', width: '350px', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant="h5">Tytuł</Typography>
                        <Box>
                            <Input
                                sx={{ fontSize: '16px', width: '250px' }}
                                disableUnderline={true}
                                className="document-input-form"
                                type="text"
                                {...register('title', { required: true })}
                            />
                            <Box>{errors.title && <Typography variant="caption">Tytuł jest wymagany.</Typography>}</Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '350px', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant="h5">Treść</Typography>
                        <Box>
                            <Input
                                className="document-input-form"
                                disableUnderline={true}
                                multiline
                                sx={{
                                    fontSize: '16px',
                                    minHeight: '35px',
                                    maxHeight: '30vh',
                                    overflowY: 'scroll',
                                    width: '250px',
                                    display: 'flex',
                                    fontWeight: 300,
                                }}
                                {...register('message', { required: true })}
                            />
                            <Box>
                                {errors.message && <Typography variant="caption">Treść jest wymagana.</Typography>}
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', width: '350px', justifyContent: 'space-between', mt: 2, mb: 2 }}>
                        <Typography variant="h5">Język</Typography>
                        <Box sx={{ width: '250px', fontSize: '16px', fontWeight: 300 }}>
                            <Controller
                                control={control}
                                rules={{
                                    required: 'Język jest wymagany.',
                                    validate: (v) =>
                                        notifications.filter((e) => e.language === v.value).length < 1 ||
                                        'Języki nie mogą się powtarzać',
                                }}
                                name="language"
                                render={({ field }) => (
                                    <Select
                                        instanceId="language"
                                        className="document-select-form"
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
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="success" type="submit">
                            Zapisz
                        </Button>
                    </Box>
                </Box>
            </form>
        </Modal>
    );
};

export default NotificationsForm;

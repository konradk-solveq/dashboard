import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Grid, Input, Label } from 'theme-ui';
import Select from 'react-select';
import notificationStyle from '../../styles/NotificationsForm.module.css';
import { SingleNotification, LanguageType } from '../typings/Notifications';

interface IProps {
    langOptions: LanguageType[];
    handleOpen(): void;
    newNotificationHandler: (data: object) => void;
    preloadedValues: SingleNotification;
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
    } = useForm({ shouldUnregister: true, defaultValues: preloadedValues });

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
                <Grid columns="50px 380px 1fr" marginBottom="10px">
                    <Label>Tytuł</Label>

                    <Input className={notificationStyle.title} type="text" {...register('title', { required: true })} />
                    {errors.title && <p>Tytuł jest wymagany.</p>}
                </Grid>
                <Grid columns="50px 380px 1fr" marginBottom="10px">
                    <Label>Treść</Label>
                    <textarea {...register('message', { required: true })} />
                    {errors.message && <p>Treść jest wymagana.</p>}
                </Grid>

                <Grid columns="50px 380px 1fr" marginBottom="10px">
                    <Label>Język</Label>
                    <Controller
                        control={control}
                        rules={{ required: 'Język jest wymagany.' }}
                        name="language"
                        render={({ field }) => (
                            <Select instanceId="language" placeholder="Wybierz..." options={langOptions} {...field} />
                        )}
                    />
                    {errors.language && <p>{(errors.language as any).message}</p>}
                </Grid>
                <div className={notificationStyle.buttonContainer}>
                    <Button type="submit">Zapisz</Button>
                </div>
            </div>
        </form>
    );
};

export default NotificationsForm;

import React from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { Button, Grid, Input, Label } from 'theme-ui';
import Select from 'react-select';
import notificationStyle from '../../styles/NotificationsForm.module.css';
import { LanguageType } from '../../components/typings/Notifications';
import { getAvailableLanguages } from '../../components/notifications/NotificationsApi';

interface IProps {
    availableLanguages?: LanguageType[];
}

const NotificationsForm: React.FC<IProps> = ({ availableLanguages = [] }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();

    const langOptions = getAvailableLanguages([...availableLanguages]);
    const router = useRouter();

    const handleClick = (data) => {
        router.push(
            {
                pathname: '../notifications/NotificationsEdit',
                query: { title: data.title, text: data.message, language: data.language.value },
            },
            '../notifications/NotificationsEdit',
        );
    };

    const onSubmit = (data) => handleClick(data);
    return (
        <form className={notificationStyle.content} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Grid gap={4} columns="50px 380px 1fr" marginBottom="10px">
                    <Label>Tytuł</Label>
                    <Input className={notificationStyle.title} type="text" {...register('title', { required: true })} />
                    {errors.title && <p>Tytuł jest wymagany.</p>}
                </Grid>
                <Grid gap={4} columns="50px 380px 1fr" marginBottom="10px">
                    <Label>Treść</Label>
                    <textarea {...register('message', { required: true })} />
                    {errors.message && <p>Treść jest wymagana.</p>}
                </Grid>

                <Grid gap={4} columns="50px 380px 1fr" marginBottom="10px">
                    <Label>Język</Label>
                    <Controller
                        control={control}
                        defaultValue={null}
                        rules={{ required: 'Język jest wymagany.' }}
                        name="language"
                        render={({ field }) => (
                            <Select instanceId="language" placeholder="Wybierz..." options={langOptions} {...field} />
                        )}
                    />
                    {errors.language && <p>{errors.language.message}</p>}
                </Grid>
                <div className={notificationStyle.buttonContainer}>
                    <Button type="submit">Dodaj powiadomienie</Button>
                </div>
            </div>
        </form>
    );
};

export default NotificationsForm;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Grid, Input, Label, Container } from 'theme-ui';
import Select from 'react-select';
import notificationGroupStyle from '../../styles/NotificationsGroupForm.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LanguageType } from '../../components/typings/Notifications';
import { getAvailableLanguages } from '../../components/notifications/NotificationsApi';

interface IProps {
    availableLanguages?: LanguageType[];
}

const NotificationsGroupForm: React.FC<IProps> = ({ availableLanguages = [] }) => {
    const typeOptions = [
        { value: 'documents', label: 'Dokument' },
        { value: 'info', label: 'Info' },
        { value: 'noType', label: 'Inny' },
    ];
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();
    const langOptions = getAvailableLanguages([...availableLanguages]);

    const onSubmit = (data) => console.log(data);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className={notificationGroupStyle.content}>
                    <Container className={notificationGroupStyle.container}>
                        <Label>Język domyślny</Label>
                        <Controller
                            control={control}
                            defaultValue={null}
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
                            defaultValue={null}
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
                            name="date"
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
                    {/* Compile data and send */}
                    <div>
                        <Label>Wersja robocza</Label>
                        <input
                            type="checkbox"
                            placeholder="Draft"
                            className={notificationGroupStyle.switch_1}
                            {...register('draft', {})}
                        />
                    </div>
                    <Button type="submit">Dodaj powiadomienie</Button>
                </Container>
            </div>
        </form>
    );
};

export default NotificationsGroupForm;

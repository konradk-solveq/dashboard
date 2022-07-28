import { parseJSON } from 'date-fns';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Checkbox, Container, Box, MenuItem, Alert, Select, CircularProgress } from '@mui/material';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { ManagePublicationsContext } from '../../../contexts/publication/ManagePublication';
import { EditFormValues, EditRowProps, Files } from '../../../typings/ManagePublications';

const mapOptions = (optionsArray: Files['terms'] | Files['policy']) => {
    return optionsArray.map((item) => (
        <MenuItem style={{ fontSize: '14px' }} key={item.id} value={item.id}>
            {item.name}
        </MenuItem>
    ));
};

const EditRow: React.FC<EditRowProps> = ({ item, setEditMode }) => {
    const { publicationMutation, files } = useContext(ManagePublicationsContext);

    const [showDate, setShowDate] = useState<Date>(parseJSON(item.showDate));
    const [publicationDate, setPublicationDate] = useState<Date>(parseJSON(item.publicationDate));

    const { terms, policy } = files;

    const isInitialMount = useRef(true);

    const {
        handleSubmit,
        control,
        setValue,
        watch,
        getValues,
        formState: { errors },
    } = useForm<EditFormValues>({
        defaultValues: {
            type: item.type,
            oldDocument: item.pair.oldDocument.id,
            newDocument: item.pair.newDocument.id,
            showDate: showDate,
            publicationDate: publicationDate,
            draft: item.draft,
            fallbackLanguage: item.fallbackLanguage,
        },
    });

    const publicationType = watch('type');

    useEffect(() => {
        if (isInitialMount.current) isInitialMount.current = false;
        else handleTypeChange();
    }, [publicationType]);

    const setValueOfMultiple = (names: ['oldDocument', 'newDocument'], value: string) => {
        names.forEach((name) => setValue(name, value));
    };

    const handleTypeChange = () => {
        if (publicationType === 'terms') {
            setValueOfMultiple(['oldDocument', 'newDocument'], terms[0].id);
        }
        if (publicationType === 'policy') {
            setValueOfMultiple(['oldDocument', 'newDocument'], policy[0]?.id);
        }
    };

    const onSubmit = async (data: EditFormValues) => {
        const hookToUpload = {
            type: data.type,
            pair: {
                oldDocumentId: data.oldDocument,
                newDocumentId: data.newDocument,
            },
            showDate: data.showDate,
            publicationDate: data.publicationDate,
            draft: data.draft,
            fallbackLanguage: item.fallbackLanguage,
        };
        publicationMutation.mutate({ id: item.id, data: hookToUpload });
        setEditMode((prev: boolean) => !prev);
    };

    if (publicationMutation.isLoading) {
        return (
            <Box sx={{ justifyContent: 'center', alignContent: 'center', marginTop: '40px' }}>
                <CircularProgress sx={{ m: 40 }} />
            </Box>
        );
    }

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    alignItems: 'center',
                    justifyItems: 'center',
                    fontSize: '1rem',
                    textAlign: 'center',
                    margin: '40px 0 0',
                    height: '47px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 60px 0.5fr 0.5fr',
                    gap: 2,
                }}
            >
                <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                        <Select
                            onChange={async (e) => {
                                field.onChange(e.target.value);
                            }}
                            defaultValue={item.type}
                        >
                            <option value="terms">Regulamin</option>
                            <option value="policy">Polityka Prywatności</option>
                        </Select>
                    )}
                />

                <Controller
                    name="oldDocument"
                    control={control}
                    rules={{ required: true, validate: { sameFile: (v) => v != getValues('newDocument') } }}
                    render={({ field }) => (
                        <Select
                            defaultValue={item.pair.oldDocument.id}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }}
                        >
                            {publicationType === 'terms' && mapOptions(terms.data)}
                            {publicationType === 'policy' && mapOptions(policy.data)}
                        </Select>
                    )}
                />
                <Controller
                    name="newDocument"
                    control={control}
                    rules={{ required: true, validate: { sameFile: (v) => v != getValues('oldDocument') } }}
                    render={({ field }) => (
                        <Select
                            className="document-select-form"
                            defaultValue={item.pair.newDocument.id}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }}
                        >
                            {publicationType === 'terms' && mapOptions(terms.data)}
                            {publicationType === 'policy' && mapOptions(policy.data)}
                        </Select>
                    )}
                />
                <Container>
                    <Controller
                        name="showDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                showTimeSelect
                                timeIntervals={15}
                                timeFormat="HH:mm"
                                dateFormat="dd/MM/yyyy HH:mm"
                                selected={showDate}
                                onChange={(date: Date) => {
                                    field.onChange(date);
                                    setShowDate(date);
                                }}
                            />
                        )}
                        rules={{
                            validate: {
                                afterNow: (v) => v > new Date(),
                                beforePublicationDate: (v) => v <= getValues('publicationDate'),
                            },
                        }}
                    />
                </Container>
                <Container>
                    <Controller
                        name="publicationDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                showTimeSelect
                                timeIntervals={15}
                                timeFormat="HH:mm"
                                dateFormat="dd/MM/yyyy HH:mm"
                                selected={publicationDate}
                                onChange={(date: Date) => {
                                    field.onChange(date);
                                    setPublicationDate(date);
                                }}
                            />
                        )}
                        rules={{
                            validate: {
                                afterNow: (v) => v > new Date(),
                                afterShowDate: (v) => v >= getValues('showDate'),
                            },
                        }}
                    />
                </Container>
                <Box component="label" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Controller
                        name="draft"
                        control={control}
                        render={({ field }) => (
                            <Checkbox sx={{ margin: 0 }} defaultChecked={item.draft} onChange={field.onChange} />
                        )}
                    />
                </Box>
                <Button
                    onClick={handleSubmit(onSubmit)}
                    sx={{ width: '100%', height: '40px', padding: 0, fontSize: '1rem' }}
                    variant="contained"
                    color="success"
                    type="submit"
                >
                    Zapisz
                </Button>
                <Button
                    sx={{ width: '100%', height: '40px', padding: 0, fontSize: '1rem' }}
                    variant="contained"
                    color="error"
                    onClick={() => setEditMode((prev) => !prev)}
                    type="button"
                >
                    Anuluj
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    mt: '2',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '15px',
                }}
            >
                {(errors.showDate || errors.publicationDate) && (
                    <Alert severity="error">
                        Data pokazania musi być przed datą wygaśnięcia oraz nie może być w przeszłości
                    </Alert>
                )}
                {(errors.oldDocument || errors.newDocument) && (
                    <Alert severity="error">Dokumenty nie mogą być takie same!</Alert>
                )}
            </Box>
        </>
    );
};

export default EditRow;

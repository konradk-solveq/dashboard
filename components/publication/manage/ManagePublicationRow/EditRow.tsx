import { parseJSON } from 'date-fns';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Checkbox, Container, Flex, Grid, Message, Select } from 'theme-ui';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { ManagePublicationsContext } from '../../../contexts/publication/ManagePublication';
import { EditFormValues } from '../../../typings/ManagePublications';
import { Results } from '../../../typings/ManagePublications';

const mapOptions = (optionsArray: Results['terms'] | Results['policy']) => {
    optionsArray.map((item) => (
        <option key={item.id} value={item.id}>
            {item.name}
        </option>
    ));
};

const EditRow = ({ item, setEditMode, setIsLoading }) => {
    const { results, apiHandler, putPublication } = useContext(ManagePublicationsContext);
    const [showDate, setShowDate] = useState<Date>(parseJSON(item.showDate));
    const [publicationDate, setPublicationDate] = useState<Date>(parseJSON(item.publicationDate));

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
            setValueOfMultiple(['oldDocument', 'newDocument'], results?.terms[0]?.id);
        }
        if (publicationType === 'policy') {
            setValueOfMultiple(['oldDocument', 'newDocument'], results?.policy[0]?.id);
        }
    };

    const onSubmit = async (data: EditFormValues) => {
        setIsLoading(true);
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
        setEditMode((prev: boolean) => !prev);
        await apiHandler(await putPublication(hookToUpload, item.id), item.id, 'update');
        setIsLoading(false);
    };

    return (
        <>
            <Grid
                as="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    alignItems: 'center',
                    justifyItems: 'center',
                    fontSize: '1rem',
                    textAlign: 'center',
                    margin: '40px 0 0',
                    height: '47px',
                }}
                gap={2}
                columns="1fr 1fr 1fr 1fr 1fr 60px 0.5fr 0.5fr"
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
                            {publicationType === 'terms' && mapOptions(results.terms)}
                            {publicationType === 'policy' && mapOptions(results.policy)}
                        </Select>
                    )}
                />
                <Controller
                    name="newDocument"
                    control={control}
                    rules={{ required: true, validate: { sameFile: (v) => v != getValues('oldDocument') } }}
                    render={({ field }) => (
                        <Select
                            defaultValue={item.pair.newDocument.id}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }}
                        >
                            {publicationType === 'terms' &&
                                results.terms.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            {publicationType === 'policy' &&
                                results.policy.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
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
                <Flex as="label" sx={{ justifyContent: 'center' }}>
                    <Controller
                        name="draft"
                        control={control}
                        render={({ field }) => (
                            <Checkbox sx={{ margin: 0 }} defaultChecked={item.draft} onChange={field.onChange} />
                        )}
                    />
                </Flex>
                <Button
                    onClick={handleSubmit(onSubmit)}
                    sx={{ width: '100%', height: '40px', padding: 0, fontSize: '1rem' }}
                    bg="grey"
                    type="submit"
                >
                    Zapisz
                </Button>
                <Button
                    sx={{ width: '100%', height: '40px', padding: 0, fontSize: '1rem' }}
                    onClick={() => setEditMode((prev) => !prev)}
                    type="button"
                >
                    Anuluj
                </Button>
            </Grid>
            <Flex
                mt={2}
                sx={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '15px',
                }}
            >
                {(errors.showDate || errors.publicationDate) && (
                    <Message bg="lightgrey">
                        Data pokazania musi być przed datą wygaśnięcia oraz nie może być w przeszłości
                    </Message>
                )}
                {(errors.oldDocument || errors.newDocument) && (
                    <Message bg="lightgrey">Dokumenty nie mogą być takie same!</Message>
                )}
            </Flex>
        </>
    );
};

export default EditRow;

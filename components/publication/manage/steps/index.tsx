import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button, Select, Checkbox, MenuItem } from '@mui/material/';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from '@emotion/styled';

import { ManagePublicationContext } from '../../../contexts/publication/ManagePublication';
import { AvailableFiles, Step0Props, SubmittedProps } from '../../../typings/PublicationSection';

const NestedLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: auto;
    flex: 1 1;
    padding: 10px;
    gap: 10px;
`;

const ItemColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1;
    gap: 10px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 75%;
    margin-bottom: 80px;
    font-size: 1.1em;
`;

const Label = styled.label`
    width: auto;
    padding: 5px;
`;

export const Step0: React.FC<Step0Props> = ({ handlePublicationTypeSelect }) => {
    return (
        <>
            <Box mb="80px">
                <Typography variant="h3">Typ Publikacji</Typography>
            </Box>
            <Row>
                <Button
                    type="button"
                    variant="contained"
                    value="terms"
                    sx={{ width: '200px', fontSize: '1rem' }}
                    onClick={handlePublicationTypeSelect}
                >
                    Regulamin
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    value="policy"
                    sx={{ width: '200px', padding: '15px', fontSize: '1rem' }}
                    onClick={handlePublicationTypeSelect}
                >
                    Polityka Prywatności
                </Button>
            </Row>
        </>
    );
};

export const Step1: React.FC = () => {
    const { availableFiles, publishFormMethods } = useContext(ManagePublicationContext);

    const { control, getValues, setValue } = publishFormMethods;

    useEffect(() => {
        setValue('current', availableFiles[0]?.id);
        setValue('next', availableFiles[0]?.id);
    }, []);
    return (
        <>
            <Box mb="80px">
                <Typography variant="h3">Dokument Aktualny i Nowy</Typography>
            </Box>
            <Row>
                <ItemColumn>
                    <Label>Aktualnie obowiązujący</Label>
                    <Controller
                        name="current"
                        control={control}
                        rules={{ required: true, validate: { sameFile: (v) => v !== getValues('next') } }}
                        render={({ field }) => (
                            <Select
                                className="document-select-form"
                                sx={{ width: '200px', textAlign: 'center' }}
                                onChange={field.onChange}
                            >
                                {availableFiles?.map((file: AvailableFiles) => (
                                    <MenuItem style={{ fontSize: '14px' }} key={file.id} value={file.id}>
                                        {file.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </ItemColumn>
                <ItemColumn>
                    <Label>Obowiązujący po dacie publikacji</Label>
                    <Controller
                        name="next"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                className="document-select-form"
                                sx={{ width: '200px', textAlign: 'center' }}
                                onChange={field.onChange}
                            >
                                {availableFiles?.map((file: AvailableFiles) => (
                                    <MenuItem style={{ fontSize: '14px' }} key={file.id} value={file.id}>
                                        {file.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </ItemColumn>
            </Row>
        </>
    );
};

export const Step2: React.FC = () => {
    const { publishFormMethods } = useContext(ManagePublicationContext);
    const { control, getValues } = publishFormMethods;

    return (
        <>
            <Box mb="80px">
                <Typography>Daty Wyświetlania Dokumentów</Typography>
            </Box>
            <Row>
                <ItemColumn>
                    <Label>Data wyświetlenia obu dokumentów</Label>
                    <Box>
                        <Controller
                            name="showDate"
                            control={control}
                            rules={{
                                validate: {
                                    afterNow: (v) => v > new Date(),
                                    beforePublicationDate: (v) => v <= getValues('showDate'),
                                },
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date: Date) => field.onChange(date)}
                                    showTimeSelect
                                    timeIntervals={15}
                                    timeFormat="HH:mm"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                />
                            )}
                        />
                    </Box>
                </ItemColumn>
                <ItemColumn>
                    <Label>Data obowiązywania nowego dokumentu</Label>
                    <Box>
                        <Controller
                            name="publicationDate"
                            control={control}
                            rules={{
                                validate: {
                                    afterNow: (v) => v > new Date(),
                                    afterShowDate: (v) => v >= getValues('showDate'),
                                },
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date: Date) => field.onChange(date)}
                                    showTimeSelect
                                    timeIntervals={15}
                                    timeFormat="HH:mm"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                />
                            )}
                        />
                    </Box>
                </ItemColumn>
            </Row>
        </>
    );
};

export const Step3 = () => {
    const { availableFiles, publishFormMethods } = useContext(ManagePublicationContext);

    const { getValues, register, setValue } = publishFormMethods;

    const [fallbackLanguages, setFallbackLanguages] = useState<String[]>([]);

    const getFallbackLanguages = (files: AvailableFiles[]) => {
        setFallbackLanguages(files.find((file) => file.id == getValues('next')).contents.map((item) => item.language));
    };

    useEffect(() => {
        getFallbackLanguages(availableFiles);
    }, []);

    useEffect(() => {
        setValue('fallbackLanguage', fallbackLanguages[0]);
    }, [fallbackLanguages]);

    return (
        <>
            <Box mb="80px">
                <Typography>Domyślny język kiedy brakuje zapytanego</Typography>
            </Box>
            <Row>
                <ItemColumn>
                    <Label>Kod Językowy</Label>
                    <Select
                        className="document-select-form"
                        {...register('fallbackLanguage', { required: 'true' })}
                        sx={{ width: '200px', textAlign: 'center' }}
                        defaultValue={fallbackLanguages[0] as string}
                    >
                        {fallbackLanguages.map((language: string) => (
                            <MenuItem style={{ fontSize: '14px' }} key={language} value={language}>
                                {language.toUpperCase()}
                            </MenuItem>
                        ))}
                    </Select>
                </ItemColumn>
            </Row>
        </>
    );
};

export const Step4 = () => {
    const { publishFormMethods } = useContext(ManagePublicationContext);
    const { register } = publishFormMethods;

    return (
        <>
            <Row>
                <ItemColumn>
                    <NestedLabel>
                        <Typography mb="30px">Zapisać jako draft?</Typography>
                        <Checkbox {...register('draft')} />
                    </NestedLabel>
                </ItemColumn>
            </Row>
        </>
    );
};

export const Submitted: React.FC<SubmittedProps> = ({ isError }) => {
    return (
        <Box mb="80px">
            {' '}
            {isError ? (
                <Typography variant="h3" sx={{ textAlign: 'center', lineHeight: '40px' }}>
                    Nie udało się zapisać.
                </Typography>
            ) : (
                <Typography variant="h3">Pomyślnie wysłano zapytanie!</Typography>
            )}
        </Box>
    );
};

import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button, Select, Checkbox, MenuItem, Tooltip, MenuList } from '@mui/material/';
import InfoIcon from '@mui/icons-material/Info';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from '@emotion/styled';

import { PostPublicationContext } from '../../../contexts/publication/PostPublication';
import {
    AvailableFiles,
    Step0Props,
    Step1Props,
    Step3Props,
    SubmittedProps,
} from '../../../typings/PublicationSection';
import { Files } from '../../../typings/ManagePublications';
import add from 'date-fns/add';

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
            <Box mb="80px" sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h3" sx={{ display: 'inline-block', position: 'relative' }}>
                    Typ Publikacji
                </Typography>
                <Tooltip
                    sx={{ position: 'absolute', paddingLeft: '175px' }}
                    title="Publikacja jest jedynie moliwa gdy został wgrany poprzedni dokument"
                >
                    <InfoIcon color="primary" />
                </Tooltip>
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

export const Step1: React.FC<Step1Props> = ({ activeFiles }) => {
    const {
        publishFormMethods: { control, getValues, setValue },
    } = useContext(PostPublicationContext);

    useEffect(() => {
        if (activeFiles) {
            setValue('current', activeFiles[0]?.id);
            setValue('next', activeFiles[1]?.id);
        }
    }, [activeFiles]);

    return (
        <>
            <Box mb="80px">
                <Typography variant="h3">Wybór Dokumentów Publikacji</Typography>
            </Box>
            <Row>
                <ItemColumn>
                    <Label>Aktualny</Label>
                    <Controller
                        name="current"
                        control={control}
                        rules={{ required: true, validate: { sameFile: (v) => v !== getValues('next') } }}
                        render={({ field }) => (
                            <Select
                                className="document-select-form"
                                sx={{ width: '200px', textAlign: 'center' }}
                                onChange={field.onChange}
                                defaultValue={activeFiles[0]?.id}
                            >
                                {activeFiles?.map((file: AvailableFiles) => (
                                    <MenuItem style={{ fontSize: '14px' }} key={file.id} value={file.id}>
                                        {file.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </ItemColumn>
                <ItemColumn>
                    <Label>Nowy</Label>
                    <Controller
                        name="next"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                className="document-select-form"
                                sx={{ width: '200px', textAlign: 'center' }}
                                onChange={field.onChange}
                                defaultValue={activeFiles[1]?.id}
                            >
                                {activeFiles?.map((file: AvailableFiles) => (
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
    const {
        publishFormMethods: { control, getValues, setValue },
    } = useContext(PostPublicationContext);

    const dateNow = new Date();
    const showDate = add(dateNow, { minutes: 1 });
    const publicationDate = add(dateNow, { minutes: 2 });

    useEffect(() => {
        setValue('showDate', showDate);
        setValue('publicationDate', publicationDate);
    }, []);

    return (
        <>
            <Box mb="80px">
                <Typography>Daty Obowiązywania </Typography>
            </Box>
            <Row>
                <ItemColumn>
                    <Box mb="5px">
                        <Label>Data wyświetlenia</Label>
                        <Tooltip
                            sx={{ position: 'absolute', paddingLeft: '5px' }}
                            title="Data po której aktualny i nowy dokument będą pokazywane"
                        >
                            <InfoIcon color="primary" fontSize="small" />
                        </Tooltip>
                    </Box>
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
                                    selected={showDate}
                                    wrapperClassName="date-picker"
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
                    <Box mb="5px">
                        <Label>Data wygaśnięcia</Label>
                        <Tooltip
                            sx={{ position: 'absolute', paddingLeft: '5px' }}
                            title="Data po której aktualny dokument przestanie obowiązywać"
                        >
                            <InfoIcon color="primary" fontSize="small" />
                        </Tooltip>
                    </Box>

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
                                    selected={publicationDate}
                                    onChange={(date: Date) => field.onChange(date)}
                                    showTimeSelect
                                    wrapperClassName="date-picker"
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

export const Step3: React.FC<Step3Props> = ({ activeFiles }) => {
    const {
        publishFormMethods: { getValues, setValue, control },
    } = useContext(PostPublicationContext);

    const [fallbackLanguages, setFallbackLanguages] = useState<String[]>([]);

    const getFallbackLanguages = (files: Files['policy'] | Files['policy']) => {
        setFallbackLanguages(files.find((file) => file.id == getValues('next')).contents.map((item) => item.language));
    };

    useEffect(() => {
        getFallbackLanguages(activeFiles);
    }, []);

    useEffect(() => {
        if (fallbackLanguages.length) setValue('fallbackLanguage', fallbackLanguages[0]);
    }, [fallbackLanguages]);

    return (
        <>
            <Box mb="80px">
                <Typography>Domyślny język kiedy brakuje zapytanego</Typography>
            </Box>
            <Row>
                <ItemColumn>
                    <Label>Kod Językowy</Label>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="fallbackLanguage"
                        render={({ field }) => (
                            <Select
                                className="document-select-form"
                                sx={{ width: '200px', textAlign: 'center' }}
                                onChange={field.onChange}
                                {...field}
                            >
                                {fallbackLanguages.map((language: string) => (
                                    <MenuItem style={{ fontSize: '14px' }} key={language} value={language}>
                                        {language.toUpperCase()}
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

export const Step4 = () => {
    const {
        publishFormMethods: { register },
    } = useContext(PostPublicationContext);

    return (
        <>
            <Row>
                <ItemColumn>
                    <NestedLabel>
                        <Box sx={{ display: 'flex' }}>
                            <Typography m="0 0 30px 50px">Zapisać jako draft?</Typography>
                            <Tooltip
                                sx={{ paddingLeft: '15px', mt: '15px' }}
                                title="Draft jest wersją roboczą która nie będzie opublikowana bez wcześniejszego odznaczenia pola draft. Można to zrobić po publikacji w sekcji zarządzaj publikacjami"
                            >
                                <InfoIcon color="primary" fontSize="small" />
                            </Tooltip>
                        </Box>
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

import { parseJSON } from 'date-fns';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Checkbox, Box, MenuItem, Alert, Select, CircularProgress, Typography, MenuList } from '@mui/material';
import DatePicker from 'react-datepicker';
import DownloadIcon from '@mui/icons-material/Download';

import 'react-datepicker/dist/react-datepicker.css';

import { ManagePublicationsContext } from '../../../contexts/publication/ManagePublication';
import { EditFormValues, EditRowProps, Files, Publication } from '../../../typings/ManagePublications';

const encodeFile = (file: object) => `data:text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify(file))}`;

const mapOptionsWithDownload = (optionsArray: Files['terms'] | Files['policy']) => {
    return optionsArray.map((item) => (
        <MenuItem
            key={item.id}
            value={item.id}
            sx={{ fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
            {item.name}
            <Button href={encodeFile(item)} download={`${item.name}.json`}>
                <DownloadIcon fontSize="small" />
            </Button>
        </MenuItem>
    ));
};

const mapLanguageOptions = (publication: Publication) => {
    const languageArray = publication.pair.newDocument.contents
        .map((content) => content.language)
        .concat(publication.pair.oldDocument.contents.map((content) => content.language));
    // Returns all duplicates - available languages for both old and new document
    return languageArray
        .filter((item, index) => languageArray.indexOf(item) !== index)
        .map((language) => (
            <MenuItem sx={{ fontSize: '14px' }} key={language} value={language}>
                {language.toUpperCase()}
            </MenuItem>
        ));
};

const EditRow: React.FC<EditRowProps> = ({ item, setEditMode, policy, terms }) => {
    const { publicationMutation } = useContext(ManagePublicationsContext);

    const [showDate, setShowDate] = useState<Date>(parseJSON(item.showDate));
    const [publicationDate, setPublicationDate] = useState<Date>(parseJSON(item.publicationDate));
    const [oldDocumentValue, setOldDocumentValue] = useState(item.pair.oldDocument.id);
    const [newDocumentValue, setNewDocumentValue] = useState(item.pair.newDocument.id);
    const [publicationType, setPublicationType] = useState(item.type);

    const {
        handleSubmit,
        control,
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

    const checkTypeAndSetValue = () => {
        if (publicationType === item.type) {
            setOldDocumentValue(item.pair.oldDocument.id);
            setNewDocumentValue(item.pair.newDocument.id);
        } else if (publicationType === 'terms') {
            setOldDocumentValue(terms[1]?.id);
            setNewDocumentValue(terms[0]?.id);
        } else {
            setOldDocumentValue(policy[1]?.id);
            setNewDocumentValue(policy[0]?.id);
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
            fallbackLanguage: data.fallbackLanguage,
        };
        publicationMutation.mutate({ id: item.id, data: hookToUpload });
        setEditMode((prev: boolean) => !prev);
    };

    useEffect(() => {
        checkTypeAndSetValue();
    }, [publicationType]);

    if (publicationMutation.isLoading) {
        return (
            <Box sx={{ justifyContent: 'center', alignContent: 'center', marginTop: '40px' }}>
                <CircularProgress sx={{ m: 40 }} />
            </Box>
        );
    }

    return (
        <Box>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    alignItems: 'center',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 80px 40px 176px',
                    gap: 2,
                }}
            >
                <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                        <Select
                            sx={{ maxWidth: '150px' }}
                            className="document-select-form"
                            onChange={(e) => {
                                setPublicationType(e.target.value);
                                field.onChange;
                            }}
                            defaultValue={item.type}
                        >
                            <MenuItem sx={{ fontSize: '14px' }} value="terms">
                                Regulamin
                            </MenuItem>
                            <MenuItem sx={{ fontSize: '14px' }} value="policy">
                                Polityka Prywatności
                            </MenuItem>
                        </Select>
                    )}
                />

                <Controller
                    name="oldDocument"
                    control={control}
                    rules={{ required: true, validate: { sameFile: (v) => v != getValues('newDocument') } }}
                    render={({ field }) => (
                        <Select
                            sx={{ maxWidth: '150px' }}
                            value={oldDocumentValue}
                            className="document-select-form"
                            onChange={(e) => {
                                setOldDocumentValue((e.target as HTMLInputElement).value as unknown as number);
                                field.onChange(e);
                            }}
                            renderValue={(e) => (
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        width: '110px',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {publicationType === 'terms'
                                        ? terms.find((document) => document.id === e)?.name
                                        : policy.find((document) => document.id === e)?.name}
                                </Typography>
                            )}
                        >
                            {publicationType === 'terms'
                                ? mapOptionsWithDownload(terms)
                                : mapOptionsWithDownload(policy)}
                        </Select>
                    )}
                />
                <Controller
                    name="newDocument"
                    control={control}
                    rules={{ required: true, validate: { sameFile: (v) => v != getValues('oldDocument') } }}
                    render={({ field }) => (
                        <Select
                            sx={{ maxWidth: '150px' }}
                            value={newDocumentValue}
                            className="document-select-form"
                            onChange={(e) => {
                                setNewDocumentValue((e.target as HTMLInputElement).value as unknown as number);
                                field.onChange(e);
                            }}
                            renderValue={(e) => (
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        width: '110px',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {publicationType === 'terms'
                                        ? terms.find((document) => document.id === e)?.name
                                        : policy.find((document) => document.id === e)?.name}
                                </Typography>
                            )}
                        >
                            {publicationType === 'terms'
                                ? mapOptionsWithDownload(terms)
                                : mapOptionsWithDownload(policy)}
                        </Select>
                    )}
                />
                <Box className="datepicker">
                    <Controller
                        name="showDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                showTimeSelect
                                wrapperClassName="date-picker"
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
                </Box>
                <Box className="datepicker">
                    <Controller
                        name="publicationDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                showTimeSelect
                                timeIntervals={15}
                                wrapperClassName="date-picker"
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
                </Box>
                <Controller
                    name="fallbackLanguage"
                    control={control}
                    render={({ field }) => (
                        <Select
                            defaultValue={item.fallbackLanguage}
                            className="document-select-form"
                            onChange={field.onChange}
                        >
                            {mapLanguageOptions(item)}
                        </Select>
                    )}
                />
                <Box component="label" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Controller
                        name="draft"
                        control={control}
                        render={({ field }) => (
                            <Checkbox sx={{ margin: 0 }} defaultChecked={item.draft} onChange={field.onChange} />
                        )}
                    />
                </Box>
                <Box display="flex">
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        variant="contained"
                        sx={{ width: '80px' }}
                        color="success"
                        type="submit"
                    >
                        Zapisz
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setEditMode((prev) => !prev)}
                        type="button"
                        sx={{ ml: 2, width: '80px' }}
                    >
                        Anuluj
                    </Button>
                </Box>
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
        </Box>
    );
};

export default EditRow;

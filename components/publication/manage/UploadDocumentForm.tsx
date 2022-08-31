import React, { useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button, Box, Select, Input, Container, Typography, MenuItem, CircularProgress, Tooltip } from '@mui/material/';
import styled from '@emotion/styled';
import InfoIcon from '@mui/icons-material/Info';

import { readFromFile } from '../../../helpers/readFromFile';
import { FileResult, UploadFormValues } from '../../typings/PublicationSection';
import { DocumentUploadContext } from '../../../components/contexts/publication/DocumentUpload';
import UploadFormFields from './UploadFormFields';

const Label = styled.label`
    margin: 0 auto;
    font-weight: 400;
`;

const UploadDocumentForm: React.FC = () => {
    const { defaultFormValues, appConfig, newDocument } = useContext(DocumentUploadContext);

    const availableLanguages = appConfig.data?.langs;

    const {
        control,
        handleSubmit,
        register,
        reset,
        getValues,
        formState: { errors },
    } = useForm<UploadFormValues>({
        defaultValues: defaultFormValues as UploadFormValues,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'documents',
    });

    const onSubmit = async (formData: UploadFormValues) => {
        remove();
        append(defaultFormValues.documents[0] as object);
        const data = await Promise.all(
            formData.documents.map(async (document) => {
                return {
                    fileData: (await readFromFile(document.file[0])) as FileResult,
                    language: document.language,
                };
            }),
        );
        const hookToUpload = {
            name: formData.documentName,
            type: formData.documentType,
            contents: data?.map((element) => {
                return {
                    data: element.fileData.data,
                    actions: element.fileData.actions,
                    language: element.language,
                };
            }),
        };

        newDocument.mutate({ data: hookToUpload });

        reset();
    };

    if (newDocument.isLoading) {
        return (
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress sx={{ mt: '80px' }} />{' '}
            </Container>
        );
    }

    if (newDocument.isError) {
        return (
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="body1" sx={{ fontSize: '1.2rem', mb: '80px' }}>
                    Nie udało się wysłać dokumentu
                </Typography>
                <Button variant="contained" onClick={() => newDocument.reset()}>
                    Dodaj więcej dokumentów
                </Button>
            </Container>
        );
    }

    if (newDocument.isSuccess) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ marginTop: '50px', fontSize: '1.5rem', marginBottom: '50px' }}>
                    Pomyślnie wysłano dokument
                </Box>
                <Button variant="contained" onClick={() => newDocument.reset()}>
                    Dodaj więcej dokumentów
                </Button>
            </Box>
        );
    }
    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
            <Container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '50%',
                    alignSelf: 'center',
                    flexDirection: 'column',
                    marginBottom: '25px',
                    gap: '8px',
                }}
            >
                <Label>Rodzaj Dokumentu</Label>
                <Select
                    className="document-select-form"
                    {...register(`documentType`)}
                    defaultValue="terms"
                    sx={{ width: '300px', textAlign: 'center' }}
                >
                    <MenuItem style={{ fontSize: '14px' }} value="terms">
                        Regulamin
                    </MenuItem>
                    <MenuItem style={{ fontSize: '14px' }} value="policy">
                        Polityka Prywatności
                    </MenuItem>
                </Select>
                <Box>
                    <Label>Nazwa Dokumentu</Label>
                    <Tooltip
                        sx={{ position: 'absolute', paddingLeft: '5px' }}
                        title="Nazwa dokumentu jest wymagana aby ułatwić rozróżnienie wgranych plików w przypadku operowania na nich w innych miejscach aplikacji."
                    >
                        <InfoIcon color="primary" fontSize="small" />
                    </Tooltip>
                </Box>
                <Input
                    className="document-input-form document-select-form"
                    disableUnderline={true}
                    sx={{ textAlign: 'center', fontSize: '14px', width: '300px' }}
                    {...register(`documentName`)}
                    type="text"
                    required
                />
            </Container>
            <Container
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '0.5fr 1fr 1fr 0.5fr',
                    gap: 2,
                    mb: '10px',
                    justifyItems: 'center',
                }}
            >
                <Label>Kod Językowy</Label>
                <Label>Plik z dokumentem</Label>
                <Label>Podgląd pliku</Label>
            </Container>

            <UploadFormFields
                control={control}
                fields={fields}
                register={register}
                remove={remove}
                getValues={getValues}
            />
            {errors?.documents && (
                <Typography variant="body1" sx={{ textAlign: 'center', margin: '25px 0 35px', fontSize: '1.5rem' }}>
                    Języki nie mogą się powtarzać!
                </Typography>
            )}

            <Button
                variant="contained"
                type="button"
                onClick={() => append(defaultFormValues.documents[0] as object)}
                sx={{ margin: '0 auto', bg: `${fields.length >= availableLanguages?.length ? 'grey' : 'default'}` }}
                disabled={fields.length >= availableLanguages?.length ? true : false}
            >
                Dodaj kolejny język
            </Button>
            <br />
            <Button variant="contained" color="success" type="submit" sx={{ margin: '0 auto' }}>
                Wyślij
            </Button>
        </Box>
    );
};

export default UploadDocumentForm;

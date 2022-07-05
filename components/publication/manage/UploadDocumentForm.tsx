import React, { useContext, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button, Box, Select, Input, Container, Typography } from '@mui/material/';
import styled from '@emotion/styled';

import { readFromFile } from '../../../helpers/readFromFile';
import { UploadFormProps, UploadFormValues } from '../../typings/PublicationSection';
import DocumentUploadProgress from './DocumentUploadProgress';
import { DocumentUploadContext } from '../../../components/contexts/publication/DocumentUpload';
import UploadFormFields from './UploadFormFields';
import { errorHandler } from '../../contexts/translation';

const Label = styled.label`
    margin: 0 auto;
`;

const UploadDocumentForm: React.FC<UploadFormProps> = ({ loadingError }) => {
    const [message, setMessage] = useState<String>('');
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const { defaultFormValues, availableLanguages, postLegalDocument } = useContext(DocumentUploadContext);

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
        setMessage('');
        remove();
        append(defaultFormValues.documents[0] as object);
        setIsLoading(true);

        const data = await Promise.all(
            formData.documents.map(async (document) => {
                return {
                    language: document.language,
                    data: await readFromFile(document.file[0]),
                    actions: await readFromFile(document.actions[0]),
                };
            }),
        ).catch((error) => {
            setIsLoading(true);
            setMessage('Nie udało się załadować danych z pliku');
        });
        const objToUpload = {
            name: formData.documentName,
            type: formData.documentType,
            contents: data,
        };

        try {
            const response: unknown = await postLegalDocument(objToUpload);
            errorHandler(response as Response);
            setMessage('Pomyślnie wysłano dokument.');
        } catch (error) {
            setMessage(`Dokument nie został wysłany: ${error.message}`);
        }
        reset();
    };

    if (isLoading) {
        return <DocumentUploadProgress message={message} setIsLoading={setIsLoading} />;
    } else if (loadingError) {
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
                    Nie udało połączyć się z serwerem
                </Typography>
            </Container>
        );
    }
    return (
        <Box
            // as="form"
            sx={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit(onSubmit)}
        >
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
                <Select {...register(`documentType`)} sx={{ width: '200px', textAlign: 'center' }}>
                    <option value="terms">Regulamin</option>
                    <option value="policy">Polityka Prywatności</option>
                </Select>
                <Label>Nazwa Dokumentu</Label>

                <Input sx={{ textAlign: 'center' }} {...register(`documentName`)} type="text" required />
            </Container>
            <Container
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '0.5fr 1fr 1fr 0.25fr',
                    gap: 2,
                    mb: '10px',
                    justifyItems: 'center',
                }}
            >
                <Label>Kod Językowy</Label>
                <Label>Plik z dokumentem</Label>
                <Label>Plik z akcjami</Label>
            </Container>

            <UploadFormFields
                fields={fields}
                register={register}
                remove={remove}
                availableLanguages={availableLanguages}
                getValues={getValues}
                errors={errors}
            />
            {errors?.documents && (
                <Typography variant="body1" sx={{ textAlign: 'center', margin: '25px 0 35px', fontSize: '1.5rem' }}>
                    Języki nie mogą się powtarzać!
                </Typography>
            )}

            <Button
                type="button"
                onClick={() => append(defaultFormValues.documents[0] as object)}
                sx={{ margin: '0 auto', bg: `${fields.length >= availableLanguages?.length ? 'grey' : 'default'}` }}
                disabled={fields.length >= availableLanguages?.length ? true : false}
            >
                Dodaj kolejny język
            </Button>
            <br />
            <Button type="submit" sx={{ margin: '0 auto' }}>
                Wyślij
            </Button>
        </Box>
    );
};

export default UploadDocumentForm;

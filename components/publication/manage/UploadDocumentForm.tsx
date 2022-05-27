import React, { useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Grid, Label, Button, Box } from 'theme-ui';

import { readFromFile } from '../../../helpers/readFromFile';
import { FormValues } from '../../typings/PublicationSection';
import DocumentUploadProgress from './DocumentUploadProgress';
import { DocumentUploadContext } from '../../../components/contexts/publication/DocumentUpload';
import UploadFormFields from './UploadFormFields';

const LegalUpdateForm: React.FC = () => {
    const {
        defaultFormValues,
        message,
        setMessage,
        isLoading,
        setIsLoading,
        availableLanguages,
        postLegalDocument,
        errorHandler,
    } = useContext(DocumentUploadContext);

    const { control, handleSubmit, register } = useForm<FormValues>({
        defaultValues: defaultFormValues as FormValues,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'documents',
    });

    const onSubmit = (formData: FormValues) => {
        remove();
        append(defaultFormValues.documents[0] as object);
        setMessage([]);
        setIsLoading(true);
        formData.documents.forEach(async (document) => {
            const objToUpload = {
                name: document.documentName,
                type: document.documentType,
                contents: [
                    {
                        language: document.language,
                        data: await readFromFile(document.file[0]),
                        actions: await readFromFile(document.actions[0]),
                    },
                ],
            };
            try {
                const response = await postLegalDocument(objToUpload);
                errorHandler(response);
                setMessage((prev) => [...prev, `Dokument ${document.documentName} został pomyślnie wysłany!`]);
            } catch (error) {
                setMessage((prev) => [...prev, `Dokument ${document.documentName} nie został wysłany! ${error}`]);
            }
        });
    };

    return isLoading ? (
        <DocumentUploadProgress message={message} setIsLoading={setIsLoading} fields={fields} />
    ) : (
        <Box as="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
            <Grid gap={2} columns="0.3fr 0.5fr 1fr 1fr 1fr 0.25fr" marginBottom="10px">
                <Label>Kod Językowy</Label>
                <Label>Rodzaj Dokumentu</Label>
                <Label>Nazwa Dokumentu</Label>
                <Label>Plik z dokumentem</Label>
                <Label>Plik z akcjami</Label>
            </Grid>

            <UploadFormFields
                fields={fields}
                register={register}
                remove={remove}
                availableLanguages={availableLanguages}
            />
            <Button
                type="button"
                bg={fields.length >= 6 ? 'grey' : 'default'}
                onClick={() => append(defaultFormValues.documents[0] as object)}
                sx={{ margin: '0 auto' }}
                disabled={fields.length >= 6 ? true : false}
            >
                Dodaj kolejny plik
            </Button>
            <br />
            <Button type="submit" sx={{ margin: '0 auto' }}>
                Wyślij
            </Button>
        </Box>
    );
};

export default LegalUpdateForm;

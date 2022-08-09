import React, { useContext, useEffect, useState } from 'react';
import { Container, Select, Button, MenuItem, Box } from '@mui/material/';

import { sortLanguages } from '../../../helpers/sortLanguages';
import { DocumentUploadContext } from '../../contexts/publication/DocumentUpload';
import { Control, FieldArrayWithId, FieldValue, UseFormRegister } from 'react-hook-form/dist/types';
import { AvailableLanguages, UploadFormValues } from '../../typings/PublicationSection';
import { Controller } from 'react-hook-form';

interface IProps {
    fields: FieldArrayWithId<FieldValue<String>>[];
    register: UseFormRegister<UploadFormValues>;
    remove(index: number): void;
    getValues(arg0: string): string | number | boolean;
    control: Control<UploadFormValues, object>;
}

const UploadFormFields: React.FC<IProps> = ({ fields, register, remove, getValues, control }) => {
    const { appConfig } = useContext(DocumentUploadContext);
    const [activeFile, setActiveFile] = useState(null);
    const [sortedLanguages, setSortedLanguages] = useState<AvailableLanguages[]>([
        {
            name: 'pl',
            displayName: 'pl',
        },
    ]);

    useEffect(() => {
        if (appConfig.isFetched) setSortedLanguages(sortLanguages(appConfig.data?.langs));
    }, [appConfig]);

    return (
        <>
            {fields.map((field: any, index: number) => (
                <Container
                    sx={{ display: 'grid', gridTemplateColumns: '0.5fr 1fr 1fr 0.5fr', gap: 2, mb: '25px' }}
                    key={field.id}
                >
                    <Controller
                        name={`documents.${index}.language`}
                        control={control}
                        render={({ field }) => (
                            <Select
                                onChange={field.onChange}
                                className="document-select-form"
                                defaultValue={sortedLanguages[0].name}
                                sx={{ textAlign: 'center' }}
                            >
                                {sortedLanguages.map((language) => (
                                    <MenuItem style={{ fontSize: '14px' }} key={language.name} value={language.name}>
                                        {language.name.toUpperCase()}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                        rules={{
                            validate: (v) => {
                                for (let x = 0; x < index; x++) {
                                    if (v === getValues(`documents.${x}.language`)) return false;
                                }
                            },
                        }}
                    />

                    <input
                        {...register(`documents.${index}.file`)}
                        type="file"
                        accept="*/.json"
                        multiple={false}
                        required
                        hidden
                        id={`documents.${index}.file`}
                        onInput={(e) => setActiveFile((e.target as any).files[0].name)}
                    />
                    <label htmlFor={`documents.${index}.file`}>
                        <Button component="span" sx={{ width: '100%' }} variant="contained">
                            Dodaj plik
                        </Button>
                    </label>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            borderRadius: '4px',
                            border: '1px solid #cccccc',
                        }}
                    >
                        {activeFile}
                    </Box>

                    {index >= 1 && (
                        <Button variant="contained" color="error" type="button" onClick={() => remove(index)}>
                            Usuń
                        </Button>
                    )}
                </Container>
            ))}
        </>
    );
};

export default UploadFormFields;

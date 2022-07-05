import React from 'react';
import { Container, Input, Select, Button } from '@mui/material/';

import { sortLanguages } from '../../../helpers/sortLanguages';
import { UploadFormFieldsProps } from '../../typings/PublicationSection';

const UploadFormFields: React.FC<UploadFormFieldsProps> = ({
    fields,
    register,
    remove,
    availableLanguages,
    getValues,
}) => {
    return (
        <>
            {fields.map((field: any, index: number) => (
                <Container
                    sx={{ display: 'grid', gridTemplateColumns: '0.5fr 1fr 1fr 0.25fr', gap: 2, mb: '25px' }}
                    key={field.id}
                >
                    <Select
                        {...register(`documents.${index}.language`, {
                            validate: (v) => {
                                for (let x = 0; x < index; x++) {
                                    if (v === getValues(`documents.${x}.language`)) return false;
                                }
                            },
                        })}
                        sx={{ textAlign: 'center' }}
                    >
                        {sortLanguages(availableLanguages)?.map((language) => (
                            <option key={language.name as string} value={language.name as string}>
                                {language.name.toUpperCase()}
                            </option>
                        ))}
                    </Select>
                    <Input
                        {...register(`documents.${index}.file`)}
                        type="file"
                        accept="*/.json"
                        multiple={false}
                        required
                    />
                    <Input
                        {...register(`documents.${index}.actions`)}
                        type="file"
                        accept="*/.json"
                        multiple={false}
                        required
                    />
                    {index >= 1 && (
                        <Button type="button" onClick={() => remove(index)}>
                            Usuń
                        </Button>
                    )}
                </Container>
            ))}
        </>
    );
};

export default UploadFormFields;

import React from 'react';
import { Grid, Input, Select, Button } from 'theme-ui';
import { UploadFormFieldsProps } from '../../typings/PublicationSection';

const UploadFormFields: React.FC<UploadFormFieldsProps> = ({ fields, register, remove, availableLanguages }) => {
    return fields.map((field, index) => {
        return (
            <Grid gap={2} columns="0.3fr 0.5fr 1fr 1fr 1fr 0.25fr" marginBottom="25px" key={field.id}>
                <Select {...register(`documents.${index}.language`)}>
                    {availableLanguages
                        ?.sort((a) => (a.name === 'pl' ? -1 : 1))
                        // sorting so pl is default value
                        .map((language) => (
                            <option key={language.name} value={language.name}>
                                {language.name.toUpperCase()}
                            </option>
                        ))}
                </Select>
                <Select {...register(`documents.${index}.documentType`)}>
                    <option value="terms">Regulamin</option>
                    <option value="policy">Polityka Prywatności</option>
                </Select>
                <Input {...register(`documents.${index}.documentName`)} type="text" required />
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
            </Grid>
        );
    });
};

export default UploadFormFields;

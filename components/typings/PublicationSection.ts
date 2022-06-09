import React, { SetStateAction } from "react";
import {  FieldArrayWithId, FieldError, FieldValue, UseFormRegister } from "react-hook-form";

export interface DocumentUploadProgressProps {
    message: String,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>
}

export type FormValues = {
    documentType: 'terms' | 'policy' | string;
    documentName: string;

    documents: {
        language: string;
        file: string;
        actions: {
            type: 'internal_uri' | 'external_uri' | 'email',
            value: string,
            text: string,
            match: string,
        }[]
    }[];
};

export interface AvailableLanguages {
   name: String,
    displayName: String
}

export interface DocumentUploadContextProps {
    defaultFormValues: FormValues;
    availableLanguages: AvailableLanguages[],
    setAvailableLanguages: React.Dispatch<React.SetStateAction<AvailableLanguages[]>>;
    postLegalDocument(data: object): void;
    getAvailableLanguages(setter: React.Dispatch<SetStateAction<AvailableLanguages[]>>): Promise<void>;
};

export interface UploadFormFieldsProps {
    fields: FieldArrayWithId<FieldValue<String>>[],
    register: UseFormRegister<FormValues>,
    remove(index: number): void,
    availableLanguages: 
    {
        name: String;
        displayName: String;
    }[],
    getValues(arg0: string): string | number | boolean,
 errors: {
        documentType?: FieldError;
        documentName?: FieldError;
        documents?: {
            language?: FieldError;
            file?: FieldError;
            actions?: {
                type?: FieldError;
                value?: FieldError;
                text?: FieldError;
                match?: FieldError;
            }[];
        }[];
    }
}
}

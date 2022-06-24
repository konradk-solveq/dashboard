import React, { SetStateAction } from "react";
import {  Control, FieldArrayWithId, FieldError, FieldErrors, FieldValue, UseFormClearErrors, UseFormGetValues, UseFormProps, UseFormRegister, UseFormReset, UseFormReturn, UseFormSetValue, UseFormStateReturn, UseFormTrigger, UseFormWatch } from "react-hook-form";

export interface DocumentUploadProgressProps {
    message: String,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>
}

export interface UploadFormValues {
    documentName: string,
    documentType: string,
    documents: {
        language: string;
        file: string;
        actions: {
            type: 'internal_uri',
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
    defaultFormValues: UploadFormValues;
    availableLanguages: AvailableLanguages[],
    setAvailableLanguages: React.Dispatch<React.SetStateAction<AvailableLanguages[]>>;
    postLegalDocument(data: object): void;
    getAvailableLanguages(setter: React.Dispatch<SetStateAction<AvailableLanguages[]>>): Promise<void>;
};

export interface UploadFormProps {
    loadingError: Boolean
}
export interface ManagePublicationContextProps {
    defaultValues: PublishFormValues;
    availableFiles: AvailableFiles[],
    setAvailableFiles: React.Dispatch<React.SetStateAction<AvailableFiles[]>>;
    postPublication(data: PublishFormSubmission): Promise<Response>;
    getAvailableFiles(type: 'privacy' | 'terms'): Promise<void>;
    publishFormMethods: UseFormReturn<PublishFormValues>
};

export interface PublishFormValues {
    publicationType: string,
    current: number,
    next: number,
    showDate: Date,
    publicationDate: Date,
    draft: boolean,
    fallbackLanguage: String,
};

export interface AvailableFiles {
    id: number,
    name: string,
    type: 'terms' | 'policy',
    contents: {language: string;
    documentType: 'terms' | 'policy';
    documentName: string;
    file: string;
    actions: {
        type: 'internal_uri',
        value: string,
        text: string,
        match: string,
    }[]}[]
}

export interface PublishFormSubmission {
    type: string,
    pair: {
        oldDocumentId: number,
        newDocumentId: number,
    }
    showDate: Date,
    draft: boolean,
    publicationDate: Date,
    fallbackLanguage: String,
}

export type ActiveSteps = 0 | 1 | 2 | 3 | 4 | 5

export type Steps = [React.ReactElement<Step0Props>, React.ReactElement, React.ReactElement, React.ReactElement, React.ReactElement, React.ReactElement<SubmittedProps>]

export type Step0Props = {
    handlePublicationTypeSelect(e: React.MouseEvent<HTMLButtonElement>): Promise<void>
}

export type Step1Props = {
    availableFiles: AvailableFiles
}

export type SubmittedProps = {
    isError: Boolean
}
export interface UploadFormFieldsProps {
    fields: FieldArrayWithId<FieldValue<String>>[],
    register: UseFormRegister<UploadFormValues>,
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

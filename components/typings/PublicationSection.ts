import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import React, { SetStateAction } from "react";
import {  DeepRequired, FieldArrayWithId, FieldError,  FieldErrorsImpl,  FieldValue, UseFormRegister, UseFormReturn} from "react-hook-form";
import { Files } from "./ManagePublications";

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

export interface PostPublicationContextProps {
    defaultValues: PublishFormValues;
    files: {policy: UseQueryResult<Files['policy']>, terms: UseQueryResult<Files['terms']>},
    postPublicationMutation: UseMutationResult,
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
    type: string,
    contents: {language: string;
    documentType: string;
    documentName: string;
    file: string;
    actions: {
        type: string,
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
    handlePublicationTypeSelect(e: React.MouseEvent<HTMLButtonElement>): void
}

export type Step1Props = {
    activeFiles: Files['policy'] | Files['terms']
}

export type Step3Props = {
    activeFiles: Files['policy'] | Files['terms']
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
 errors: FieldErrorsImpl<DeepRequired<UploadFormValues>>
}

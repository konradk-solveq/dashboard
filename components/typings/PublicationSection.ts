import React from "react";

export interface DocumentUploadProgressProps {
    message: any [],
    fields: any [],
    setIsLoading: React.Dispatch<React.SetStateAction<any>>
}

export type FormValues = {
    documents: {
        language: string;
        documentType: 'terms' | 'policy';
        documentName: string;
        file: string;
        actions: {
            type: 'internal_uri/deeplink',
            value: string,
            text: string,
            match: string,
        }[]
    }[];
};

export interface UploadFormFieldsProps {
    fields: any,
    register: any,
    remove(index: number): void,
    availableLanguages: 
    {
        name: string;
        displayName: string;
    }[],
}
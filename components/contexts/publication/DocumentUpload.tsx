import React, { createContext, useState } from 'react';

import { FormValues, DocumentUploadContextProps, AvailableLanguages } from '../../typings/PublicationSection';

const defaultFormValues: FormValues = {
    documentName: '',
    documentType: '',
    documents: [
        {
            language: 'pl',
            file: null,
            actions: [
                {
                    type: 'internal_uri',
                    value: '',
                    text: '',
                    match: '',
                },
            ],
        },
    ],
};

const postLegalDocument = async (data: object) =>
    await fetch(`/api/publications/manage/documents`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
    });

export const DocumentUploadContext = createContext<DocumentUploadContextProps>(null!);

const getAvailableLanguages = async (setter: React.Dispatch<React.SetStateAction<AvailableLanguages[]>>) => {
    const data = await fetch(`/api/application/config`);
    const result = await data.json();
    return setter(result.langs);
};

const DocumentUploadContainer: React.FC = ({ children }) => {
    const [availableLanguages, setAvailableLanguages] = useState<AvailableLanguages[]>([
        {
            name: '',
            displayName: '',
        },
    ]);

    return (
        <DocumentUploadContext.Provider
            value={{
                defaultFormValues,
                availableLanguages,
                setAvailableLanguages,
                getAvailableLanguages,
                postLegalDocument,
            }}
        >
            {children}
        </DocumentUploadContext.Provider>
    );
};

export default DocumentUploadContainer;

import { createContext, useState } from 'react';
import { FormValues } from '../../typings/PublicationSection';

type DocumentUploadContextProps = {
    defaultFormValues: FormValues;
    isLoading: boolean;
    message: string[];
    setMessage: React.Dispatch<React.SetStateAction<any>>;
    setIsLoading: React.Dispatch<React.SetStateAction<any>>;
    setAvailableLanguages: React.Dispatch<React.SetStateAction<any>>;
    availableLanguages: {
        name: string;
        displayName: string;
    }[];
    errorHandler(response: any): void;
    postLegalDocument(data: object): void;
    getAvailableLanguages(): void;
};

const defaultFormValues: FormValues = {
    documents: [
        {
            language: 'pl',
            documentType: 'terms',
            documentName: '',
            file: null,
            actions: [
                {
                    type: 'internal_uri/deeplink',
                    value: '',
                    text: '',
                    match: '',
                },
            ],
        },
    ],
};

const postLegalDocument = async (data: object) =>
    await fetch(`/api/publication/manage/document`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
    });
function errorHandler({ status, statusText }) {
    if (status >= 400) {
        throw new Error(statusText);
    }
}

export const DocumentUploadContext = createContext<DocumentUploadContextProps>(null!);

const DocumentUploadContainer: React.FC<{}> = ({ children }) => {
    const [message, setMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [availableLanguages, setAvailableLanguages] = useState([
        {
            name: '',
            displayName: '',
        },
    ]);

    const getAvailableLanguages = async () => {
        const data = await fetch(`/api/application/config`);
        const result = await data.json();
        return setAvailableLanguages(result.langs);
    };

    return (
        <DocumentUploadContext.Provider
            value={{
                defaultFormValues,
                message,
                setMessage,
                isLoading,
                setIsLoading,
                availableLanguages,
                setAvailableLanguages,
                getAvailableLanguages,
                postLegalDocument,
                errorHandler,
            }}
        >
            {children}
        </DocumentUploadContext.Provider>
    );
};

export default DocumentUploadContainer;

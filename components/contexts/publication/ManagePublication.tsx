import React, { createContext, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

import {
    PublishFormValues,
    PublishFormSubmission,
    AvailableFiles,
    ManagePublicationContextProps,
} from '../../typings/PublicationSection';

const defaultValues: PublishFormValues = {
    publicationType: '',
    current: 0,
    next: 0,
    showDate: new Date(),
    publicationDate: new Date(),
    draft: false,
    fallbackLanguage: '',
};

const postPublication = async (data: PublishFormSubmission) =>
    await fetch(`/api/publications/manage`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
    });

export const ManagePublicationContext = createContext<ManagePublicationContextProps>(null!);

const ManagePublicationContainer: React.FC = ({ children }) => {
    const [availableFiles, setAvailableFiles] = useState<AvailableFiles[]>([]);

    const getAvailableFiles = async (type: 'privacy' | 'terms') => {
        const data = await fetch(`/api/publications/manage/documents?type=${type}`);
        const result = await data.json();
        setAvailableFiles(await result);
    };

    const publishFormMethods = useForm({
        defaultValues: defaultValues,
    });

    return (
        <ManagePublicationContext.Provider
            value={{
                availableFiles,
                setAvailableFiles,
                publishFormMethods,
                defaultValues,
                postPublication,
                getAvailableFiles,
            }}
        >
            {children}
        </ManagePublicationContext.Provider>
    );
};

export default ManagePublicationContainer;

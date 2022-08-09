import { useMutation, UseMutationResult, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext } from 'react';
import useAppConfig from '../../services/useConfig';
import { Config } from '../../typings/Notifications';

import { UploadFormValues } from '../../typings/PublicationSection';
import endpoints from '../../utils/apiEndpoints';

const defaultFormValues: UploadFormValues = {
    documentName: '',
    documentType: 'terms',
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

interface IProps {
    defaultFormValues: UploadFormValues;
    appConfig: UseQueryResult<Config>;
    newDocument: UseMutationResult;
}

const postLegalDocument = async ({ data }) => axios.post(endpoints.documents, data);

export const DocumentUploadContext = createContext<IProps>(null!);

const DocumentUploadContainer: React.FC = ({ children }) => {
    const queryClient = useQueryClient();
    const appConfig = useAppConfig();

    const newDocument = useMutation(postLegalDocument, {
        onSuccess: () => {
            queryClient.invalidateQueries(['policies']);
            queryClient.invalidateQueries(['terms']);
        },
    });

    return (
        <DocumentUploadContext.Provider
            value={{
                defaultFormValues,
                appConfig,
                newDocument,
            }}
        >
            {children}
        </DocumentUploadContext.Provider>
    );
};

export default DocumentUploadContainer;

import { useMutation, UseMutationResult, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import React, { createContext, SetStateAction, useState } from 'react';
import useFiles from '../../services/useFiles';
import usePaginatedQuery from '../../services/usePaginatedQuery';
import { Files, Params, Publications } from '../../typings/ManagePublications';
import endpoints from '../../utils/apiEndpoints';

interface IProps {
    params: Params;
    setParams: React.Dispatch<SetStateAction<Params>>;
    publications: UseQueryResult<Publications>;
    files: {
        policy: UseQueryResult<Files['policy']>;
        terms: UseQueryResult<Files['terms']>;
    };
    publicationMutation: UseMutationResult;
    publicationDeletion: UseMutationResult<AxiosResponse, any>;
}

export const ManagePublicationsContext = createContext<IProps>(null!);

const putPublication = ({ id, data }) => {
    return axios.put(`${endpoints.publications}/${id}`, data);
};

const deletePublication = ({ id }) => {
    return axios.delete(`${endpoints.publications}/${id}`);
};

const ManagePublicationsContainer: React.FC = ({ children }) => {
    const queryClient = useQueryClient();

    const [params, setParams] = useState({
        page: 1,
        order: 'DESC',
        orderBy: 'showDate',
        type: '',
        limit: 10,
    });

    const { page, limit, type, order, orderBy } = params;

    const files = useFiles();
    const publications = usePaginatedQuery('publications', endpoints.publications, page, limit, type, order, orderBy);

    const publicationMutation = useMutation(putPublication, {
        onSuccess: () => {
            queryClient.invalidateQueries(['publications']);
        },
    });

    const publicationDeletion = useMutation(deletePublication, {
        onSuccess: () => queryClient.invalidateQueries(['publications']),
    });

    return (
        <ManagePublicationsContext.Provider
            value={{
                params,
                setParams,
                publications,
                files,
                publicationMutation,
                publicationDeletion,
            }}
        >
            {children}
        </ManagePublicationsContext.Provider>
    );
};

export default ManagePublicationsContainer;

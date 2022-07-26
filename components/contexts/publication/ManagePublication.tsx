import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext, useState } from 'react';
import useFiles from '../../services/useFiles';
import usePublications from '../../services/usePublications';
import { ManagePublicationsContextProps } from '../../typings/ManagePublications';
import endpoints from '../../utils/apiEndpoints';

export const ManagePublicationsContext = createContext<ManagePublicationsContextProps>(null!);

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
        order: 'ASC',
        orderBy: 'showDate',
        type: 'policy',
        limit: 10,
    });

    const files = useFiles();
    const publications = usePublications(params.page, params.limit, params.type, params.order, params.orderBy);

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

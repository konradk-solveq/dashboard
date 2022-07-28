import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext } from 'react';
import { useForm } from 'react-hook-form';
import useFiles from '../../services/useFiles';

import { PublishFormValues, PostPublicationContextProps } from '../../typings/PublicationSection';
import endpoints from '../../utils/apiEndpoints';

const defaultValues: PublishFormValues = {
    publicationType: '',
    current: 0,
    next: 0,
    showDate: new Date(),
    publicationDate: new Date(),
    draft: false,
    fallbackLanguage: '',
};

const postPublication = ({ data }) => {
    return axios.post(`${endpoints.publications}`, data);
};

export const PostPublicationContext = createContext<PostPublicationContextProps>(null!);

const PostPublicationContainer: React.FC = ({ children }) => {
    const files = useFiles();

    const postPublicationMutation = useMutation(postPublication);

    const publishFormMethods = useForm({
        defaultValues: defaultValues,
    });

    return (
        <PostPublicationContext.Provider
            value={{
                files,
                publishFormMethods,
                defaultValues,
                postPublicationMutation,
            }}
        >
            {children}
        </PostPublicationContext.Provider>
    );
};

export default PostPublicationContainer;

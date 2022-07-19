import React, { createContext, SetStateAction, useState } from 'react';
import { ManagePublicationsContextProps, Publication, Results } from '../../typings/ManagePublications';

const urls = {
    terms: `/api/publications/manage/documents?type=terms`,
    policy: `/api/publications/manage/documents?type=policy`,
};

export const ManagePublicationsContext = createContext<ManagePublicationsContextProps>(null!);

const ManagePublicationsContainer: React.FC = ({ children }) => {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [results, setResults] = useState<Results>();
    const [prevPageURL, setPrevPageURL] = useState<Object>();
    const [nextPageURL, setNextPageURL] = useState<Object>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<ManagePublicationsContextProps['errorMessage']>({
        status: null,
        statusText: '',
    });
    const [sortParams, setSortParams] = useState({
        defaultURL: '/api/publications/manage?page=1&limit=10',
        sort: 'ASC',
        sortBy: 'showDate',
        type: 'policy',
    });

    const putPublication = async (data: object, id: number) => {
        setIsLoading(true);
        try {
            return await fetch(`/api/publications/manage/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'content-type': 'application/json' },
            });
        } catch {
            setIsLoading(false);
            setIsError(true);
        }
    };
    const deletePublication = async (id: number) => {
        setIsLoading(true);
        try {
            return fetch(`/api/publications/manage/${id}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' },
            });
        } catch {
            setIsLoading(false);
            setIsError(true);
        }
    };
    const fetchApis = async () => {
        const responses = await Promise.all(
            Object.entries(urls).map(async ([key, url]) => {
                const res = await fetch(url);
                if (res.status >= 400) {
                    setIsError(true);
                    setErrorMessage({ status: res.status, statusText: res.statusText });
                }
                return [key, await res.json()];
            }),
        );
        setResults(Object.fromEntries(responses));
    };

    const getPublications = async (defaultUrl?: string, sort?: string, sortBy?: string, type?: string) => {
        if (!defaultUrl) {
            defaultUrl = sortParams.defaultURL;
        }
        if (!sort) {
            sort = sortParams.sort;
        }

        if (!sortBy) {
            sortBy = sortParams.sortBy;
        }

        if (!type) {
            type = sortParams.type;
        }

        setSortParams({
            defaultURL: defaultUrl,
            sort: sort,
            sortBy: sortBy,
            type: type,
        });

        const res = await fetch(`${defaultUrl}&type=${type}&order=${sort}&orderBy=${sortBy}`);
        const data = await res.json();

        setPrevPageURL(data?.links?.prev);
        setNextPageURL(data?.links?.next);
        setPublications(data.elements);
    };

    const apiHandler = async (res: Response, id?: string, type?: string) => {
        if (res.status >= 400) {
            setIsError(true);
            setErrorMessage({ status: res.status, statusText: res.statusText });
        } else {
            if (type === 'delete') {
                setPublications((publications) => {
                    return publications.filter((item) => item.id !== id);
                });
            } else if (type === 'update') {
                const data = await res.json();
                setPublications((publications) => {
                    return publications.map((item) => (item.id === id ? data : item));
                });
            }

            setIsSuccess(true);
        }
        setIsLoading(false);
    };

    return (
        <ManagePublicationsContext.Provider
            value={{
                nextPageURL,
                prevPageURL,
                publications,
                getPublications,
                isLoading,
                fetchApis,
                results,
                apiHandler,
                putPublication,
                deletePublication,
                setIsLoading,
                isError,
                isSuccess,
                setIsSuccess,
                errorMessage,
                setIsError,
            }}
        >
            {children}
        </ManagePublicationsContext.Provider>
    );
};

export default ManagePublicationsContainer;

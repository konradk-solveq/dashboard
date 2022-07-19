import React, { SetStateAction } from "react"

export type Publication = {
    id: string,
    type: string,
    draft: boolean,
    fallbackLanguage: string,
    pair: {
        id: number,
        oldDocument: {
            id: number,
            name: string,
            type: string,
            contents: {
                id: number,
                language: string,
                data: object,
                actions: object[]
            }[]
        },
        newDocument: {
            id: number,
            name: string,
            type: string,
            contents: {
                id: number,
                language: string,
                data: object,
                actions: object[]
            }[]
        },
    },
    showDate: Date,
    publicationDate: Date,
}

export interface DeleteModalProps {
    item: Publication,
    setDeleteModalState: React.Dispatch<SetStateAction<Boolean>>
}

export interface ManagePublicationsRowProps {
    item: Publication
}

export type Results = {
    terms: {
        id: string,
        name: string,
        type: string,
        contents: object[]
    }[],
    policy: {
        id: string,
        name: string,
        type: string,
        contents: object[]
    }[]
}

export interface ManagePublicationsContextProps {
    nextPageURL: Object,
    prevPageURL: Object,
    publications: Publication[],
    getPublications: (defaultUrl?: string | Object, sort?: string, sortBy?: string, type?: string) => Promise<void>,
    isLoading: boolean,
    fetchApis: () => Promise<void>,
    results: Results,
    apiHandler: (res: Response, id?: string, type?: string) => Promise<void> | Publication[],
    putPublication:(data: object, id: number) => Promise<Response>,
    deletePublication: (id: string) => Promise<Response>,
    setIsLoading: React.Dispatch<SetStateAction<Boolean>>,
    isError: boolean,
    isSuccess: boolean,
    setIsSuccess: React.Dispatch<SetStateAction<Boolean>>,
    errorMessage: {
        status: number,
        statusText: string,
    },
    setIsError: React.Dispatch<SetStateAction<Boolean>>

}

export type SortFormValues = {
    type: string,
    limit: number,
    orderBy: string,
}

export type EditFormValues = {
    type: string,
    oldDocument: string,
    newDocument: string,
    showDate: Date,
    publicationDate: Date,
    draft: boolean,
    fallbackLanguage: string
}
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
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

export interface EditRowProps {
    item: Publication,
    setEditMode: React.Dispatch<SetStateAction<boolean>>,
}

export type Files = {
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

export type Params = {
    page: number,
    limit: number,
    type: string,
    order: string,
    orderBy: string,
}

type Publications = {
    elements: Publication[],
    limit: number,
    links: {
        prev?: URL,
        self: URL,
        next?: URL,
    }
    total: number,
}
export interface ManagePublicationsContextProps {
    params: Params,
    setParams: React.Dispatch<SetStateAction<Params>>,
    publications: UseQueryResult<Publications>,
    files: [UseQueryResult<Files['policy']>, UseQueryResult<Files['terms']>],
    publicationMutation: UseMutationResult,
    publicationDeletion: UseMutationResult<AxiosResponse, any>,
}

export type SortFormValues = {
    type: string,
    limit: number,
    orderBy: string,
}

export type EditFormValues = {
    type: string,
    oldDocument: string | number,
    newDocument: string | number,
    showDate: Date,
    publicationDate: Date,
    draft: boolean,
    fallbackLanguage: string
}
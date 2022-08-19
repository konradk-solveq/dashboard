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
    terms: Files['terms'],
    policy: Files['policy']
}

export type Files = {
    terms: {
        id: number,
        name: string,
        type: string,
        contents: [{language: string;
            documentType: 'terms' | 'policy';
            documentName: string;
            file: string;
            actions: {
                type: 'internal_uri',
                value: string,
                text: string,
                match: string,
            }[]}]
    }[],
    policy: {
        id: number,
        name: string,
        type: string,
        contents: [{language: string;
            documentType: 'terms' | 'policy';
            documentName: string;
            file: string;
            actions: {
                type: 'internal_uri',
                value: string,
                text: string,
                match: string,
            }[]}]
    }[]
}

export type Params = {
    page: number,
    limit: number,
    type: string,
    order: string,
    orderBy: string,
}

export type Publications = {
    elements: Publication[],
    limit: number,
    links: {
        prev?: URL,
        self: URL,
        next?: URL,
    }
    total: number,
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
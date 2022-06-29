import { StyledComponent } from "@emotion/styled";
import React, { DetailedHTMLProps, HTMLAttributes, SetStateAction } from "react";

export type ModalState = {
    show: boolean,
        type: 'edit/create' | 'delete' | 'error' | 'success',
}

export type ModalType =  ['edit/create', 'delete', 'error', 'success']

export interface DefaultWebhookFormValues{
    title: string,
    description: string,
    event: string,
    authType: string,
    authData: null,
}

export type Webhook = {
    id: string,
    event: string,
    metadata: {
        createdAt: Date,
        description: string,
        id: number,
        title: string
    }
    verificationData: string | null,
    verificationType: string[]
}

export type Auth = {
    verificationMethods: string[]
}

export type Events = {
    events: ['updateSettings', 'createAppVersionToPlatform'] | []
}

export type Results = {
    webhooks: Webhook[],
    auth: Auth,
    events: Events
}


export type ErrorMessage = [number, string] | []


export interface ManageWebhookContextProps {
    isLoading: boolean,
    setIsLoading: React.Dispatch<SetStateAction<Boolean>>
    clearError(): void,
    modalType:  ModalType,
    isError: boolean,
    fetchApis: (setter: React.Dispatch<SetStateAction<Results>>) => Promise<void>,
    manageModalState: (type?: string) => void
    apiHandler: ( req: Response, id?: string, type?: string) => Promise<void>,
    modalState: ModalState,
    setModalState: React.Dispatch<SetStateAction<ModalState>>,
    hookToEdit: Webhook | null,
    setHookToEdit: React.Dispatch<SetStateAction<Results['webhooks'] | null>>,
    results: Results,
    setResults: React.Dispatch<SetStateAction<Results>>,
    errorMessage: [number, string] | [],
    setErrorMessage: React.Dispatch<SetStateAction<[number, string]>>,
    putWebhook: (data: object, id: string) => Promise<Response>
    postWebhook: (data: object) => Promise<Response>,
    deleteWebhook
}
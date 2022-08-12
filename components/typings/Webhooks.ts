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
export interface LanguageType {
    name: string;
    displayName: string;
}

export type NotificationsType = {
    id: number;
    type: string;
    name: string;
    contents: {
        language: string;
        data: {
            title: string;
            text: string;
        };
    };
    showDate: string;
    expirationDate: string;
    draft: boolean;
    fallbackLanguage: string;
};

export type sortParamsType = {
    sortOrder: string;
    sortTypeOrder: string;
    type: string;
    defaultURL?: string;
};

export type LabelWithUndefined = { value?: string; label: string };

export type NotificationObjectType = {
    id?: number;
    type: 'promo' | 'info' | 'documents';
    name: string;
    contents: contentType[];
    showDate: Date;
    expirationDate: Date;
    draft: boolean;
    fallbackLanguage: string;
};

export type contentType = {
    language: string;
    data: { title: string; text: string };
    actions?: actionsType[];
};

export type actionsType = {
    type: notificationActionType;
    value: string;
    text: string;
    match: string;
};

export type SingleNotification = {
    id: number;
} & contentType;

export type GroupFormValues = {
    fallbackLanguage: LabelTypes;
    type: LabelTypes;
    showDate: Date;
    expDate?: Date;
    draft: boolean;
    id: number;
};

export interface LabelTypes {
    value: string;
    label: string;
}

export type FormValues = {
    id: number;
    title: string;
    message: string;
    language: { label: string; value: string };
};

export type notificationActionType = 'internal_uri' | 'external_uri' | 'email';

export type notificationDataType = Omit<NotificationObjectType, 'name' | 'contents'>;

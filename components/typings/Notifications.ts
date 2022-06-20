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

export interface LabelTypes {
    value: string;
    label: string;
}
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
    language: LanguageType;
    message: string;
    title: string;
};

export type GroupFormValues = {
    fallbackLanguage: string;
    type: string;
    showDate: string;
    expDate: string;
    draft: boolean;
    defaultValues: NotificationObjectType[];
};

export type notificationActionType = 'internal_uri' | 'external_uri' | 'email';

export type notificationDataType = Omit<NotificationObjectType, 'name' | 'contents'>;

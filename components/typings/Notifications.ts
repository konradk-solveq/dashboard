export interface LanguageType {
    name: string;
    displayName: string;
}


export interface Notification {
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

export type Notifications = {
    elements: Notification[],
    limit: number,
    links: {
        prev?: URL,
        self: URL,
        next?: URL,
    }
    total: number,
}

export type LabelWithUndefined = { value?: string; label: string };

export type NotificationObjectType = {
    id?: number;
    type: 'promo' | 'info' | 'documents';
    name: string;
    contents: ContentType[];
    showDate: Date;
    expirationDate: Date;
    draft: boolean;
    fallbackLanguage: string;
};

export type ContentType = {
    id: number;
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
} & ContentType;

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

export type Config = {
    name: string,
    lang: string,
    langs: {
        name:string,
        displayName: string,
    }[],
    tags: {
        enumValue: string,
        i18nValue: string,
    }[],
    surfaces: {
        enumValue: string,
        i18nValue: string,
    }[],
    difficulties: {
        enumValue: string,
        i18nValue: string,
    }[],
    version: string,
    reactions: {
        enumValue: string,
        i18nValue: string,
    }[],
    uiTranslations: {
        controlSums: {
            code: string,
            controlSum: string
        }[],
        codes: string[]
    },
    ads: object,
}

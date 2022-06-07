export type LanguageType = { name: string; displayName: string };

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

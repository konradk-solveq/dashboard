export const getAvailableLanguages = (langTypes?: LanguageType[]) => {
    return langTypes?.map((lang) => ({ value: lang.name, label: lang.displayName }));
};

export const getNotifications = (notificationsTypes: NoticationsType[]) => {
    return notificationsTypes.map((el) => ({
        id: el.id,
        fallbackLanguage: el.fallbackLanguage,
        type: el.type,
        expirationDate: el.expirationDate,
        showDate: el.showDate,
        notifications: el.contents,
        groupTitle: el.name,
        draft: el.draft,
    }));
};

export const typeOptions = [
    { value: 'documents', label: 'Dokument' },
    { value: 'info', label: 'Info' },
    { value: 'promo', label: 'Promocja' },
];

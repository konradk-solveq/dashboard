export const getAvailableLanguages = (langTypes?: LanguageType[]) => {
    return langTypes?.map((lang) => ({ value: lang.name, label: lang.displayName }));
};

export const typeOptions = [
    { value: 'documents', label: 'Dokument' },
    { value: 'info', label: 'Info' },
    { value: 'noType', label: 'Inny' },
];

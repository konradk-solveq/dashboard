import { parseISO } from 'date-fns';
import {
    LanguageType,
    NotificationsType,
    LabelTypes,
    NotificationObjectType,
    contentType,
    notificationDataType,
    LabelWithUndefined,
} from '../typings/Notifications';

export const getAvailableLanguages = (langTypes?: LanguageType[]) => {
    return langTypes?.map((lang) => ({ value: lang.name, label: lang.displayName }));
};

export const getNotifications = (notificationsTypes: NotificationsType[]) => {
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

export const typeOptions: LabelTypes[] = [
    { value: 'documents', label: 'Dokument' },
    { value: 'info', label: 'Info' },
    { value: 'promo', label: 'Promocja' },
];

export const sortingTypesDisplay: LabelWithUndefined[] = [
    { value: 'documents', label: 'Dokument' },
    { value: 'info', label: 'Info' },
    { value: 'promo', label: 'Promocja' },
    { label: 'Wszystkie' },
];

export const sortingByOrder: LabelTypes[] = [
    { value: 'DESC', label: 'Malejąco' },
    { value: 'ASC', label: 'Rosnąco' },
];

export const sortingByOrderType: LabelTypes[] = [
    { value: 'name', label: 'Nazwa' },
    { value: 'showDate', label: 'Data Pokazania' },
    { value: 'expirationDate', label: 'Data Wygaśnięcia' },
    { value: 'type', label: 'Typ' },
];

export const langOffline: LabelTypes[] = [
    { value: 'pl', label: 'Polski' },
    { value: 'en', label: 'Angielski' },
    { value: 'cs', label: 'Czeski' },
    { value: 'sk', label: 'Słowacki' },
    { value: 'sl', label: 'Słoweński' },
];

export let defaultFormValues = {
    type: { label: 'Wszystkie' },
    sortOrder: { value: 'ASC', label: 'Rosnąco' },
    sortTypeOrder: { value: 'name', label: 'Nazwa' },
};

export const notificationObject = (
    data: notificationDataType,
    notification: contentType,
    notifications: contentType[],
): NotificationObjectType => {
    const object = {
        type: data.type,
        name: notification.data.title,
        contents: notifications,
        showDate: data.showDate,
        expirationDate: data.expirationDate,
        draft: data.draft,
        fallbackLanguage: data.fallbackLanguage,
    };
    return object;
};

export const editedObject = (data, langObjects, typeObjects, undefinedDate) => {
    let object;
    try {
        object = {
            id: data.id,
            fallbackLanguage: displayLanguageLabel(langObjects, data),
            showDate: new Date(parseISO(data.showDate)),
            expDate: undefinedDate ? undefined : new Date(parseISO(data.expirationDate)),
            type: displayTypeLabel(typeObjects, data),
            draft: data.draft,
        };
    } catch (e) {
        console.log(e);
    }

    return object;
};

export const displayLanguageLabel = (objects, property) =>
    objects.find((lang) => lang.value === property.fallbackLanguage || property.language);

export const displayTypeLabel = (objects, property) => objects.find((type) => type.value === property.type);

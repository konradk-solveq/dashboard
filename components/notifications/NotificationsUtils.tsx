import { parseISO } from 'date-fns';
import {
    LanguageType,
    LabelTypes,
    NotificationObjectType,
    ContentType,
    notificationDataType,
    LabelWithUndefined,
    GroupFormValues,
} from '../typings/Notifications';

export const getAvailableLanguages = (availableLangsArray?: LanguageType[]) => {
    return availableLangsArray?.map((lang) => ({ value: lang.name, label: lang.displayName }));
};

export const typeOptions: LabelTypes[] = [
    { value: 'documents', label: 'Dokument' },
    { value: 'info', label: 'Info' },
    { value: 'promo', label: 'Promocja' },
];

export const sortingTypesDisplay: LabelTypes[] = [
    { value: 'documents', label: 'Dokument' },
    { value: 'info', label: 'Info' },
    { value: 'promo', label: 'Promocja' },
    { value: '', label: 'Wszystkie' },
];

export const orderOptions: LabelTypes[] = [
    { value: 'DESC', label: 'Malejąco' },
    { value: 'ASC', label: 'Rosnąco' },
];

export const orderByOptions: LabelTypes[] = [
    { value: 'name', label: 'Nazwa' },
    { value: 'showDate', label: 'Data Pokazania' },
    { value: 'expirationDate', label: 'Data Wygaśnięcia' },
    { value: 'type', label: 'Typ' },
];

export const sortOptions = {
    type: {
        description: 'Filtr:',
        options: sortingTypesDisplay,
    },

    orderBy: {
        description: 'Sortowanie:',
        options: orderByOptions,
    },

    order: {
        options: orderOptions,
    },
};

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
    notificationTitle: string,
    notifications: ContentType[],
): NotificationObjectType => {
    const object = {
        type: data.type,
        name: notificationTitle,
        contents: notifications,
        showDate: data.showDate,
        expirationDate: data.expirationDate,
        draft: data.draft,
        fallbackLanguage: data.fallbackLanguage,
    };
    return object;
};

export const parseNotification = (
    data: NotificationObjectType,
    langObjects: {
        value: string;
        label: string;
    }[],
    typeObjects: LabelTypes[],
    undefinedDate: boolean,
) => {
    let object: GroupFormValues;
    try {
        object = {
            id: data.id,
            fallbackLanguage: displayLanguageLabel(langObjects, data),
            showDate: new Date(parseISO(data.showDate as any) as Date),
            expDate: undefinedDate ? undefined : new Date(parseISO(data.expirationDate as any) as Date),
            type: displayTypeLabel(typeObjects, data),
            draft: data.draft,
        };
    } catch (e) {
        console.log(e);
    }

    return object;
};

export const displayLanguageLabel = (
    objects: {
        value: string;
        label: string;
    }[],
    property: any,
) => objects.find((lang) => lang.value === (property.fallbackLanguage || property.language));

export const displayTypeLabel = (objects: LabelTypes[], property: NotificationObjectType) =>
    objects.find((type) => type.value === property.type);

export const displaySortLabel = (objects: LabelWithUndefined[], property: string) =>
    objects.find((el) => el.value === property);

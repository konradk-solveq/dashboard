export class ImageData {
    url: string;
    width: number;
    height: number;
}

export class Variants {
    vertical: ImageData[];
    share: ImageData[];
    square: ImageData[];
    horizontal: ImageData[];
}

export class ImagesDTO {
    id: string;
    type: 'map' | 'photo';
    variants: Variants;
}

export class LocalizedEnum {
    enumValue: string;
    i18nValue: string;
}

export class LocalizedEnumOptionsArray<T> {
    options: LocalizedEnum[];
    values: T[];
}

export class ReactionsDTO {
    like: number;
    wow: number;
    love: number;
}

export class Route {
    public id: string;
    public name: string;
    author: string;
    difficulty?: LocalizedEnumOptionsArray<any>;
    ownerId: string;
    surface?: LocalizedEnumOptionsArray<any>;
    description?: {
        short: string;
        long: string;
    };
    tags: LocalizedEnumOptionsArray<any>;
    location: string;
    recommended: boolean;
    public path: Array<number[]>;
    public images: ImagesDTO[];
    distance: number;
    distanceToRoute?: number;
    time: number;
    isPublic: boolean;
    isFeatured: boolean;
    createdAt: Date;
    publishedAt: Date | null;
    downloads: number | null;
    reactions: ReactionsDTO;
    reaction: string;
}

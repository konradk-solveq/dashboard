export class Name {
    pl: string;
    en: string;
}

export class CreateFeaturedSectionDTO {
    readonly name: Name;
}

export class PatchFeaturedSectionDTO {
    readonly name?: Name;

    readonly isActive?: boolean;

    readonly order?: number;
}

export class AssignWithFeaturedSectionDTO {
    readonly routeId: string;
}

export class SimplifiedFeaturedRoute {
    featuredId: number;

    routeId: string;

    name: string;

    isPublic: boolean;

    isRecommended: boolean;
}

export class FeaturedSectionDTO {
    sectionId: number;

    sectionName: Name;

    isActive: boolean;

    order: number;

    routes?: SimplifiedFeaturedRoute[];
}

import { createContext } from 'react';
import { FeaturedSectionDTO, Name } from '../../typings/FeaturedSection';
import { Route } from '../../typings/Route';

type FeaturedSectionsProps = {
    updateName(section: FeaturedSectionDTO, name: Name): Promise<void>;
    moveUp(section: FeaturedSectionDTO): Promise<void>;
    moveDown(section: FeaturedSectionDTO): Promise<void>;
    toggle(section: FeaturedSectionDTO): Promise<void>;
    remove(section: FeaturedSectionDTO): Promise<void>;
    addRoute(section: FeaturedSectionDTO, route: { id: string }): Promise<void>;
    removeRoute(section: FeaturedSectionDTO, route: { id: string }): Promise<void>;
    create(): Promise<void>;
    sections: FeaturedSectionDTO[];
};
export const FeaturedSectionsContext = createContext<FeaturedSectionsProps>(null!);
FeaturedSectionsContext.displayName = 'FeaturedSectionsContext';

type FeaturedSectionProps = {
    setName: React.Dispatch<React.SetStateAction<Name>>;
    hasChanges: boolean;
    isLast: boolean;
    isFirst: boolean;
    section: FeaturedSectionDTO;
    actions: {
        moveUp(): Promise<void>;
        moveDown(): Promise<void>;
        toggle(): Promise<void>;
        remove(): Promise<void>;
        updateName(): Promise<void>;
        addRoute({ id: string }): Promise<void>;
        removeRoute({ id: string }): Promise<void>;
    };
    editRoutes: {
        enabled: boolean;
        toggle: () => void;
    };
};

export const FeaturedSectionContext = createContext<FeaturedSectionProps>(null!);
FeaturedSectionContext.displayName = 'FeaturedSectionContext';

type FeaturedSectionRouteSearchProps = {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    routes: Route[];
};

export const FeaturedSectionRouteSearchContext = createContext<FeaturedSectionRouteSearchProps>(null!);
FeaturedSectionRouteSearchContext.displayName = 'FeaturedSectionRouteSearchContext';

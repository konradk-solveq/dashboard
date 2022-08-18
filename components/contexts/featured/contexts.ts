import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ChangeEvent, createContext } from 'react';
import { FeaturedSectionDTO, Name } from '../../typings/FeaturedSection';
import { Route } from '../../typings/Route';

type FeaturedSectionsProps = {
    updateName(section: FeaturedSectionDTO, name: Name): void;
    moveUp(section: FeaturedSectionDTO): void;
    moveDown(section: FeaturedSectionDTO): void;
    toggle(section: FeaturedSectionDTO): void;
    remove: UseMutationResult;
    addRoute: UseMutationResult<AxiosResponse<FeaturedSectionDTO>>;
    removeRoute: UseMutationResult;
    create: UseMutationResult;
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
        moveUp: () => void;
        moveDown: () => void
        toggle: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void
        remove: () => any;
        updateName: () => void
        addRoute: (route: Route) => void;
        removeRoute: ({id: string}) => void
    };
    editRoutes: {
        enabled: boolean;
        toggle: () => void
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

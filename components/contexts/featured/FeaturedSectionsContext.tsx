import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useCallback } from 'react';

import { FeaturedSectionDTO, Name } from '../../typings/FeaturedSection';
import endpoints from '../../utils/apiEndpoints';

import { FeaturedSectionsContext } from './contexts';

const createFeatured = () =>
    axios.post(endpoints.featuredSections, { name: { pl: 'Nienazwana nowa sekcja', en: 'Unnamed new section' } });

const createRoute = ({ section, route: { id } }) =>
    axios.post(`${endpoints.featuredSections}/${section.sectionId}/route`, { routeId: id });

const patchFeatured = ({ order, isActive, sectionName, sectionId }: Partial<FeaturedSectionDTO>) =>
    axios.patch(`${endpoints.featuredSections}/${sectionId}`, { order, isActive, name: sectionName });

const deleteFeatured = ({ sectionId }) => axios.delete(`${endpoints.featuredSections}/${sectionId}`);

const deleteRoute = ({ section, route: { id } }) =>
    axios.delete(`${endpoints.featuredSections}/${section.sectionId}/route/${id}`);

export const FeaturedSectionsContainer: React.FC<{
    sections: FeaturedSectionDTO[];
    refetch: () => Promise<QueryObserverResult<FeaturedSectionDTO[]>>;
}> = ({ sections, children, refetch }) => {
    const update = useMutation(patchFeatured, {
        onSuccess: () => refetch(),
    });

    const updateName = ({ sectionId }: FeaturedSectionDTO, name: Name) =>
        update.mutate({ sectionName: name, sectionId });

    const moveTo = ({ sectionId }: FeaturedSectionDTO, order: number) => update.mutate({ order, sectionId });

    const moveUp = useCallback(
        (section: FeaturedSectionDTO) => {
            const sectionIndex = sections.findIndex((aSection) => aSection.sectionId === section.sectionId);
            const previousSection = sections[sectionIndex - 1];
            if (previousSection?.order !== undefined) {
                return moveTo(section, previousSection.order);
            }
        },
        [moveTo, sections],
    );

    const moveDown = useCallback(
        (section: FeaturedSectionDTO) => {
            const sectionIndex = sections.findIndex((aSection) => aSection.sectionId === section.sectionId);
            const followingSection = sections[sectionIndex + 1];
            if (followingSection?.order !== undefined) {
                return moveTo(section, followingSection.order);
            }
        },
        [moveTo, sections],
    );

    const toggle = ({ sectionId, isActive }: FeaturedSectionDTO) => update.mutate({ sectionId, isActive: !isActive });

    const remove = useMutation(deleteFeatured, {
        onSuccess: () => refetch(),
    });

    const create = useMutation(createFeatured, {
        onSuccess: () => refetch(),
    });

    const addRoute = useMutation(createRoute, {
        onSuccess: () => refetch(),
    });

    const removeRoute = useMutation(deleteRoute, {
        onSuccess: () => refetch(),
    });
    return (
        <FeaturedSectionsContext.Provider
            value={{
                moveDown,
                moveUp,
                updateName,
                toggle,
                addRoute,
                removeRoute,
                remove,
                sections,
                create,
            }}
        >
            {children}
        </FeaturedSectionsContext.Provider>
    );
};
export default FeaturedSectionsContext;

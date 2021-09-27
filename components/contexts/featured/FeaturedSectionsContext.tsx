import React, { useCallback } from 'react';

import { FeaturedSectionDTO, Name } from '../../typings/FeaturedSection';

import { FeaturedSectionsContext } from './contexts';

export const FeaturedSectionsContainer: React.FC<{
    sections: FeaturedSectionDTO[];
    revalidate: () => Promise<boolean>;
}> = ({ sections, children, revalidate }) => {
    const update = useCallback(
        async (data: Partial<FeaturedSectionDTO> & { sectionId: number }) => {
            const response = await fetch(`/api/featured-sections/${data.sectionId}`, {
                method: 'PATCH',
                body: JSON.stringify({ order: data.order, isActive: data.isActive, name: data.sectionName }),
                headers: { 'content-type': 'application/json' },
            });
            revalidate();
        },
        [revalidate],
    );

    const updateName = useCallback(
        ({ sectionId }: FeaturedSectionDTO, name: Name) => {
            return update({ sectionName: name, sectionId });
        },
        [update],
    );

    const moveTo = useCallback(
        ({ sectionId }: FeaturedSectionDTO, order: number) => {
            return update({ order, sectionId });
        },
        [update],
    );

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

    const toggle = useCallback(
        ({ sectionId, isActive }: FeaturedSectionDTO) => {
            return update({ sectionId, isActive: !isActive });
        },
        [moveTo, sections],
    );

    const remove = useCallback(
        async (data: Partial<FeaturedSectionDTO> & { sectionId: number }) => {
            const response = await fetch(`/api/featured-sections/${data.sectionId}`, {
                method: 'DELETE',
            });
            revalidate();
        },
        [revalidate],
    );

    const create = useCallback(async () => {
        await fetch('/api/featured-sections', {
            method: 'POST',
            body: JSON.stringify({ name: { pl: 'Nienazwana nowa sekcja', en: 'Unnamed new section' } }),
            headers: { 'content-type': 'application/json' },
        });
        await revalidate();
    }, [revalidate]);

    const addRoute = useCallback(
        async (section: FeaturedSectionDTO, route: { id: string }) => {
            await fetch(`/api/featured-sections/${section.sectionId}/route`, {
                method: 'POST',
                body: JSON.stringify({ routeId: route.id }),
                headers: { 'content-type': 'application/json' },
            });
            await revalidate();
        },
        [revalidate],
    );

    const removeRoute = useCallback(
        async (section: FeaturedSectionDTO, route: { id: string }) => {
            await fetch(`/api/featured-sections/${section.sectionId}/route/${route.id}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' },
            });
            await revalidate();
        },
        [revalidate],
    );
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

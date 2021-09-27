import React, { useCallback, useState, useContext } from 'react';
import { deepEqual } from 'fast-equals';

import { FeaturedSectionDTO, Name } from '../../typings/FeaturedSection';
import FeaturedSectionsContext from './FeaturedSectionsContext';
import useToggle from '../../hooks/useToggle';
import { FeaturedSectionContext } from './contexts';
import { FeaturedSectionRouteSearchContainer } from './FeaturedSectionRouteSearchContext';
import { Route } from '../../typings/Route';

export const FeaturedSectionContainer: React.FC<{ section: FeaturedSectionDTO }> = ({ section, children }) => {
    const { updateName: updateSectionName, sections, ...actions } = useContext(FeaturedSectionsContext);

    const [moveUp, moveDown, toggle, remove] = [actions.moveUp, actions.moveDown, actions.toggle, actions.remove].map(
        (action) => () => action(section),
    );

    const [editRoutesEnabled, toggleEditRoutes] = useToggle(false);
    const [name, setName] = useState<Name>(section.sectionName);
    const addRoute = (route: Route) => actions.addRoute(section, route);
    const removeRoute = (route: Route) => actions.removeRoute(section, route);
    const updateName = useCallback(() => updateSectionName(section, name), [section, name]);

    const index = sections.findIndex((s) => section.sectionId === s.sectionId);
    const isFirst = index === 0;
    const hasChanges = !deepEqual(name, section.sectionName);
    const isLast: boolean = index === sections.length - 1;

    return (
        <FeaturedSectionContext.Provider
            value={{
                hasChanges,
                isFirst,
                isLast,
                actions: {
                    addRoute,
                    removeRoute,
                    moveUp,
                    moveDown,
                    toggle,
                    updateName,
                    remove,
                },
                section,
                setName,
                editRoutes: {
                    enabled: editRoutesEnabled,
                    toggle: toggleEditRoutes,
                },
            }}
        >
            <FeaturedSectionRouteSearchContainer> {children} </FeaturedSectionRouteSearchContainer>
        </FeaturedSectionContext.Provider>
    );
};
export default FeaturedSectionContext;

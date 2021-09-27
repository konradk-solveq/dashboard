import { Box, Container, Field, Grid } from '@theme-ui/components';
import { NextPage } from 'next';
import React, { useContext, useState } from 'react';
import useSWR from 'swr';

import ApiContext from '../../components/contexts/api';
import { FeaturedSectionContext, FeaturedSectionsContext } from '../../components/contexts/featured/contexts';
import { FeaturedSectionContainer } from '../../components/contexts/featured/FeaturedSectionContext';
import { FeaturedSectionsContainer } from '../../components/contexts/featured/FeaturedSectionsContext';
import { FeaturedSectionDTO } from '../../components/typings/FeaturedSection';
import Actions from '../../componentsSSP/featured/Actions';
import FeaturedRoute from '../../componentsSSP/featured/FeaturedRoute';
import pointerStyle from '../../componentsSSP/featured/pointerStyle';
import SectionRoutesManage from '../../componentsSSP/featured/SectionsRoutesManage';

const AddNewSection: React.FC<{}> = () => {
    const { create } = useContext(FeaturedSectionsContext);
    const style = { fontSize: 4, ...pointerStyle };
    return (
        <Box onClick={create} sx={style}>
            ➕ Dodaj nową sekcję
        </Box>
    );
};

const FeaturedRouteContainer: React.FC<{ section: FeaturedSectionDTO }> = ({ section }) => {
    return (
        <Container>
            <FeaturedSectionContainer section={section}>
                <FeaturedRoute />
                <Box m={1} />
            </FeaturedSectionContainer>
        </Container>
    );
};

const FeaturedRoutesPage: NextPage<{}> = function ({}) {
    const { data: sections = [], revalidate } = useSWR<FeaturedSectionDTO[]>(
        '/api/featured-sections',
        async (url) => {
            const response = await fetch(url);
            return (await response.json()) as FeaturedSectionDTO[];
        },
        { initialData: [], revalidateOnMount: true },
    );

    return (
        <FeaturedSectionsContainer {...{ sections, revalidate }}>
            <Container>
                <h1>Lista sekcji wyróżnionych</h1>
                {sections.map((section) => {
                    return <FeaturedRouteContainer key={section.sectionId} {...{ section }} />;
                })}
                <AddNewSection />
            </Container>
        </FeaturedSectionsContainer>
    );
};

export default FeaturedRoutesPage;

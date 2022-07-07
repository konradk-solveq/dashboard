import { Box, Container, Typography } from '@mui/material/';
import { NextPage } from 'next';
import React, { useContext, useState } from 'react';
import useSWR from 'swr';

import { FeaturedSectionsContext } from '../../components/contexts/featured/contexts';
import { FeaturedSectionContainer } from '../../components/contexts/featured/FeaturedSectionContext';
import { FeaturedSectionsContainer } from '../../components/contexts/featured/FeaturedSectionsContext';
import { FeaturedSectionDTO } from '../../components/typings/FeaturedSection';
import FeaturedRoute from '../../componentsSSP/featured/FeaturedRoute';
import pointerStyle from '../../componentsSSP/featured/pointerStyle';

const AddNewSection: React.FC<{}> = () => {
    const { create } = useContext(FeaturedSectionsContext);
    const style = { fontSize: '16px', ...pointerStyle };
    return (
        <Box onClick={create} sx={style}>
            ➕ Dodaj nową sekcję
        </Box>
    );
};

const FeaturedRouteContainer: React.FC<{ section: FeaturedSectionDTO }> = ({ section }) => {
    return (
        <Box>
            <FeaturedSectionContainer section={section}>
                <FeaturedRoute />
            </FeaturedSectionContainer>
        </Box>
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
                <Typography>Lista sekcji wyróżnionych</Typography>
                {sections.map((section) => {
                    return <FeaturedRouteContainer key={section.sectionId} {...{ section }} />;
                })}
                <AddNewSection />
            </Container>
        </FeaturedSectionsContainer>
    );
};

export default FeaturedRoutesPage;

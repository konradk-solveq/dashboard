import { Box, Container, Typography } from '@mui/material/';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import React, { useContext } from 'react';

import { FeaturedSectionsContext } from '../../components/contexts/featured/contexts';
import { FeaturedSectionContainer } from '../../components/contexts/featured/FeaturedSectionContext';
import { FeaturedSectionsContainer } from '../../components/contexts/featured/FeaturedSectionsContext';
import { FeaturedSectionDTO } from '../../components/typings/FeaturedSection';
import endpoints from '../../components/utils/apiEndpoints';
import getQueryFn from '../../components/utils/getQueryFn';
import FeaturedRoute from '../../componentsSSP/featured/FeaturedRoute';
import pointerStyle from '../../componentsSSP/featured/pointerStyle';
import config from '../../helpers/queryConfig';

const AddNewSection: React.FC<{}> = () => {
    const { create } = useContext(FeaturedSectionsContext);
    const style = { fontSize: '16px', ...pointerStyle };
    return (
        <Box onClick={() => create.mutate(undefined)} sx={style}>
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
    const { data: sections = [], refetch } = useQuery<FeaturedSectionDTO[]>(
        ['featuredSections'],
        () => getQueryFn(endpoints.featuredSections),
        { ...config, refetchOnMount: true },
    );

    return (
        <FeaturedSectionsContainer {...{ sections, refetch }}>
            <Container>
                <Typography>Lista sekcji wyróżnionych</Typography>
                {sections?.map((section) => {
                    return <FeaturedRouteContainer key={section.sectionId} {...{ section }} />;
                })}
                <AddNewSection />
            </Container>
        </FeaturedSectionsContainer>
    );
};

export default FeaturedRoutesPage;

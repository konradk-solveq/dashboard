import Link from 'next/link';
import React, { useContext } from 'react';
import { Box, Divider, Grid } from 'theme-ui';
import { FeaturedSectionContext } from '../../components/contexts/featured/contexts';
import { SimplifiedFeaturedRoute } from '../../components/typings/FeaturedSection';
import LookupForRoute from './LookupForRoute';
import pointerStyle from './pointerStyle';

const routeStyle = {
    sx: { fontSize: '1.3rem' },
    columns: [2, '1fr 50fr'],
};

const SectionRoutesManage: React.FC<{}> = (props) => {
    const {
        section: { routes = [] },
        editRoutes: { enabled },
        actions: { removeRoute },
    } = useContext(FeaturedSectionContext);

    if (!enabled) {
        return null;
    }

    const AssignedRoute = (route: SimplifiedFeaturedRoute): JSX.Element => {
        return (
            <Grid key={route.routeId} {...routeStyle}>
                <Box sx={pointerStyle} onClick={() => removeRoute({ id: route.routeId })}>
                    🗑
                </Box>
                <Box>
                    {route.name} ({<Link href={`/routes/edit?routeId=${route.routeId}`}>{route.routeId}</Link>})
                </Box>
            </Grid>
        );
    };

    const Routes = () => {
        if (routes.length === 0) {
            return <>Żadna trasa nie została jeszcze przypisana</>;
        }
        const sortedRoutes = routes.sort((a, b) => (a.routeId > b.routeId ? 1 : -1));
        return <>{sortedRoutes.map(AssignedRoute)}</>;
    };

    return (
        <Box>
            <h2>Trasy</h2>
            <Routes />
            <Divider />
            <LookupForRoute />
        </Box>
    );
};

export default SectionRoutesManage;

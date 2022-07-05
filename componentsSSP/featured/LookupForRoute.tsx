import React, { useContext } from 'react';
import { Box, TextField, Container, Link } from '@mui/material/';
import { FeaturedSectionContext } from '../../components/contexts/featured/contexts';
import { FeaturedSectionRouteSearchContext } from '../../components/contexts/featured/contexts';
import { Route } from '../../components/typings/Route';
import pointerStyle from './pointerStyle';

const routeStyle = {
    sx: { fontSize: '1.3rem' },
    columns: [2, '1fr 50fr'],
};

const LookupForRoute: React.FC<{}> = () => {
    const {
        section: { sectionId, routes = [] },
        actions: { addRoute },
    } = useContext(FeaturedSectionContext);
    const { routes: searched, query, setQuery, isLoading } = useContext(FeaturedSectionRouteSearchContext);
    const results =
        searched.length === 0 ? (
            <span>Nie znaleziono wyników</span>
        ) : (
            searched.map((route: Route) => {
                const onClickCallback = () => addRoute(route);
                const ActionButton = () => (
                    <Box sx={pointerStyle} onClick={onClickCallback}>
                        ➕
                    </Box>
                );

                return (
                    <Container sx={{ display: 'grid' }} key={route.id} {...routeStyle}>
                        <ActionButton />
                        <Box>
                            {route.name} ({<Link href={`/routes/edit?routeId=${route.id}`}>{route.id}</Link>})
                        </Box>
                    </Container>
                );
            })
        );
    return (
        <>
            <TextField
                placeholder="Wpisz nazwę, część opisu"
                label="Wyszukaj trasę"
                sx={{ backgroundColor: 'white' }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                name={`${sectionId}-route-lookup`}
            ></TextField>
            {isLoading ? <span>Wyszukiwanie</span> : results}
        </>
    );
};

export default LookupForRoute;

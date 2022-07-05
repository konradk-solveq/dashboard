import NextLink from 'next/link';
import { useContext } from 'react';
import { Box, Button, Container } from '@mui/material/';
import RouteNavigationContext from '../../../components/contexts/route/RouteNavigationContext';

const NavButtons: React.FC<{}> = ({}) => {
    const { nextRouteUrl, previousRouteUrl } = useContext(RouteNavigationContext);
    return (
        <Container sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mb: '20px' }}>
            {previousRouteUrl && (
                <NextLink href={previousRouteUrl} passHref>
                    <Button className="sys-btn">&lt;&lt;&lt; poprzednia</Button>
                </NextLink>
            )}
            {!previousRouteUrl && <Box sx={{ width: '100px', height: '20px' }} />}
            {nextRouteUrl && (
                <NextLink href={nextRouteUrl} passHref>
                    <Button className="sys-btn">następna &gt;&gt;&gt;</Button>
                </NextLink>
            )}
            {!nextRouteUrl && <Box sx={{ width: '100px', height: '20px' }} />}
        </Container>
    );
};
export default NavButtons;

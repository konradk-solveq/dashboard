import NextLink from 'next/link';
import { useContext } from 'react';
import { Box, Button, Flex } from 'theme-ui';
import RouteNavigationContext from '../contexts/route/RouteNavigationContext';

const RouteNavigationButtons: React.FC<{}> = ({}) => {
    const { nextRouteUrl, previousRouteUrl, backUrl } = useContext(RouteNavigationContext);
    return (
        <Flex sx={{ width: '100%', justifyContent: 'space-between', mb: '20px' }}>
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
        </Flex>
    );
};
export default RouteNavigationButtons;

import { useRouter } from 'next/dist/client/router';
import { useContext } from 'react';
import useSWR from 'swr';
import { Box, Flex, Button } from 'theme-ui';
import EventsContext from '../../../components/contexts/EventsContext';
import ManageContext from '../../../components/contexts/ManageContext';
import fetcher from '../../../helpers/fetcher';
import { Route } from '../../../components/typings/Route';

const Page = () => {
    const router = useRouter();
    const events = useContext(EventsContext);
    const api = useContext(ManageContext);
    const id = router.query.id as string;
    const { data, error } = useSWR<Route, any>(`/api/routes/route/${id}?${events.getRouteUpdates(id)}`, fetcher);

    if (router.isFallback) return <div>Loading...</div>;
    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <Flex
            sx={{
                flexDirection: 'column',
            }}
        >
            <Box>
                id: <span onClick={() => api.publish(id)}>{id}</span>
            </Box>
            <Box>
                status: <span>{events.getRouteStatus(id as string)}</span>
            </Box>
            {data && (
                <>
                    <Box>nazwa: {data.name}</Box>
                    <Box>czas: {data.time}</Box>
                </>
            )}
            <Button>
                <span onClick={() => (data.isPublic ? api.unpublish(id) : api.publish(id))}>
                    {data.isPublic ? 'Zrób niepublicznym' : 'Upublicznij'}
                </span>
            </Button>
        </Flex>
    );
};

export default Page;

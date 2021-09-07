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
    console.log('%c data:', 'background: #ffcc00; color: #003300', data)

    if (router.isFallback) return <div>Loading...</div>;
    if (!data) {
        return <div>Loading...</div>;
    }

    const difficulty_options = data.difficulty?.options;
    const surface_options = data.surface?.options;
    const tags_options = data.tags?.options;

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
                    <Box>autor: {data.author}</Box>
                    <Box>ownerId: {data.ownerId}</Box>
                    <Box>czas: {data.time}</Box>
                    <Box>dystans: {data.distance}</Box>
                    <Box>trudność: {data.time}</Box>
                    {data.description && <>
                        <Box>opis krótki: {data.description.short}</Box>
                        <Box>opis długi: {data.description.long}</Box>
                    </>}
                    <Box>lokalizacja: {data.location}</Box>
                    <Box>rekomandowane: {data.recommended}</Box>
                    <Box>pobrania: {data.downloads}</Box>
                    <Box>lajki: {data.reactions.like}</Box>
                    {/* <Box>wow: {data.reactions.wow}</Box>
                    <Box>love: {data.reactions.love}</Box> */}
                    <Box>reaction: {data.reaction}</Box>
                    <Box>polecana: {data.isFeatured}</Box>
                    <Button>
                        <span onClick={() => (data.isPublic ? api.unpublish(id) : api.publish(id))}>
                            {data.isPublic ? 'Zrób niepublicznym' : 'Upublicznij'}
                        </span>
                    </Button>
                </>
            )}
        </Flex>
    );
};

export default Page;

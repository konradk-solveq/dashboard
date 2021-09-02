import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import useSWR from 'swr';
import { Box, Flex } from 'theme-ui';
import fetcher from '../../../helpers/fetcher';


const Page = () => {
    const router = useRouter();

    const { id } = router.query;
    const { data, error } = useSWR(`/api/routes/route/${id}`, fetcher);

    if (router.isFallback) return <div>Loading...</div>;

    console.log('%c data:', 'background: #ffcc00; color: #003300', data)
    return <Flex sx={{
        flexDirection: 'column',
    }}>
        <Box>id: {id}</Box>
        {data && <>
            <Box>nazwa: {data.name}</Box>
            <Box>czas: {data.time}</Box>
        </>}
    </Flex>;
}

export default Page

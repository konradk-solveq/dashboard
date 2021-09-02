import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Box, Flex } from 'theme-ui';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params;
    const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/route/${id}`);
    // const result = await fetch(`https://ckan2.multimediagdansk.pl/gpsPositions`);
    const data = await result.json();

    return { props: { data } };
}

const Page = (props) => {

    const router = useRouter();
    if (router.isFallback) return <div>Loading...</div>;

    // const [url, setUrl] = useState(`/api/route/${router.query.id}`);
    // const { data } = useSWR(url, fetcher);


    console.log('%c data:', 'background: #ffcc00; color: #003300', props.data)
    return <Flex sx={{
        flexDirection: 'column',
    }}>
        <Box>id: {router.query.id}</Box>
        {/* {data && <>
            <Box>nazwa: {data.name}</Box>
            <Box>czas: {data.time}</Box>
        </>} */}
    </Flex>;
}

export default Page;
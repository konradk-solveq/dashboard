import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Box, Flex } from 'theme-ui';
const fetcher = (url: string) => {
    return fetch(`${url}`).then((r) => r.json());
};

const Page: React.FC<{}> = () => {

    const router = useRouter();
    const [url, setUrl] = useState(`/api/route/${router.query.id}`);
    const { data } = useSWR(url, fetcher);


    console.log('%c data:', 'background: #ffcc00; color: #003300', data)
    return <Flex sx={{
        flexDirection: 'column',
    }}>
        <Box>id: {router.query.id}</Box>
        <Box>nazwa: {data.name}</Box>
        <Box>czas: {data.time}</Box>
    </Flex>;
}

export default Page;
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Box, Flex } from 'theme-ui';
import { Route } from '../../components/typings/Route';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params;
    const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/route/${id}`, {
        headers: context.req.headers as Record<string, string>,
    });
    const data = (await result.json()) as Route;

    return { props: { data } };
};

const Page: React.FC<{ data: Route }> = ({ data }) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Flex
            sx={{
                flexDirection: 'column',
            }}
        >
            <Box>id: {router.query.id}</Box>
            <>
                <Box>nazwa: {data?.name}</Box>
                <Box>czas: {data?.time}</Box>
            </>
        </Flex>
    );
};

export default Page;

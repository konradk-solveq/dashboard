import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import useSWR from 'swr';
const fetcher = (url: string) => {
    return fetch(`${url}`).then((r) => r.json());
};

export default function Page(props) {

    const router = useRouter();
    const [url, setUrl] = useState(`/api/route/${router.query.id}`);
    const { data } = useSWR(url, fetcher);


    console.log('%c props:', 'background: #ffcc00; color: #003300', data)
    return <>{router.query.id}</>;
}

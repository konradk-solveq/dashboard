import { useRouter } from 'next/dist/client/router';

export const getStaticPaths = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/route`)
    // const res = await fetch(`${process.env.API_URL}/routes/route`)
    const data = await res.json()

    const paths = data.map(e => ({
        params: e,
    }))

    return {
        paths,
        fallback: true
    };
}

export const getStaticProps = async (context) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/route/${context.params.id}`);
    // const res = await fetch(`${process.env.API_URL}/routes/route/${context.params.id}`);
    const data = await res.json();

    return { props: { data } };
}


export default function Page(props) {
    const router = useRouter();
    return <>{router.query.id}</>;
}

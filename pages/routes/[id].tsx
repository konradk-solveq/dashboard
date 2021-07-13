import { useRouter } from 'next/dist/client/router';

export async function getStaticProps(context) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/route/${context.params.id}`);
    const data = await res.json();
    return { props: { data } };
}

export function getStaticPaths(context) {
    return { paths: [], fallback: true };
}
export default function Page(props) {
    const router = useRouter();
    return <>{router.query.id}</>;
}

import { useRouter } from 'next/dist/client/router';

export const getStaticPaths = async () => {
    return {
        paths: [
            {
                params: {
                    id: 'wfawUc2aEo4ZJRX9rj4SqyTcPzEVc2UU',
                }
            }
        ],
        fallback: false,
    }
}

export const getStaticProps = async (context) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/route/${context.params.id}`);
    const data = await res.json();
    // const data = await JSON.stringify(res);

    return { props: { data } };
}

export default function Page(props) {
    console.log('%c props:', 'background: #ffcc00; color: #003300', props)
    const router = useRouter();
    return <>{router.query.id}</>;
}

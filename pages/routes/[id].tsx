import { useRouter } from 'next/dist/client/router';
import { Flex } from 'theme-ui';

export const getStaticProps = async (context) => {
    // const res = await fetch(`${process.env.API_URL}/routes/route/${context.params.id}`);
    const res = await fetch(`${process.env.API_URL}/api/route/TzxaqyWVHyv513zOYkVQAdBY3pR_erK1`);
    const data = await res.json();
    return { props: { data } };
}

export function getStaticPaths(context) {
    return { paths: [], fallback: true };
}
export default function Page(props) {
    console.log('%c data:', 'background: #ffcc00; color: #003300', props.data)
    const router = useRouter();
    return <Flex
        sx={{
            flexDirection: 'column',
        }}>
        <div>
            {router.query.id}
        </div>
        <div>
            --- {props.isPublic} ---
        </div>
    </Flex>;
}

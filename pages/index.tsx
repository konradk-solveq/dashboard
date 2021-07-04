import { signIn, useSession } from 'next-auth/client';
import { useEffect } from 'react';
export default function Page() {
    const [session, loading] = useSession();
    useEffect(() => {
        console.log(session, loading);
        const id = setTimeout(() => {
            if (!session) {
                signIn();
            }
        }, 125);
        return () => clearTimeout(id);
    }, [session, signIn]);
    return <></>;
}

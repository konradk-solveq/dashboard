import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

export async function getToken(req: NextApiRequest) {
    const a = await getSession({ req, triggerEvent: false });
    return a?.user?.image;
}

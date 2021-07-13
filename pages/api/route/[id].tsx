// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getToken } from '../../../components/utils/getToken';

const apiUrl = process.env.API_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken(req);

    if (req.method === 'GET') {
        return res.status(200).json({ token });
    }

    return res.status(404).send();
};

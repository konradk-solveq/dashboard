// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getToken } from '../../../components/utils/getToken';

const apiUrl = process.env.API_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {

        const token = await getToken(req);

        if (!token) {
            return res.status(401).send();
        }

        const { id } = req.query;

        const { data } = await axios.get(
            `${apiUrl}/routes/route/${id}`,
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );

        return res.status(200).json(data);
    }
    return res.status(404).send();
};

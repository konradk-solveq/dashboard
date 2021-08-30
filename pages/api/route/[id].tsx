// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getToken } from '../../../components/utils/getToken';

const apiUrl = process.env.API_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // const token = await getToken(req);
    // if (!token) {
    //     return res.status(401).send();
    // }

    if (req.method === 'GET') {
        const id = req.url.split('?')[1];
        const { data, request } = await axios.get(
            `${apiUrl}/routes/route/`,// + id,
            {
                // headers: { authorization: `Bearer ${token}` },
                params: {
                    // id: req.query.id,
                    id,
                },
            },
        );

        return res.status(200).json(data);
    }

    return res.status(404).send();
};

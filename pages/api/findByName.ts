// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getToken } from './getToken';

const apiUrl = process.env.API_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const token = await getToken(req);
        const data = await axios.get(`${apiUrl}/cycling-map/manage/lookup`, {
            headers: { authorization: `Bearer ${token}` },
            params: {
                nane: req.query.name,
                recommended: req.query.recommended,
                public: req.query.public,
            },
        });

        return res.status(200).json(data.data);
    }
    return res.status(404).send();
};

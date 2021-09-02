// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getToken } from '../../../../components/utils/getToken';
import { NextApiHandler } from 'next-auth/internals/utils';

const apiUrl = process.env.API_URL;

const route: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken(req);
    if (!token) {
        return res.status(401).send();
    }

    const { id } = req.query;
    const { data } = await axios.get<{}>(
        `${apiUrl}/routes/route/${id}`,
        {
            headers: { authorization: `Bearer ${token}` },
        },
    )

    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).end();
    }
};

export default route;
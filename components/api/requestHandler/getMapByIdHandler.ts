// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export const getMapByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { token, apiUrl } = res.locals;
    const { data } = await axios.get(`${apiUrl}/routes/route/${id}`, {
        headers: { authorization: `Bearer ${token}` },
    });
    return res.status(200).json(data);
};
// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export const deleteMapHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { token, apiUrl } = res.locals;
    const { data } = await axios.delete(`${apiUrl}/cycling-map/manage/${id}`, {
        headers: { authorization: `Bearer ${token}` },
    });
    return res.status(200).json(data);
};
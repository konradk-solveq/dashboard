// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export const patchMetadataHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { body } = req.body;
    const { token, apiUrl } = res.locals;
    const { data } = await axios.patch(`${apiUrl}/cycling-map/manage/${id}/metadata`, {
        headers: { authorization: `Bearer ${token}` },
        data: body,
    });
    return res.status(200).json(data);
};

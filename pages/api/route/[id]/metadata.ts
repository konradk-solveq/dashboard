// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { apiHandler } from '../../../../../helpers/apiHandler';

export default apiHandler({
    patch: patchRouteMetadataHandler,
});

const patchRouteMetadataHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { body } = req.body;
    const { token, apiUrl } = res.locals;
    const { data } = await axios.patch(`${apiUrl}/routes/route/${id}/metadata`, {
        headers: { authorization: `Bearer ${token}` },
        data: body,
    });
    return res.status(200).json(data);
};

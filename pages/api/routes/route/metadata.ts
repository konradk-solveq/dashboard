// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../../../helpers/apiHandler';

export default apiHandler({
    patch: patchRouteMetadataHandler,
});

async function patchRouteMetadataHandler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { body } = req.body;
    const { token, axios } = res.locals;
    const { data } = await axios.patch(`/routes/route/${id}/metadata`, {
        headers: { authorization: `Bearer ${token}` },
        data: body,
    });
    return res.status(200).json(data);
}

// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../../../helpers/apiHandler';

export default apiHandler({
    patch: patchMetadataHandler,
});

async function patchMetadataHandler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { body } = req.body;
    const { token, axios } = req.locals;
    const { data } = await axios.patch(`/cycling-map/manage/${id}/metadata`, {
        headers: { authorization: `Bearer ${token}` },
        data: body,
    });
    return res.status(200).json(data);
}

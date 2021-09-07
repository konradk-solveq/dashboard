import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, Q } from '../../../../../helpers/apiHandler';

export default apiHandler({
    patch: patchMetadataHandler,
});

async function patchMetadataHandler(req: NextApiRequest & Q, res: NextApiResponse) {
    const { id } = req.query;
    const { body } = req;
    const { axios } = req.locals;
    const { data } = await axios.patch(`/cycling-map/manage/${id}/metadata`, {
        data: body,
    });
    return res.status(200).json(data);
}

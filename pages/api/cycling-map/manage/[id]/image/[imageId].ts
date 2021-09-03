// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../../../../helpers/apiHandler';

export default apiHandler({
    delete: deleteMapImageHandler,
});

async function deleteMapImageHandler(req: NextApiRequest, res: NextApiResponse) {
    const { id, imageId } = req.query;
    const { token, axios } = req.locals;
    const { data } = await axios.delete(`/cycling-map/manage/${id}/image/${imageId}`, {
        headers: { authorization: `Bearer ${token}` },
    });
    return res.status(200).json(data);
}

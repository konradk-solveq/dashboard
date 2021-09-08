import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../../../../helpers/apiHandler';

export default apiHandler({
    delete: deleteMapImageHandler,
});

async function deleteMapImageHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { id, imageId } = req.query;
    const { axios } = req.locals;
    const { data } = await axios.delete(`/cycling-map/manage/${id}/image/${imageId}`);
    return res.status(200).json(data);
}

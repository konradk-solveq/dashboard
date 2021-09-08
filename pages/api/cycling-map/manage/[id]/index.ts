import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../../../helpers/apiHandler';

export default apiHandler({
    delete: deleteMapHandler,
});

async function deleteMapHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { axios } = req.locals;
    const { data } = await axios.delete(`/cycling-map/manage/${id}`);
    return res.status(200).json(data);
}

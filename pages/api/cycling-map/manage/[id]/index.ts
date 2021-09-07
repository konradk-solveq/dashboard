import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, Q } from '../../../../../helpers/apiHandler';

export default apiHandler({
    delete: deleteMapHandler,
});

async function deleteMapHandler(req: NextApiRequest & Q, res: NextApiResponse) {
    const { id } = req.query;
    const { axios } = req.locals;
    const { data } = await axios.delete(`/cycling-map/manage/${id}`);
    return res.status(200).json(data);
}

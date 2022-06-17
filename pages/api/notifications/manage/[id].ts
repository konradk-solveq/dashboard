import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../../helpers/apiHandler';

export default apiHandler({
    delete: deleteHandler,
});
async function deleteHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { axios } = req.locals;
    const { id } = req.query;
    const { data } = await axios.delete(`/notifications/manage/${id}`);
    return res.status(200).json(data);
}

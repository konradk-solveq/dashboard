import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../../helpers/apiHandler';

export default apiHandler({
    delete: deleteHandler,
    put: putHandler,
});
async function deleteHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { axios } = req.locals;
    const { id } = req.query;
    const { data } = await axios.delete(`/notifications/manage/${id}`);
    return res.status(200).json(data);
}

async function putHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { body } = req;
    const { axios } = req.locals;
    const { data } = await axios.put(`/notifications/manage/${id}`, body);
    return res.status(200).json(data);
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../../helpers/apiHandler';

export default apiHandler({
    put: putHandler,
    delete: deleteHandler
});

async function putHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { axios } = req.locals;
    const { body } = req
    const { data } = await axios.put(`/publications/manage/${id}`, body);
    return res.status(200).json(data);
}

async function deleteHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { axios } = req.locals;
    const { data } = await axios.delete(`/publications/manage/${id}`);
    return res.status(200).json(data);
}
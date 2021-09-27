import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../../helpers/apiHandler';

export default apiHandler({
    patch: patchHandler,
    delete: deleteHandler,
    post: postHandler,
});

async function patchHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { axios } = req.locals;
    const { id } = req.query;
    const { body } = req;
    const { data } = await axios.patch(`/featured-sections/${id}`, body);
    return res.status(200).json(data);
}

async function deleteHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { axios } = req.locals;
    const { id } = req.query;
    const { data } = await axios.delete(`/featured-sections/${id}`);
    return res.status(200).json(data);
}

async function postHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { axios } = req.locals;
    const { body } = req;
    const { id } = req.query;
    const { data } = await axios.post(`/featured-sections/${id}`, body);
    return res.status(200).json(data);
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../helpers/apiHandler';

export default apiHandler({
    get: getHandler,
    post: postHandler,
});

async function getHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { key } = req.query;
    const { axios } = req.locals;
    const { data } = await axios.get(`/settings/${key}`);
    return res.status(200).json(data);
}

async function postHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { key } = req.query;
    const { axios } = req.locals;
    const { body } = req;
    const { data } = await axios.post(`/settings/${key}`, body);
    return res.status(200).json(data);
}

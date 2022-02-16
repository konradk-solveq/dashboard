import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../../../helpers/apiHandler';
import qs from 'querystring';

export default apiHandler({
    get: getHandler,
    post: postHandler,
});

async function getHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { axios } = req.locals;
    const { limit, offset } = req.query;
    const { data } = await axios.get(`/application/ui-translation/manage?${qs.stringify({ limit, offset })}`);
    return res.status(200).json(data);
}
async function postHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { axios } = req.locals;
    const { body } = req;
    const { data } = await axios.post(`/application/ui-translation/manage`, body);
    return res.status(200).json(data);
}

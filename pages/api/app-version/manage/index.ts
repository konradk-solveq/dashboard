import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../../helpers/apiHandler';
import qs from 'querystring';

export default apiHandler({
    get: getAppVersionsHandler,
    post: createAppVersionHandler,
});

async function getAppVersionsHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { axios } = req.locals;
    const { limit, offset } = req.query;
    const { data, status } = await axios.get(`/app-version/manage?${qs.stringify({ limit, offset })}`);
    return res.status(status).json(data);
}
async function createAppVersionHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { axios } = req.locals;
    const { body } = req;
    const { status, data } = await axios.post(`/app-version/manage`, body);

    return res.status(status).json({});
}

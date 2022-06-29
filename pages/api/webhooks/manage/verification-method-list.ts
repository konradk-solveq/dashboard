import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../../helpers/apiHandler';

export default apiHandler({
    get: getHandler,
});

async function getHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { axios } = req.locals;
    const { data } = await axios.get(`/webhooks/manage/verification-method-list`);
    return res.status(200).json(data);
}

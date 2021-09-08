import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../../../helpers/apiHandler';

export default apiHandler({
    post: createPublishMetaHandler('post'),
    delete: createPublishMetaHandler('delete'),
});

function createPublishMetaHandler(method: 'post' | 'delete') {
    return async function handler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
        const { id } = req.query;
        const { axios } = req.locals;
        const { data } = await axios[method](`/cycling-map/manage/${id}/publish`);
        return res.status(200).json(data);
    };
}

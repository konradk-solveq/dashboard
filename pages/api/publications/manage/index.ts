import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../../helpers/apiHandler'

export default apiHandler({
    get: getHandler,
    post: postHandler,
});

async function getHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { axios } = req.locals;
    const thisPath = req.url.split('?')[0];
    const { data, request } = await axios.get(`/publications/manage`, {
        params: {
            page: req.query.page,
            limit: req.query.limit,
            type: req.query.type,
            order: req.query.order,
            orderBy: req.query.orderBy,
        },
    });
    const targetPath = request.path.split('?')[0];
    data.links.next = data?.links?.next?.replace(targetPath, thisPath);
    data.links.prev = data?.links?.prev?.replace(targetPath, thisPath);
    return res.status(200).json(data);
}


async function postHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { axios } = req.locals;
    const { body } = req;
    const { data } = await axios.post(`/publications/manage`, body);
    return res.status(200).json(data);
}

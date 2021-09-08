import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../../helpers/apiHandler';

export default apiHandler({
    get: getHandler,
});

async function getHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { axios } = req.locals;
    const thisPath = req.url.split('?')[0];
    const { data, request } = await axios.get(`/cycling-map/manage/lookup`, {
        params: {
            name: req.query.name,
            recommended: req.query.recommended,
            public: req.query.public,
            page: req.query.page,
            limit: req.query.limit,
        },
    });
    const targetPath = request.path.split('?')[0];
    data.links.next = data?.links?.next?.replace(targetPath, thisPath);
    data.links.prev = data?.links?.prev?.replace(targetPath, thisPath);
    return res.status(200).json(data);
}

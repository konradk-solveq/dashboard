import { AxiosInstance } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../../../helpers/apiHandler';

export default apiHandler({
    post: createPublishMetaHander('post'),
    delete: createPublishMetaHander('delete'),
});

type Q = {
    locals: {
        axios: AxiosInstance;
        token: string;
    };
};

function createPublishMetaHander(method: 'post' | 'delete') {
    return async function handler(req: NextApiRequest & Q, res: NextApiResponse) {
        const { id } = req.query;
        const { body } = req.body;
        const { axios } = req.locals;
        const { data } = await axios[method](`/cycling-map/manage/${id}/publish`);
        return res.status(200).json(data);
    };
}

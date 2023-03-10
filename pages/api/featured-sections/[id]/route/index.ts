import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../../../helpers/apiHandler';

export default apiHandler({
    post: postHandler,
});

async function postHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { axios } = req.locals;
    const { body } = req;
    const { id } = req.query;
    const { data } = await axios.post(`/featured-sections/${id}/route`, body);
    return res.status(200).json(data);
}

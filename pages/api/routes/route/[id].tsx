import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, Q } from '../../../../helpers/apiHandler';

export default apiHandler({
    get: getHandler,
});

async function getHandler(req: NextApiRequest & Q, res: NextApiResponse) {
    const { id } = req.query;
    const { axios } = req.locals;
    const { data } = await axios.get(`/routes/route/${id}`);
    return res.status(200).json(data);
}

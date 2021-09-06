// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../../helpers/apiHandler';

export default apiHandler({
    get: getRouteByIdHandler,
});

async function getRouteByIdHandler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { token, axios } = req.locals;
    const { data } = await axios.get(`/routes/route/${id}`, {
        headers: { authorization: `Bearer ${token}` },
    });
    return res.status(200).json(data);
}

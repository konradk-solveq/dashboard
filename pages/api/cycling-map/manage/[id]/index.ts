// @ts-nocheck
import { apiHandler } from '../../../../../helpers/apiHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({
    delete: deleteMapHandler,
});

async function deleteMapHandler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { token, axios } = req.locals;
    const { data } = await axios.delete(`/cycling-map/manage/${id}`, {
        headers: { authorization: `Bearer ${token}` },
    });
    return res.status(200).json(data);
}

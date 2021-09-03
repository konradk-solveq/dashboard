// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { apiHandler } from '../../../../../../helpers/apiHandler';

export default apiHandler({
    delete: deleteMapImageHandler,
});

async function deleteMapImageHandler(req: NextApiRequest, res: NextApiResponse) {
    const { id, imageId } = req.query;
    const { token, apiUrl } = res.locals;
    const { data } = await axios.delete(`${apiUrl}/cycling-map/manage/${id}/image/${imageId}`, {
        headers: { authorization: `Bearer ${token}` },
    });
    return res.status(200).json(data);
}

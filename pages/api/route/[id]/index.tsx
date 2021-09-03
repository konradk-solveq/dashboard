// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { apiHandler } from '../../../../helpers/apiHandler';

export default apiHandler({
    get: getRouteByIdHandler,
});

const getRouteByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { token, apiUrl } = res.locals;
    const { data } = await axios.get(`${apiUrl}/routes/route/${id}`, {
        headers: { authorization: `Bearer ${token}` },
    });
    return res.status(200).json(data);
};

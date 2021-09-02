// @ts-nocheck
import { getToken } from '../../components/utils/getToken';

export const authMiddleware = async (req, res) => {
    const token = await getToken(req);
    if (!token) {
        return res.status(401).send('Unauthorized request');
    }
    res.locals.token = token;
};

// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from './authMiddleware';
import { envMiddleware } from './envMiddleware';
export const apiHandler = (handler: Object) => {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        const method = req.method.toLowerCase();
        if (!handler[method]) {
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
        try {
            res.locals = {};
            await authMiddleware(req, res);
            await envMiddleware(req, res);
            await handler[method](req, res);
        } catch (err) {
            return res.status(500).json(err);
        }
    };
};

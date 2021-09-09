import type { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from './authMiddleware';
import { axiosConfigMiddleware } from './axiosConfigMiddleware';
import { AxiosInstance } from 'axios';

export type ExtendedApiRequest = {
    locals: {
        axios: AxiosInstance;
        token: string;
        apiUrl: string;
    };
};

export const apiHandler = (handler: Object, callback?: (err: any) => void) => {
    return async function (req: NextApiRequest & { locals: any }, res: NextApiResponse) {
        const method = req.method.toLowerCase();
        if (!handler[method]) {
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
        try {
            req.locals = {};
            req.locals.apiUrl = process.env.API_URL;
            await authMiddleware(req, res);
            await axiosConfigMiddleware(req, res);
            await handler[method](req, res);
        } catch (err) {
            return callback ? callback(err) : res.status(500).json(err);
        }
    };
};

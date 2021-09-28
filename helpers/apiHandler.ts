import type { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from './authMiddleware';
import { axiosConfigMiddleware } from './axiosConfigMiddleware';
import { AxiosInstance } from 'axios';

export type ExtendedApiRequest = {
    locals: {
        axios: AxiosInstance;
        token: string;
        apiUrl: string;
        dashboardVersion: string;
        nodeVersion: string;
        nodeEnv: string;
    };
};
export type HandlerOptions = {
    anonymous?: boolean;
};
export const apiHandler = (
    handler: Object,
    options: HandlerOptions = { anonymous: false },
    callback?: (err: any) => void,
) => {
    return async function (req: NextApiRequest & { locals: any }, res: NextApiResponse) {
        const method = req.method.toLowerCase();
        if (!handler[method]) {
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
        try {
            req.locals = {
                apiUrl: process.env.API_URL,
                dashboardVersion: process.env.DASHBOARD_VERSION,
                nodeVersion: process.version,
                nodeEnv: process.env.NODE_ENV,
            };
            if (!options.anonymous) {
                await authMiddleware(req, res);
            }
            await axiosConfigMiddleware(req, res);
            await handler[method](req, res);
        } catch (err) {
            if (typeof err === 'function') {
                err();
            } else {
                return callback ? callback(err) : res.status(500).json(err);
            }
        }
    };
};

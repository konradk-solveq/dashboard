// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getToken } from '../../../components/utils/getToken';
import * as EventSource from 'eventsource';
const apiUrl = process.env.API_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const token = await getToken(req);
        if (!token) {
            return res.status(401).send();
        }
        const source = new EventSource(`${apiUrl}/events/any`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        source.addEventListener('message', (ev) => {
            if (typeof ev === 'object') {
                res.write(`data: ${ev.data}\n\n`);
            } else {
                res.write(`data: ${ev}\n\n`);
            }
        });
        res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
        res.setHeader('Content-Encoding', 'none');
        res.setHeader('Connection', 'keep-alive');
        res.on('close', () => {
            source.close();
        });
    }
};

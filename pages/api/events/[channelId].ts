import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../helpers/apiHandler';
import EventSource from 'eventsource';

export default apiHandler({
    get: getHandler,
});

async function getHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { channelId } = req.query;
    const { apiUrl } = req.locals;
    const source = new EventSource(`${apiUrl}/events/${channelId}`);
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

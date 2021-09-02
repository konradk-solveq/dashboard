// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getToken } from '../../../../components/utils/getToken';

const apiUrl = process.env.API_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const token = await getToken(req);
        if (!token) {
            return res.status(401).send();
        }
        const thisPath = req.url.split('?')[0];
        const { data, request } = await axios.get<{ links: { next?: string; prev?: string } }>(
            `${apiUrl}/cycling-map/manage/lookup`,
            {
                headers: { authorization: `Bearer ${token}` },
                params: {
                    name: req.query.name,
                    recommended: req.query.recommended,
                    public: req.query.public,
                    page: req.query.page,
                    limit: req.query.limit,
                },
            },
        );
        const targetPath = request.path.split('?')[0];
        data.links.next = data?.links?.next?.replace(targetPath, thisPath);
        data.links.prev = data?.links?.prev?.replace(targetPath, thisPath);
        return res.status(200).json(data);
    }
    return res.status(404).send();
};

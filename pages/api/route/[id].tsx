// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getToken } from '../../../components/utils/getToken';

const apiUrl = process.env.API_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const token = await getToken(req);
    if (!token) {
      return res.status(401).send();
    }
    const { id } = req.query
    const { data, request } = await axios.get(
      `${apiUrl}/routes/route/${id}`,
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
    return res.status(200).json(data);
  }
  return res.status(404).send();
};

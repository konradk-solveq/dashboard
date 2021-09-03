// @ts-nocheck
import axios from 'axios';

export const axiosConfigMiddleware = async (req, res) => {
    req.locals.axios = axios.create({
        baseURL: process.env.API_URL,
    });
};

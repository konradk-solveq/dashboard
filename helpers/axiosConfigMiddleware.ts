import axios from 'axios';

export const axiosConfigMiddleware = async (req, res) => {
    const httpClient = axios.create({
        baseURL: process.env.API_URL,
    });
    httpClient.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${req.locals.token}`;
        return config;
    });
    req.locals.axios = httpClient;
};

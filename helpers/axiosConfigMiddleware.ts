import axios from 'axios';

export const axiosConfigMiddleware = async (req, res) => {
    const httpClient = axios.create({
        baseURL: req.locals.apiUrl,
    });
    httpClient.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${req.locals.token}`;
        return config;
    });
    req.locals.axios = httpClient;
};

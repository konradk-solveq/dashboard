import axios from 'axios';

export const axiosConfigMiddleware = async (req, res) => {
    const httpClient = axios.create({
        baseURL: req.locals.apiUrl,
    });
    httpClient.interceptors.request.use(function (config) {
        const { token } = req.locals;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    req.locals.axios = httpClient;
};

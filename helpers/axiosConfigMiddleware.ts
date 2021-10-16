import axios from 'axios';

export const axiosConfigMiddleware = async (req, res) => {
    const httpClient = axios.create({
        baseURL: req.locals.apiUrl,
    });
    httpClient.interceptors.request.use(function (config) {
        const { token, dashboardVersion, nodeVersion, nodeEnv } = req.locals;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            config.headers['Content-Type'] = `application/json`;
        }
        config.headers['User-Agent'] = `myKROSS${
            nodeEnv === 'development' ? '-local' : ''
        }/${dashboardVersion}-dashboard-0 Node/${nodeVersion}`;
        return config;
    });
    req.locals.axios = httpClient;
};

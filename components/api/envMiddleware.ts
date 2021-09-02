// @ts-nocheck

export const envMiddleware = async (req, res) => {
    res.locals.apiUrl = process.env.API_URL;
};

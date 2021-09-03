// @ts-nocheck

export const envMiddleware =  (req, res) => {
    res.locals.apiUrl = process.env.API_URL;
};

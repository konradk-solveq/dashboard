import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, ExtendedApiRequest } from '../../../../../helpers/apiHandler';

export default apiHandler({
    delete: deleteAppVersionHandler,
    put: updateAppVersionHandler,
});

async function deleteAppVersionHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { appPlatformId, appVersionId } = req.query;
    const { axios } = req.locals;
    const { status } = await axios.delete(`/app-version/manage/${appPlatformId}/${appVersionId}`);
    return res.status(status).json({message: 'Was deleted'});
}
async function updateAppVersionHandler(req: NextApiRequest & ExtendedApiRequest, res: NextApiResponse) {
    const { appPlatformId, appVersionId } = req.query;
    const { axios } = req.locals;
    const { body } = req;
    const { status } = await axios.put(`/app-version/manage/${appPlatformId}/${appVersionId}`, body);
    return res.status(status).json({message: 'Was updated'});;
}

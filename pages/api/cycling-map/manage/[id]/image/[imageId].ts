// @ts-nocheck
import { apiHandler } from '../../../../../../components/api/apiHandler';
import { deleteMapImageHandler } from '../../../../../../components/api/requestHandler/deleteMapImageHandler';

export default apiHandler({
    delete: deleteMapImageHandler,
});

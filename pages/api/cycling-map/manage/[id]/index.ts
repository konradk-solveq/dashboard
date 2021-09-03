// @ts-nocheck
import { apiHandler } from '../../../../../components/api/apiHandler';
import { deleteMapHandler } from '../../../../../components/api/requestHandler/deleteMapHandler';

export default apiHandler({
    delete: deleteMapHandler,
});

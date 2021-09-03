// @ts-nocheck
import { apiHandler } from '../../../components/api/apiHandler';
import { getMapByIdHandler } from '../../../components/api/requestHandler/getMapByIdHandler';

export default apiHandler({
    get: getMapByIdHandler,
});
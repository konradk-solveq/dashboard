// @ts-nocheck
import { apiHandler } from '../../../../../components/api/apiHandler';
import { patchMetadataHandler } from '../../../../../components/api/requestHandler/patchMetadataHandler';

export default apiHandler({
    patch: patchMetadataHandler,
});

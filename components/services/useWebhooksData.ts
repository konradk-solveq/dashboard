import { useQuery } from "@tanstack/react-query";
import config from "../../helpers/queryConfig";
import endpoints from "../utils/apiEndpoints";
import getQueryFn from '../utils/getQueryFn'

const useWebhooksData = () => {
    return {
        webhooks: useQuery(['webhooks'], () => getQueryFn(endpoints.webhooks), {...config}),
        auth: useQuery(['auth'], () => getQueryFn(endpoints.auth), {...config}),
        events: useQuery(['events'], () => getQueryFn(endpoints.events), {...config}),
    }
}

export default useWebhooksData
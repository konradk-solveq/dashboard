import { useQuery } from "@tanstack/react-query";
import config from "../../helpers/queryConfig";
import endpoints from "../utils/apiEndpoints";
import getQueryFn from './../utils/getQueryFn'

const useFiles = () => {
    return {
        policy: useQuery(['policy'], () => getQueryFn(endpoints.policy), {...config}),
        terms: useQuery(['terms'], () => getQueryFn(endpoints.terms), {...config}),
    }
}

export default useFiles
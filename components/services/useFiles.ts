import { useQueries } from "@tanstack/react-query";
import endpoints from "../utils/apiEndpoints";
import getQueryFn from './../utils/getQueryFn'

const useFiles = () => useQueries({queries: [{queryKey: ['policy'], queryFn: () => getQueryFn(endpoints.policy)}, {queryKey: ['terms'], queryFn: () => getQueryFn(endpoints.terms)}]})

export default useFiles
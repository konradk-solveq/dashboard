import { useQuery } from "@tanstack/react-query";
import endpoints from "../utils/apiEndpoints";
import getQueryFn from './../utils/getQueryFn'

const usePublications = (page = 1, limit = 10, type = 'policy', order = 'ASC', orderBy = 'showDate') => useQuery(['publications', page, limit, type, order, orderBy], () => getQueryFn(`${endpoints.publications}?page=${page}&limit=${limit}&type=${type}&order=${order}&orderBy=${orderBy}`), {keepPreviousData: true})

export default usePublications
import { useQuery } from "@tanstack/react-query";
import config from "../../helpers/queryConfig";
import getQueryFn from '../utils/getQueryFn'

const usePaginatedQuery = (queryName: string, route: string, page: number, limit: number, type: string, order: string, orderBy: string) => useQuery([queryName, page, limit, type, order, orderBy], () => getQueryFn(`${route}?page=${page}&limit=${limit}${type ? `&type=${type}` : ''}&order=${order}&orderBy=${orderBy}`), {...config})

export default usePaginatedQuery

import { useQuery } from "@tanstack/react-query";
import config from "../../helpers/queryConfig";
import endpoints from "../utils/apiEndpoints";
import getQueryFn from '../utils/getQueryFn'

const useAppConfig = () => useQuery(['config'], () => getQueryFn(endpoints.config), {...config})

export default useAppConfig
import axios from "axios";

const getQueryFn = async (url: string) => {
    const res = await axios.get(url)
    return res.data
}

export default getQueryFn
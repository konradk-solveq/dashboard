const fetcher = async (url: string) => {
    return fetch(`${url}`).then((r) => r.json());
};

export default fetcher;
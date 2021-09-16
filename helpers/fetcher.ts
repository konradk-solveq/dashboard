const fetcher = async (url: string) => {
    if (!url) {
        return null;
    }
    return fetch(`${url}`).then((r) => r.json());
};

export default fetcher;

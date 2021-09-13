export const cache = (cb: () => Promise<any>) => {
    let cached;

    return async () => {
        if (cached) {
            return cached;
        }
        cached = cb();
        setTimeout(() => {
            cached = null;
        }, 5 * 60 * 1000);
        return cached;
    };
};

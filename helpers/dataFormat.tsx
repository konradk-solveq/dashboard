const getData = da => {
    const d = new Date(da);
    const res = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getUTCHours()}:${d.getMinutes()}`
    return res;
};

const getTime = t => {
    const s = t % 60;
    const m = ((t - s) / 60) % 60;
    const h = (t - s - (m * 60)) / (60 * 60);

    return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

const getDistance = d => (d / 1000).toFixed(2) + ' km';

export {
    getData,
    getTime,
    getDistance
}
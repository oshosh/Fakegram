export const division = (n, data) => {
    let len = data.length;
    let cnt = Math.floor(len / n) + (Math.floor(len % n) > 0 ? 1 : 0);
    let tmp = []

    for (let i = 0; i < cnt; i++) {
        tmp.push(data.splice(0, n));
    }

    return tmp;
}

export const division = (n, data) => {
    let len = data.length;
    let cnt = Math.floor(len / n) + (Math.floor(len % n) > 0 ? 1 : 0);
    let tmp = []

    let reverseData = data.reverse()
    for (let i = 0; i < cnt; i++) {
        tmp.push(reverseData.splice(0, n));
    }

    return tmp;
}

export function regexpParse(str) {
    if (!new.target) {
        return new regexpParse(str)
    }
    this.str = str

    regexpParse.prototype.hashTagSplit = () => {
        return this.str.split(/(#[^\s#]+)/g)
    }

    regexpParse.prototype.hashTagMatch = () => {
        return this.str.match(/(#[^\s#]+)/)
    }

    regexpParse.prototype.replaceBlank = () => {
        const reg = /\n/gi
        return this.str.replace(reg, '<br />')
    }
}

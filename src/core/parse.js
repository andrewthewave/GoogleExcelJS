export function parse(value = '') {
    if (value.startsWith('=')) {
        if (value[value.length-1].match(/\d/)) {
            return eval(value.slice(1))
        }
    }
    return value
}

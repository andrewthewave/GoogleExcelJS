export class ActiveRoute {
    static get path() {
        return window.location.hash.slice(1)
    }
    static get args() {
        return window.location.hash.split('/')[1]
    }
}

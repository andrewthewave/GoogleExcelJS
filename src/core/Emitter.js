 export class Emitter {
    constructor() {
        this.listeners = {}
    }
emit(event, ...data) {
    if (!Array.isArray(this.listeners[event])) {
        return false
    }
    this.listeners[event].forEach(listener => {
        listener(...data)
    })
    return true
}

subscribe(event, cb) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(cb)
    return () => {
        this.listeners[event] = this.listeners[event].filter(listener =>
            listener !== cb)
    }
}
}

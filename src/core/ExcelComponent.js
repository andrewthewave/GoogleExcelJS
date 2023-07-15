import {DOMListener} from '@core/DomListener'

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name=options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.storeSub = null
        this.prepare()
    }
    toHTML() {
        return ''
    }

    prepare() {}

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    /* $subscribe(cb) {
        this.storeSub = this.store.subscribe(cb)
    } */

    storeChanged() {}

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    $on(event, cb) {
        const unsub = this.emitter.subscribe(event, cb)
        this.unsubscribers.push(unsub)
    }

    init() {
        this.initDOMListeners()
    }

    uninit() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
        this.storeSub.unsubscribe()
    }
    destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
    }
}

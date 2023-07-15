export class Page {
    constructor(params) {
        this.params = params
    }

    getRoot() {
        throw new Error('Method GetRoot not implemented')
    }

    afterRender() {}

    destroy() {}
}

import {$} from '@core/Dom'
// eslint-disable-next-line no-unused-vars
import {ActiveRoute} from './ActiveRoute'

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provided in Router')
        }
        this.$placeholder = $(selector)
        this.routes = routes
        this.changePageHandler = this.changePageHandler.bind(this)
        this.page = null

        this.init()
    }
    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    changePageHandler(event) {
        if (this.page) {
            this.page.destroy()
        }
        this.$placeholder.clear()
        const path = ActiveRoute.path
        const Page = path.includes('excel') ?
      this.routes.excel :
      this.routes.dashboard

        this.page = new Page(ActiveRoute.args)
        this.$placeholder.append(this.page.getRoot())
        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}

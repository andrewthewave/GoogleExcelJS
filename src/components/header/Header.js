import * as actions from '@/redux/actions'
import {$} from '@core/Dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {ActiveRoute} from '@core/routing/ActiveRoute';
export class Header extends ExcelComponent {
    static className='excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options,
            listeners: ['input', 'click']
        })
    }

    toHTML() {
        const title = this.store.getState().tableName
        return `<input type="text" class="input" value="${title}">
        <div >
            <div class="button" data-type="remove">
                <i class="material-icons" data-type="remove">delete</i>
            </div>
            <div class="button">
            <a href="#dashboard">
             <i class="material-icons">exit_to_app</i>
            </div>
        </div>`
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'remove') {
            localStorage.removeItem('excel:' + ActiveRoute.args)
            window.location.hash = ''
        }
    }

    onInput(event) {
        const title = $(event.target).text()
        this.$dispatch(actions.changeTitle(
            title))
    }
}

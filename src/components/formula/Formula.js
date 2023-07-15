import {$} from '@core/Dom';
import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className='excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }

    init() {
        super.init()
        this.$formula = this.$root.find('.input')
        this.$on('table:select', $cell =>
        this.$formula.text($cell.data.value))
    }

    toHTML() {
        return `<div class="info">fx</div>
        <div class="input" contenteditable="true"></div>`
    }

    storeChanged(changes) {
        this.$formula.text(changes.currentText)
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event) {
        // const keys = ['Enter', 'Tab']
        if (event.key === 'Enter') {
            this.$emit('formula:enter')
        }

        if (event.key === 'Tab') {
            event.preventDefault()
            this.$emit('formula:tab')
        }
    }
}

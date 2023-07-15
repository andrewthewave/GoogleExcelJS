import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {ids, isCell, selectNextCell, shouldResize} from './table.utils';
import {TableSelect} from './table.select';
import {$} from '@core/Dom';
import * as actions from '@/redux/actions'
import {defaultStyles} from '../../constants';
import {parse} from '@core/parse'


export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            subscribe: ['currentStyles'],
            ...options
        })
    }
    toHTML() {
        this.$root.$el.ondragstart = () => {
            return false
        }
        return createTable(30, this.store.getState())
    }

    prepare() {
        this.selection = new TableSelect()
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)
        this.$on('formula:input', text => {
            this.selection.current
            .attr('data-value', parse(text))
            .text(parse(text))
            this.updateStoreText(text)
        })
        this.$on('formula:enter', () => {
            this.selection.current.focus()
        })
        this.$on('formula:tab', () => {
            const $target =
            selectNextCell(this.$root, this.selection.current, 'Tab')
            if ($target) {
                this.selection.select($target)
                this.$emit('table:select', $target)
            }
        })
        this.$on('toolbar:applyStyle', (value) => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIDs
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }
    async resizeTable(event) {
        const data = await resizeHandler(this.$root, event)
        this.$dispatch(actions.tableResize(data))
    }
    onMousedown(event) {
        if (shouldResize(event)) {
           this.resizeTable(event)
        } else if (isCell(event)) {
            const $cell = $(event.target)
            if (event.shiftKey) {
                const $targets = ids($cell, this.selection.current)
                .map(id =>
                    this.$root.find(`[data-id="${id}"]`)
                    )
                this.selection.selectGroup($targets)
            } else {
                this.selectCell($cell)
            }
        }
    }

    onKeydown(event) {
        const keys = ['Enter', 'ArrowUp', 'ArrowLeft',
         'ArrowDown', 'ArrowRight', 'Tab']
         const {key} = event
         if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const $target =
            selectNextCell(this.$root, this.selection.current, key)
            if ($target) {
                this.selectCell($target)
            }
         }
    }


    updateStoreText(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }
    onInput(event) {
        this.updateStoreText($(event.target).text())
    }
    }


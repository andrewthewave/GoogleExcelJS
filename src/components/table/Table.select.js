export class TableSelect {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }
    // $el instance of DOM

    select($el) {
        this.clear()
        $el.focus().addClass(TableSelect.className)
        this.group.push($el)
        this.current = $el
    }

    selectGroup($group = []) {
        this.clear()
        this.group = $group
        $group.forEach(($el) => {
            $el.addClass(TableSelect.className)
        })
    }

    get selectedIDs() {
        return this.group.map($el => $el.id())
    }
    clear() {
        this.group.forEach(cell => {
            cell.removeClass(TableSelect.className)
        })
        this.group = []
    }

    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }
}

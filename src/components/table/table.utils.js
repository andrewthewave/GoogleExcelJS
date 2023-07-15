    import {range} from '@core/utils'

    export function shouldResize(event) {
        return event.target.dataset.resize
    }

    export function isCell(event) {
        return event.target.dataset.select
    }

    export function ids($target, $current) {
        const target = $target.id(true)
        const current = $current.id(true)
        const cols = range(current.col, target.col)
        const rows = range(current.row, target.row)
        const idList = cols.reduce((acc, col) => {
            rows.forEach(row => acc.push(`${row}:${col}`))
            return acc
        }, [])
        return idList
    }

    export function nextCell(key, {row, col}) {
        switch (key) {
            case 'Enter':
            case 'ArrowDown':
                row++
                break
            case 'Tab':
            case 'ArrowRight':
                col++
                break
            case 'ArrowUp':
                row--
                break
            case 'ArrowLeft':
                col--
                break
        }

        return `[data-id="${row}:${col}"]`
    }

    export function selectNextCell($root, current, key) {
        const id = current.id(true)
        const $target = $root.find(nextCell(key, id))
        return $target
    }


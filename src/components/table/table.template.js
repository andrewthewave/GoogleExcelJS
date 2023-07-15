
import {toInlineStyles} from '@core/utils'
import {parse} from '@core/parse'

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120

const DEFAULT_HEIGHT = 40

// function toCell(_, index) {
//     return `
//         <div class="cell" contenteditable="true" data-col="${index}">
//     </div> `
// }

function toCell(state, row) {
    return function(_, index) {
        const width = getWidth(state.colState, index)
        const id = `${row}:${index}`
        const content = state.dataState[id] ||''
        const styles = toInlineStyles(state.stylesState[id])
        return `
        <div class="cell" contenteditable="true" 
        data-col="${index}" 
        data-id="${row}:${index}" 
        data-select="true"
        data-value = "${content || ''}"
        ${width !== '120px' ?
        `style="width: ${width}; ${styles};"` : `style="${styles};"`}>
        ${parse(content)}
        </div> `
    }
}

function toCol({col, index, width}) {
    return `<div class="column" data-type="resizable" data-col=${index} 
    ${width!=='120px'? `style=width:${width}` : ``}>
    ${col}
    <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createRow(index, content, state = {}) {
    const resize = index? `<div class="row-resize" data-resize="row">
    </div>` : ''
    const height = index ? getHeight(state, index) : '40px'
    return `
    <div class="row" ${index ? `data-type="resizable" data-row=${index}` : ''}
    ${height !== '40px' ? `style=height:${height}` : ''}>
    <div class="row-info">
    ${index}
    ${resize}
    </div>
    <div class="row-data">${content}</div>
    </div>
    `
}

function getHeight(state = {}, index) {
    return (state[index] || DEFAULT_HEIGHT ) + 'px'
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

function getWidth(state = {}, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

/* function getText(state = {}, row, index) {
    const id = `${row}:${index}`
    return state[id] || ''
} */


function widthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(widthFrom(state))
    .map(toCol)
    .join('')
    rows.push(createRow('', cols))

    for (let row = 0; row < rowsCount; row++) {
        const index = row+1
        const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')
        rows.push(createRow(index, cells, state.rowState))
    }
    return rows.join('')
}

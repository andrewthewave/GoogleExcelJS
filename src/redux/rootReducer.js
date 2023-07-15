import {APPLY_STYLE, CHANGE_DATE, CHANGE_TEXT,
     CHANGE_TITLE, CURRENT_STYLE, TABLE_RESIZE} from './types'

export function rootReducer(state, action) {
    let field
    let val
    switch (action.type) {
        case TABLE_RESIZE:
                    field = action.data.type === 'col' ? 'colState' : 'rowState'
                    return {...state, [field]: value(state, field, action)}
        case CHANGE_TEXT:
            field = 'dataState'
            return {...state, currentText: action.data.value,
                [field]: value(state, field, action)}
        case CURRENT_STYLE:
            return {...state, currentStyles: action.data}

        case APPLY_STYLE:
            field = 'stylesState'
            val = state[field] || {}
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
            })
            return {
                ...state, [field]: val, currentStyles:
                {...state.currentStyles, ...action.data.value}
            }

        case CHANGE_TITLE:
            field = 'tableName'
            return {
                ...state, [field]: action.data
            }
        case CHANGE_DATE:
            return {...state, lastOpened: new Date().toJSON()}
        default: return state
    }
}

function value(state, field, action) {
    const val = state[field] || {}
    val[action.data.id] = action.data.value
    return val
}

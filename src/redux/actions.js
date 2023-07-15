import {APPLY_STYLE, CHANGE_DATE, CHANGE_TEXT, CHANGE_TITLE,
     CURRENT_STYLE, TABLE_RESIZE} from './types';

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}
export function changeText(text) {
    return {
        type: CHANGE_TEXT,
        data: text
    }
}

export function changeStyles(data) {
    return {
        type: CURRENT_STYLE,
        data
    }
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}

export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data
    }
}

export function changeDate() {
    return {
        type: CHANGE_DATE
    }
}

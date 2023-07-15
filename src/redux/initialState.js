import {clone} from '@core/utils';
import {defaultStyles} from '../constants';

const emptyState = {
    rowState: {},
    colState: {},
    dataState: {},
    currentText: '',
    stylesState: {},
    currentStyles: defaultStyles,
    tableName: 'Новая таблица',
    lastOpened: new Date().toJSON()
}

const normalize = state => ({
    ...state, currentStyles: defaultStyles
})

    export function normalizeInitialState(state) {
        return state ? normalize(state) : clone(emptyState)
    }

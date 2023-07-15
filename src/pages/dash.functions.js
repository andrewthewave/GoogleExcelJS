import {storage} from '@core/utils'

    function toHTML(el) {
    const table = storage(el)
    const id = el.split(':')[1]
    return `<li class="db__record">
    <a href="#excel/${id}">${table.tableName} </a>
    <strong>
    ${new Date(table.lastOpened).toLocaleDateString()}
    ${new Date(table.lastOpened).toLocaleTimeString()}
    </strong>
</li>
    `
}


function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.includes('excel')) {
            keys.push(key)
        }
    }
    return keys
}

export function getAllTables() {
    const keys = getAllKeys()
    if (!keys.length) {
        return `<p> Вы пока не создали ни одной таблицы`
    }
    return ` <div class="db__list-header">
    <span>Название</span>
    <span>Дата открытия</span>
    </div>
    <ul class="db__list">
    ${keys.map(toHTML).join('')}
    </ul>`
}

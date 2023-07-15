import {defaultStyles} from '../constants'

class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'?
        document.querySelector(selector): selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }
    focus() {
        this.$el.focus()
        return this
    }

    attr(name, value) {
        if (value || value === '') {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }

    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text
            return this
        }
            if (this.$el.tagName.toLowerCase() === 'input') {
                return this.$el.value.trim()
            }
            return this.$el.textContent.trim()
    }
    find(selector) {
        return this.$el.querySelector(selector) ?
        $(this.$el.querySelector(selector)) : null
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }
    clear() {
        this.html('')
        return this
    }
    append(node) {
        if (node instanceof Dom) {
            node=node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
        return this
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
        return this
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    next() {
        return $(this.$el.nextElementSibling)
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    get data() {
        return this.$el.dataset
    }

    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s] || defaultStyles[s]
            return res
        }, {})
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    css(styles ={}) {
        Object.keys(styles).forEach(prop => {
            this.$el.style[prop] = styles[prop]
        })
        return this
        }
    }


export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes='') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}

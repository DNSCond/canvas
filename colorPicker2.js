import { html_color_names } from "./html_color_names.js";
export class ColorPicker2 extends HTMLElement {
    #internals;
    static formAssociated = true;
    abortController;
    static get observedAttributes() {
        return ['value', 'swatches'];
    }
    constructor() {
        super();
        this.#internals = this.attachInternals();
        const outerHTML = document.createElement('div');
        const button = document.createElement('button');
        const textInput = document.createElement('input');
        const subkit = document.createElement('button');
        const swatches = document.createElement('div');
        const style = document.createElement('style');
        Object.assign(outerHTML.style, {
            backgroundColor: '#ffffff',
            position: 'absolute', display: 'none',
            border: '2px solid black',
            width: '10em',
            height: '25em',
            top: '2em',
            left: '0',
        });
        const selected = document.createElement('div');
        selected.className = 'selected';
        Object.assign(selected.style, {
            width: '100%',
            height: '4em',
        });
        outerHTML.append(selected);
        selected.append(textInput);
        selected.append(Object.assign(subkit, {
            innerText: 'change color',
            className: 'subkit',
        }));
        textInput.size = 7;
        textInput.value = '#000000';
        textInput.pattern = /^#?[\da-fA-F]{6}$/.source;
        textInput.style.fontFamily = 'monospace';
        this.attachShadow({ mode: 'open' }).append(style, Object.assign(button, {
            innerText: 'select color',
            className: 'selectionButton',
            type: 'button',
        }), Object.assign(outerHTML, {
            className: 'outerSelection',
        }));
        style.innerText = `button{
            font-family: monospace;
        } button[data-value] {
            font-family: monospace;
            display: block;
            width: 3em;
            height:3em;
            aspect-ratio: 1/1;
            border:1px solid black;
            box-sizing: border-box;
        }:host{position: relative;}`.replaceAll(/\s+/g, ' ');
        Object.assign(swatches.style, {
            display: 'flex',
            flexWrap: 'wrap',
            overflowY: 'auto',
            height: 'calc(100% - 4em)',
        });
        swatches.className = 'displayFlex';
        outerHTML.append(swatches);
    }
    connectedCallback() {
        this.abortController?.abort();
        const { signal } = this.abortController = new AbortController, self = this;
        const button = this.shadowRoot.querySelector('button.selectionButton');
        const subkit = this.shadowRoot.querySelector('button.subkit');
        const div = this.shadowRoot.querySelector('div.outerSelection');
        const input = this.shadowRoot.querySelector('input');
        button.addEventListener('click', function () {
            let goOpen;
            if (this.dataset.open === 'true') {
                this.dataset.open = 'false';
                goOpen = false;
            }
            else {
                this.dataset.open = 'true';
                goOpen = true;
            }
            if (goOpen)
                div.style.display = 'block';
            else
                div.style.display = 'none';
        }, { signal });
        button.setAttribute('tabindex', '0');
        this.swatch();
        this.addEventListener('newColorSelected', function (event) {
            const color = event.detail.value;
            if (color === null)
                return;
            div.style.backgroundColor = color;
        }, { signal });
        subkit.addEventListener('click', function () {
            self.value = input.value;
        }, { signal });
        input.addEventListener('keydown', function (keyevent) {
            if (keyevent.key === 'Enter')
                self.value = input.value;
        }, { signal });
    }
    disconnectedCallback() {
        this.abortController?.abort();
        if (this.shadowRoot)
            this.shadowRoot.innerHTML = '';
    }
    attributeChangedCallback(_name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        this.swatch();
    }
    swatch() {
        const flex = this.shadowRoot.querySelector('div.displayFlex');
        const swatches = this.getSwatches(), self = this;
        const { signal } = this.abortController ?? { signal: null };
        if (!flex || !signal)
            return;
        flex.innerHTML = '';
        if (swatches === null)
            return;
        flex.append(...swatches.map(function (swatch) {
            const button = document.createElement('button');
            button.addEventListener('click', function () {
                self.value = button.dataset.value ?? null;
            }, { signal });
            button.dataset.value = swatch;
            button.style.backgroundColor = swatch;
            // button.innerText = swatch;
            return button;
        }));
        return this;
    }
    getSwatches() {
        const swatches = this.getAttribute('swatches')?.split(/;/);
        if (swatches === undefined)
            return null;
        const colors = swatches.map(string => this.constructor.toColor(string));
        return colors.map(int => int === false ? null : `#${int.toString(16).padStart(6, "0")}`)
            .filter(m => m !== null);
    }
    setSwatches(swatches) {
        let a = Array.from(swatches, m => this.constructor.toColor(m));
        a = a.map(int => int === false ? null : `#${int.toString(16).padStart(6, "0")}`).filter(m => m !== null);
        a = a.filter(s => /^#?[\da-f]{6}$/i.test(s));
        const swatchesString = a.map(s => s.startsWith('#') ? s : '#' + s).join(';');
        this.setAttribute('swatches', swatchesString);
        this.swatch();
        return swatchesString.split(/;/);
    }
    get swatches() {
        return this.getSwatches();
    }
    set swatches(swatches) {
        this.setSwatches(swatches);
    }
    asRGBComponents() {
        const value = this.intVal;
        const r = value === null ? null : (value >> 16) & 0xFF;
        const g = value === null ? null : (value >> +8) & 0xFF;
        const b = value === null ? null : (value >> +0) & 0xFF;
        return { r, g, b, value };
    }
    get r() {
        return this.asRGBComponents().r;
    }
    get b() {
        return this.asRGBComponents().b;
    }
    get g() {
        return this.asRGBComponents().g;
    }
    invertColor() {
        const value = this.intVal;
        if (value === null)
            return null;
        return this.value = value ^ 0xffFFff;
    }
    set value(value) {
        const input = this.shadowRoot.querySelector('input');
        if (value === null) {
            this.removeAttribute("value");
            // noinspection TypeScriptValidateJSTypes
            this.#internals.setFormValue(value);
            this.dispatchEvent(new CustomEvent('newColorSelected', {
                detail: { value, __proto__: eventProto },
                cancelable: false,
                composed: false,
                bubbles: true,
            }));
            input.value = '';
            return;
        }
        const int = this.constructor.toColor(value);
        if (isNaN(int) || int === false) {
            throw new RangeError(`(${int}, ${value}) is not a valid color value`);
        }
        input.value = value = `#${int.toString(16).padStart(6, "0")}`;
        this.setAttribute('value', value);
        this.#internals.setFormValue(value);
        this.dispatchEvent(new CustomEvent('newColorSelected', {
            detail: { value, __proto__: eventProto },
            cancelable: false,
            composed: false,
            bubbles: true,
        }));
    }
    get value() {
        const color = this.intVal;
        if (color === null)
            return null;
        return `#${color.toString(16).padStart(6, "0")}`;
    }
    get intVal() {
        let int = this.getAttribute('value');
        if (int === null)
            return null;
        const color = this.constructor.toColor(int);
        if (color === false)
            return null;
        return color;
    }
    toString() {
        return this.value;
    }
    static toColor(color) {
        if (typeof color === "number")
            return color & 0xFFffFf;
        color = String(color).trim().toLowerCase();
        const htmlColorNames = html_color_names.lowercase;
        if (color in htmlColorNames) {
            const int = htmlColorNames[color];
            if (int === undefined)
                return false;
            return parseInt(int.replace(/^#/, ''), 16) & 0xffFFff;
        }
        // Check for hex colors
        const hexRegex = /^#?(?:[a-f0-9]{3}|[a-f0-9]{6})$/i;
        if (hexRegex.test(color)) {
            // Convert shorthand hex to full hex
            if (color.length === 4 && color.startsWith('#')) {
                color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
            }
            else if (color.length === 3 && !color.startsWith('#')) {
                color = `${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}`;
            }
            return parseInt(color.replace(/^#/, ''), 16);
        }
        if (color.startsWith('rgba')) {
            throw new Error('rgba not supported');
        }
        // Check for rgb colors
        const rgbRegex = /^rgb\((\d{1,3}),?\s*(\d{1,3}),?\s*(\d{1,3})\)$/;
        const rgbMatch = color.match(rgbRegex);
        if (rgbMatch) {
            return (+rgbMatch[1] << 16) + (+rgbMatch[2] << 8) + (+rgbMatch[3]);
        }
        if (color.startsWith('hsla')) {
            throw new Error('hsla not supported');
        }
        // Check for hsl colors
        const hslRegex = /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;
        const hslMatch = color.match(hslRegex);
        if (hslMatch) {
            const h = parseInt(hslMatch[1]) / 360;
            const s = parseInt(hslMatch[2]) / 100;
            const l = parseInt(hslMatch[3]) / 100;
            let r, g, b;
            if (s === 0) {
                r = g = b = l; // achromatic
            }
            else {
                const hue2rgb = function (p, q, t) {
                    if (t < 0)
                        t += 1;
                    if (t > 1)
                        t -= 1;
                    if (t < 1 / 6)
                        return p + (q - p) * 6 * t;
                    if (t < 1 / 2)
                        return q;
                    if (t < 2 / 3)
                        return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            return (Math.round(r * 255) << 16) + (Math.round(g * 255) << 8) + Math.round(b * 255);
        }
        return false;
    }
}
customElements.define('color-picker2', ColorPicker2);
const eventProto = {
    get [Symbol.toStringTag]() {
        return `newColorSelected(${this.value})`;
    },
};

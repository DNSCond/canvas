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
        const labelFor_ = document.createElement('label');
        const button = document.createElement('button');
        const textInput = document.createElement('input');
        const subkit = document.createElement('button');
        const swatches = document.createElement('div');
        const style = document.createElement('style');
        Object.assign(outerHTML.style, {
            backgroundColor: '#ffffff',
            position: 'absolute', display: 'none',
            border: '2px solid black',
            height: '25em',
            width: '13em',
            top: '2em',
            left: '0',
        });
        const selected = document.createElement('div');
        selected.className = 'selected';
        Object.assign(selected.style, {
            width: '100%', // height: '4em',
        });
        outerHTML.append(selected);
        selected.append(labelFor_);
        selected.append(Object.assign(subkit, {
            innerText: 'change color',
            className: 'subkit',
        }));
        Object.assign(labelFor_.style, {
            backgroundColor: '#000000',
            color: '#fFffFf',
        });
        labelFor_.append('Select color: ', textInput);
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
            width: 92%;
            margin:0.2em;
            border:1px solid black;
            box-sizing: border-box;
        }.outerSpan.colorname {
            /*width:100%;*/
            padding: 2px 0 2em 0;
            display: inline-block;
        }.innerSpan.colorname {
            background-color: black; padding: 3px;
            display: inline-block; color: white;
        }:host{position: relative;
        }:host *{overflow-x:hidden}`.replaceAll(/\s+/g, ' ');
        Object.assign(swatches.style, {
            // display: 'grid',
            // flexWrap: 'wrap',
            overflowY: 'auto',
            height: 'calc(100% - 4.5em)',
            // gridTemplateColumns: '3em 3em 3em',
            paddingRight: '0.3em',
            paddingLeft: '0.3em',
            paddingTop: '0.5em',
            gap: '1em',
        });
        swatches.className = 'displayFlex';
        outerHTML.append(swatches);
        // swatches.role = 'grid';
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
            if (goOpen) {
                div.style.display = 'block';
                input.focus();
            }
            else {
                div.style.display = 'none';
                button.focus();
            }
        }, { signal });
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
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';
        }
    }
    attributeChangedCallback(_name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        this.swatch();
    }
    swatch() {
        const flex = this.shadowRoot.querySelector('div.displayFlex');
        const swatches = this.getSwatchesV2(), self = this;
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
            button.dataset.value = swatch.color;
            button.style.backgroundColor = swatch.color;
            button.ariaLabel = `select ${swatch.name} with color ${swatch.color}`;
            button.tabIndex = 0;
            {
                const outerSpan = document.createElement('span');
                //Object.assign(outerSpan.style, {padding: '2px 2em 2em 2px', display: 'inline-block'});
                const innerSpan = document.createElement('span');
                innerSpan.innerText = `${swatch.name} (${swatch.color})`;
                outerSpan.append(innerSpan);
                outerSpan.className = 'outerSpan colorname';
                innerSpan.className = 'innerSpan colorname';
                // Object.assign(innerSpan.style, {
                //     backgroundColor: 'black',
                //     display: 'inline-block',
                //     color: 'white',
                // });
                button.append(outerSpan);
            }
            return button;
        }));
        return this;
    }
    getSwatchesV2() {
        const swatches = this.getAttribute('swatches');
        if (swatches === null)
            return null;
        return parseColorString(swatches);
    }
    getSwatches() {
        return this.getSwatchesV2()?.map(swatch => swatch.color) ?? null;
    }
    setSwatches(swatches) {
        if (swatches === null) {
            this.removeAttribute('swatches');
            return null;
        }
        const swatchesString = serializeColorString(swatches);
        this.setAttribute('swatches', swatchesString);
        this.swatch();
        return swatchesString;
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
    /**
     * returns a 0xRRGGBB
     * @param color
     */
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
    static toColorString(color) {
        if (color === false)
            throw new RangeError('toColorString must accept a valid color');
        return `#${(+color).toString(16).padStart(6, "0")}`;
    }
}
customElements.define('color-picker2', ColorPicker2);
const eventProto = {
    get [Symbol.toStringTag]() {
        //@ts-expect-error
        return `newColorSelected(${this.value})`;
    },
};
export function parseColorString(string) {
    const proto = {
        get [Symbol.toStringTag]() {
            // @ts-expect-error (i dont know how to annotate this)
            return `Color(${this.name}=${this.color})`;
        },
    }, regexp = /(#[\da-f]{6})(?:\s*=([^;#]*);?)?/ig, strx = `${string}`.matchAll(regexp);
    return Array.from(strx, mixed => ({
        name: mixed[2]?.trim() || mixed[1],
        color: mixed[1], __proto__: proto,
    }));
}
export function serializeColorString(colors) {
    const strings = Array.from(colors, mixed => {
        if (typeof mixed.name?.trim !== 'function') {
            return null;
        }
        const name = mixed.name.trim();
        if (/^#[\da-f]{6}$/ig.exec(mixed.color) && /^[^#;]*$/ig.exec(name)) {
            if (name) {
                return `${mixed.color}=${name}`;
            }
            else {
                return `${mixed.color}`;
            }
        }
        return null;
    }).filter(mixed => mixed !== null);
    return strings.join(';');
}

export {};
/**
 * (this file is deprecated)
 */
// // colorPicker
// export class ColorPicker extends HTMLElement {
//     protected inputElement: HTMLInputElement | undefined;
//     protected buttonElement: HTMLButtonElement;
//     protected selectedElement: HTMLDivElement;
//
//     static get observedAttributes(): string[] {
//         return ['inputname', 'value', 'swatches', 'input-classname', 'input-id'];
//     }
//
//     static template: HTMLTemplateElement = (function () {
//         const template = document.createElement('template');
//         const button = document.createElement('button');
//         const outerHTML = document.createElement('div');
//         const textInput = document.createElement('input');
//         const formInput = document.createElement('form');
//         const swatches = document.createElement('div');
//         const style = document.createElement('style');
//         Object.assign(outerHTML.style, {
//             position: 'absolute', display: 'none',
//             border: '2px solid black',
//             width: '10em',
//             height: '25em',
//             top: '2em',
//             left: '0',
//         });
//         const selected = document.createElement('div');
//         selected.className = 'selected';
//         Object.assign(selected.style, {
//             width: '100%',
//             height: '4em',
//         });
//         outerHTML.append(selected);
//         selected.append(formInput);
//         formInput.append(textInput);
//         textInput.size = 7;
//         textInput.pattern = /^#?[\da-fA-F]{6}$/.source;
//         textInput.style.fontFamily = 'monospace';
//         template.content.append(style, Object.assign(button, {
//             innerText: 'select color',
//             className: 'selectionButton',
//             type: 'button',
//         }), Object.assign(outerHTML, {
//             className: 'outerSelection',
//         }));
//         style.innerText = `button{
//             font-family: monospace;
//         } button[data-value] {
//             font-family: monospace;
//             display: block;
//             width: 3em;
//             height:3em;
//             aspect-ratio: 1/1;
//             border:1px solid black;
//             box-sizing: border-box;
//         }`;
//         Object.assign(swatches.style, {
//             backgroundColor: '#ffffff',
//             display: 'flex',
//             flexWrap: 'wrap',
//             overflowY: 'auto',
//             height: 'calc(100% - 4em)',
//         });
//         swatches.className = 'displayFlex';
//         outerHTML.append(swatches);
//         return template;
//     })();
//
//     constructor() {
//         super();
//         const shadow = this.attachShadow({mode: 'open'}),
//             nodes = new.target.template.content.cloneNode(true);
//         shadow.appendChild(nodes);
//         this.style.position = 'relative';
//         const div = shadow.querySelector('div.outerSelection') as HTMLDivElement,
//             button = shadow.querySelector('button.selectionButton') as HTMLButtonElement;
//         button.addEventListener('click',
//             function (this: HTMLButtonElement) {
//                 let goOpen: boolean;
//                 if (this.dataset.open === 'true') {
//                     this.dataset.open = 'false';
//                     goOpen = false;
//                 } else {
//                     this.dataset.open = 'true';
//                     goOpen = true;
//                 }
//                 if (goOpen) div.style.display = 'block';
//                 else div.style.display = 'none';
//             });
//         const self = this;
//         this.selectedElement = div.querySelector('div.selected') as HTMLDivElement;
//         (this.selectedElement.querySelector('form'
//         ) as HTMLFormElement).addEventListener('submit',
//             function (this: HTMLFormElement, event) {
//                 event.preventDefault();
//                 self.value = (this.querySelector('input[pattern][size]'
//                 ) as HTMLInputElement | null)?.value ?? '#000000';
//             });
//         this.buttonElement = button;
//     }
//
//     connectedCallback(): void {
//         this.addFormElement();
//         this.swatch();
//     }
//
//
//     private addFormElement(): HTMLInputElement {
//         const int = this.intVal, input: HTMLInputElement
//                 = this.querySelector("input[type=color]")
//                 ?? document.createElement("input"),
//             self = this;
//         input.type = "color";
//         this.inputElement = input;
//         if (int === null) {
//             input.removeAttribute('value');
//             this.buttonElement.innerText = 'select color';
//         } else {
//             const currentColor = `#${int.toString(16).padStart(6, "0")}`;
//             this.buttonElement.innerText = `select color (${currentColor})`;
//             input.value = currentColor;
//             this.selectedElement.style.backgroundColor = currentColor;
//             (this.selectedElement.querySelector('input[pattern][size]'
//             ) as HTMLInputElement).value = currentColor;
//         }
//         {
//             const inputname = this.getAttribute('inputname');
//             if (inputname === null) {
//                 input.removeAttribute('value');
//             } else {
//                 input.name = inputname;
//             }
//             const inputClassName = this.getAttribute('input-classname');//'input-classname','input-id'
//             if (inputClassName !== null) {
//                 input.className += ' ' + inputClassName;
//             }
//             const inputId = this.getAttribute('input-id');
//             if (inputId !== null) {
//                 input.id = inputId;
//             }
//         }
//         input.addEventListener('change', function (this: HTMLInputElement) {
//             const value = self.value = this.value;
//             self.dispatchEvent(new CustomEvent('newColorSelected', {detail: {value}}));
//         });
//         this.append(input);
//         return input;
//     }
//
//     private swatch() {
//         const flex = this.shadowRoot!.querySelector('div.displayFlex');
//         const swatches = this.getSwatches(), self = this;
//         if (!flex) return;
//         flex.innerHTML = '';
//         if (swatches === null) {
//             return;
//         }
//         flex.append(...swatches.map(function (swatch) {
//             const button = document.createElement('button');
//             button.addEventListener('click',
//                 function (this: HTMLButtonElement) {
//                     const value = self.value = button.dataset.value ?? null;
//                     if (value !== null) {
//                         self.dispatchEvent(new CustomEvent('newColorSelected', {detail: {value}}));
//                     }
//                 });
//             button.dataset.value = swatch;
//             button.style.backgroundColor = swatch;
//             // button.innerText = swatch;
//             return button;
//         }))
//     }
//
//     disconnectedCallback(): void {
//         this.inputElement?.remove();
//     }
//
//     attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null): void {
//         if (oldValue !== newValue) {
//             this.addFormElement();
//             this.swatch();
//         }
//     }
//
//     get value(): null | string {
//         const color = this.intVal;
//         if (color === null) return null;
//         return `#${color.toString(16).padStart(6, "0")}`;
//     }
//
//     get intVal(): null | number {
//         let int = this.getAttribute('value');
//         if (int === null) return null;
//         const color = (this.constructor as typeof ColorPicker).toColor(int);
//         if (color === false) return null;
//         return color;
//     }
//
//     toString() {
//         return this.value;
//     }
//
//     static toColor(color: string | number) {
//         if (typeof color === "number") return color & 0xFFffFf;
//         color = String(color).trim().toLowerCase();
//         const htmlColorNames = html_color_names.lowercase;
//         if (color in htmlColorNames) {
//             const int = htmlColorNames[color];
//             if (int === undefined) return false;
//             return parseInt(int.replace(/^#/, ''), 16) & 0xffFFff;
//         }
//         // Check for hex colors
//         const hexRegex = /^#?(?:[a-f0-9]{3}|[a-f0-9]{6})$/i;
//         if (hexRegex.test(color)) {
//             // Convert shorthand hex to full hex
//             if (color.length === 4 && color.startsWith('#')) {
//                 color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
//             } else if (color.length === 3 && !color.startsWith('#')) {
//                 color = `${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}`;
//             }
//             return parseInt(color.replace(/^#/, ''), 16);
//         }
//         if (color.startsWith('rgba')) {
//             throw new Error('rgba not supported');
//         }
//
//         // Check for rgb colors
//         const rgbRegex = /^rgb\((\d{1,3}),?\s*(\d{1,3}),?\s*(\d{1,3})\)$/;
//         const rgbMatch = color.match(rgbRegex);
//         if (rgbMatch) {
//             return (+rgbMatch[1] << 16) + (+rgbMatch[2] << 8) + (+rgbMatch[3]);
//         }
//
//         if (color.startsWith('hsla')) {
//             throw new Error('hsla not supported');
//         }
//         // Check for hsl colors
//         const hslRegex = /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;
//         const hslMatch = color.match(hslRegex);
//         if (hslMatch) {
//             const h = parseInt(hslMatch[1]) / 360;
//             const s = parseInt(hslMatch[2]) / 100;
//             const l = parseInt(hslMatch[3]) / 100;
//
//             let r: number, g: number, b: number;
//
//             if (s === 0) {
//                 r = g = b = l; // achromatic
//             } else {
//                 const hue2rgb = function (p: number, q: number, t: number): number {
//                     if (t < 0) t += 1;
//                     if (t > 1) t -= 1;
//                     if (t < 1 / 6) return p + (q - p) * 6 * t;
//                     if (t < 1 / 2) return q;
//                     if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
//                     return p;
//                 };
//
//                 const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//                 const p = 2 * l - q;
//                 r = hue2rgb(p, q, h + 1 / 3);
//                 g = hue2rgb(p, q, h);
//                 b = hue2rgb(p, q, h - 1 / 3);
//             }
//
//             return (Math.round(r * 255) << 16) + (Math.round(g * 255) << 8) + Math.round(b * 255);
//         }
//         return false;
//     }
//
//     set value(value: string | number | null) {
//         if (value === null) {
//             this.removeAttribute("value");
//             return;
//         }
//         const int = (this.constructor as typeof ColorPicker).toColor(value);
//         if (isNaN(int as unknown as number) || int === false) {
//             throw new RangeError(`(${int}, ${value}) is not a valid color value`);
//         }
//         value = `#${int.toString(16).padStart(6, "0")}`;
//         this.setAttribute('value', value);
//         this.dispatchEvent(new CustomEvent('newColorSelected', {detail: {value}}));
//     }
//
//     asRGBComponents(): { r: number | null, g: number | null, b: number | null, value: number | null } {
//         const value = this.intVal;
//         const r = value === null ? null : (value >> 16) & 0xFF;
//         const g = value === null ? null : (value >> +8) & 0xFF;
//         const b = value === null ? null : (value >> +0) & 0xFF;
//         return {r, g, b, value};
//     }
//
//     get r(): number | null {
//         return this.asRGBComponents().r;
//     }
//
//     get b(): number | null {
//         return this.asRGBComponents().b;
//     }
//
//     get g(): number | null {
//         return this.asRGBComponents().g;
//     }
//
//     invertColor(): number | null {
//         const value = this.intVal;
//         if (value === null) return null;
//         return this.value = value ^ 0xffFFff;
//     }
//
//     getSwatches(): string[] | null {
//         const swatches = this.getAttribute('swatches')?.split(/;/);
//         if (swatches === undefined) return null;
//         const colors = swatches.map(string => (this.constructor as typeof ColorPicker).toColor(string));
//         return colors.map(int => int === false ? null : `#${int.toString(16).padStart(6, "0")}`)
//             .filter(m => m !== null) as string[];
//     }
//
//     setSwatches(swatches: string[]) {
//         let a: (number | false)[] | string[] = Array.from(swatches, m => (this.constructor as typeof ColorPicker).toColor(m));
//         a = a.map(int => int === false ? null : `#${int.toString(16).padStart(6, "0")}`).filter(m => m !== null) as string[];
//         a = a.filter(s => /^#?[\da-f]{6}$/i.test(s));
//         this.setAttribute('swatches', a.map(s => s.startsWith('#') ? s : '#' + s).join(';'));
//         return a;
//     }
//
//     deduplicateSwatches(): string[] | null {
//         const swatches = this.getSwatches();
//         if (swatches === null) return null;
//         return [...(new Set(swatches))];
//     }
//
//     replaceSwatch(color: string | number, addAnyway: boolean = false) {
//         const swatches = this.getSwatches() ?? [];
//         const int = (this.constructor as typeof ColorPicker).toColor(color);
//         const convertedColor = int === false ? null : `#${int.toString(16).padStart(6, "0")}`;
//         if (convertedColor === null) return false;
//         const index = swatches.indexOf(convertedColor);
//         if (index < 0) {
//             if (addAnyway) {
//                 swatches.push(convertedColor);
//             } else return false;
//         } else {
//             swatches[index] = convertedColor;
//         }
//
//         return true;
//     }
//
//     removeSwatch(colors: (string | number)[]) {
//         const swatches = this.getSwatches() ?? [];
//         const toRemove = Array.from(colors, (this.constructor as typeof ColorPicker).toColor).map(
//             int => int === false ? null : `#${int.toString(16).padStart(6, "0")}`
//         ).filter(m => null !== m);
//         return this.setSwatches(swatches.filter(swatch => !toRemove.includes(swatch)));
//     }
// }

// colorPicker
export class ColorPicker extends HTMLElement {
    protected inputElement: HTMLInputElement | undefined;
    protected buttonElement: HTMLButtonElement;
    protected selectedElement: HTMLDivElement;

    static get observedAttributes(): string[] {
        return ['inputname', 'value', 'swatches', 'input-classname', 'input-id'];
    }

    static $html_color_names: {
        lowercase: {
            mediumorchid: string;
            palegoldenrod: string;
            black: string;
            darkseagreen: string;
            sienna: string;
            gainsboro: string;
            lightcoral: string;
            orange: string;
            darkgrey: string;
            dodgerblue: string;
            dimgrey: string;
            lightseagreen: string;
            aquamarine: string;
            beige: string;
            royalblue: string;
            darkviolet: string;
            mediumslateblue: string;
            olivedrab: string;
            midnightblue: string;
            sandybrown: string;
            violet: string;
            limegreen: string;
            powderblue: string;
            magenta: string;
            deepskyblue: string;
            darkslateblue: string;
            darkturquoise: string;
            chartreuse: string;
            olive: string;
            indianred: string;
            peachpuff: string;
            mediumpurple: string;
            yellow: string;
            lightblue: string;
            springgreen: string;
            indigo: string;
            darkred: string;
            peru: string;
            wheat: string;
            rosybrown: string;
            mediumaquamarine: string;
            darkcyan: string;
            firebrick: string;
            lawngreen: string;
            orangered: string;
            darkorange: string;
            teal: string;
            turquoise: string;
            seashell: string;
            honeydew: string;
            maroon: string;
            cyan: string;
            blue: string;
            moccasin: string;
            chocolate: string;
            whitesmoke: string;
            seagreen: string;
            mediumseagreen: string;
            thistle: string;
            lightgoldenrodyellow: string;
            lightcyan: string;
            red: string;
            lavenderblush: string;
            mistyrose: string;
            crimson: string;
            navajowhite: string;
            slateblue: string;
            tan: string;
            orchid: string;
            rebeccapurple: string;
            lightsalmon: string;
            snow: string;
            darkblue: string;
            tomato: string;
            lightslategrey: string;
            plum: string;
            cornsilk: string;
            darkslategrey: string;
            palegreen: string;
            yellowgreen: string;
            mintcream: string;
            palevioletred: string;
            gold: string;
            darkolivegreen: string;
            azure: string;
            salmon: string;
            lemonchiffon: string;
            floralwhite: string;
            blanchedalmond: string;
            greenyellow: string;
            silver: string;
            khaki: string;
            pink: string;
            lightskyblue: string;
            ivory: string;
            aliceblue: string;
            darkgreen: string;
            darksalmon: string;
            papayawhip: string;
            linen: string;
            lightgreen: string;
            mediumturquoise: string;
            lightgrey: string;
            antiquewhite: string;
            brown: string;
            oldlace: string;
            lightpink: string;
            darkgoldenrod: string;
            bisque: string;
            cadetblue: string;
            burlywood: string;
            mediumblue: string;
            blueviolet: string;
            lime: string;
            lavender: string;
            cornflowerblue: string;
            lightsteelblue: string;
            steelblue: string;
            ghostwhite: string;
            grey: string;
            mediumspringgreen: string;
            darkkhaki: string;
            paleturquoise: string;
            forestgreen: string;
            darkorchid: string;
            deeppink: string;
            mediumvioletred: string;
            hotpink: string;
            lightyellow: string;
            navy: string;
            saddlebrown: string;
            white: string;
            purple: string;
            coral: string;
            slategrey: string;
            darkmagenta: string;
            goldenrod: string;
            green: string;
            skyblue: string;
        };
        samecase: {
            MediumOrchid: string;
            PaleGoldenRod: string;
            Black: string;
            DarkSeaGreen: string;
            Sienna: string;
            Gainsboro: string;
            LightCoral: string;
            Orange: string;
            DarkGrey: string;
            DodgerBlue: string;
            DimGrey: string;
            LightSeaGreen: string;
            Aquamarine: string;
            Beige: string;
            RoyalBlue: string;
            DarkViolet: string;
            MediumSlateBlue: string;
            OliveDrab: string;
            MidnightBlue: string;
            SandyBrown: string;
            Violet: string;
            LimeGreen: string;
            PowderBlue: string;
            Magenta: string;
            DeepSkyBlue: string;
            DarkSlateBlue: string;
            DarkTurquoise: string;
            Chartreuse: string;
            Olive: string;
            IndianRed: string;
            PeachPuff: string;
            MediumPurple: string;
            Yellow: string;
            LightBlue: string;
            SpringGreen: string;
            Indigo: string;
            DarkRed: string;
            Peru: string;
            Wheat: string;
            RosyBrown: string;
            MediumAquaMarine: string;
            DarkCyan: string;
            FireBrick: string;
            LawnGreen: string;
            OrangeRed: string;
            DarkOrange: string;
            Teal: string;
            Turquoise: string;
            SeaShell: string;
            HoneyDew: string;
            Maroon: string;
            Cyan: string;
            Blue: string;
            Moccasin: string;
            Chocolate: string;
            WhiteSmoke: string;
            SeaGreen: string;
            MediumSeaGreen: string;
            Thistle: string;
            LightGoldenRodYellow: string;
            LightCyan: string;
            Red: string;
            LavenderBlush: string;
            MistyRose: string;
            Crimson: string;
            NavajoWhite: string;
            SlateBlue: string;
            Tan: string;
            Orchid: string;
            RebeccaPurple: string;
            LightSalmon: string;
            Snow: string;
            DarkBlue: string;
            Tomato: string;
            LightSlateGrey: string;
            Plum: string;
            Cornsilk: string;
            DarkSlateGrey: string;
            PaleGreen: string;
            YellowGreen: string;
            MintCream: string;
            PaleVioletRed: string;
            Gold: string;
            DarkOliveGreen: string;
            Azure: string;
            Salmon: string;
            LemonChiffon: string;
            FloralWhite: string;
            BlanchedAlmond: string;
            GreenYellow: string;
            Silver: string;
            Khaki: string;
            Pink: string;
            LightSkyBlue: string;
            Ivory: string;
            AliceBlue: string;
            DarkGreen: string;
            DarkSalmon: string;
            PapayaWhip: string;
            Linen: string;
            LightGreen: string;
            MediumTurquoise: string;
            LightGrey: string;
            AntiqueWhite: string;
            Brown: string;
            OldLace: string;
            LightPink: string;
            DarkGoldenRod: string;
            Bisque: string;
            CadetBlue: string;
            BurlyWood: string;
            MediumBlue: string;
            BlueViolet: string;
            Lime: string;
            Lavender: string;
            CornflowerBlue: string;
            LightSteelBlue: string;
            SteelBlue: string;
            GhostWhite: string;
            Grey: string;
            MediumSpringGreen: string;
            DarkKhaki: string;
            PaleTurquoise: string;
            ForestGreen: string;
            DarkOrchid: string;
            DeepPink: string;
            MediumVioletRed: string;
            HotPink: string;
            LightYellow: string;
            Navy: string;
            SaddleBrown: string;
            White: string;
            Purple: string;
            Coral: string;
            SlateGrey: string;
            DarkMagenta: string;
            GoldenRod: string;
            Green: string;
            SkyBlue: string;
        }
    };

    static {
        this.$html_color_names = (function () {
            const $initial = {
                __proto__: null,
                'Black': '#000000',
                'Navy': '#000080',
                'DarkBlue': '#00008B',
                'MediumBlue': '#0000CD',
                'Blue': '#0000FF',
                'DarkGreen': '#006400',
                'Green': '#008000',
                'Teal': '#008080',
                'DarkCyan': '#008B8B',
                'DeepSkyBlue': '#00BFFF',
                'DarkTurquoise': '#00CED1',
                'MediumSpringGreen': '#00FA9A',
                'Lime': '#00FF00',
                'SpringGreen': '#00FF7F',
                'Cyan': '#00FFFF',
                'MidnightBlue': '#191970',
                'DodgerBlue': '#1E90FF',
                'LightSeaGreen': '#20B2AA',
                'ForestGreen': '#228B22',
                'SeaGreen': '#2E8B57',
                'DarkSlateGrey': '#2F4F4F',
                'LimeGreen': '#32CD32',
                'MediumSeaGreen': '#3CB371',
                'Turquoise': '#40E0D0',
                'RoyalBlue': '#4169E1',
                'SteelBlue': '#4682B4',
                'DarkSlateBlue': '#483D8B',
                'MediumTurquoise': '#48D1CC',
                'Indigo': '#4B0082',
                'DarkOliveGreen': '#556B2F',
                'CadetBlue': '#5F9EA0',
                'CornflowerBlue': '#6495ED',
                'RebeccaPurple': '#663399',
                'MediumAquaMarine': '#66CDAA',
                'DimGrey': '#696969',
                'SlateBlue': '#6A5ACD',
                'OliveDrab': '#6B8E23',
                'SlateGrey': '#708090',
                'LightSlateGrey': '#778899',
                'MediumSlateBlue': '#7B68EE',
                'LawnGreen': '#7CFC00',
                'Chartreuse': '#7FFF00',
                'Aquamarine': '#7FFFD4',
                'Maroon': '#800000',
                'Purple': '#800080',
                'Olive': '#808000',
                'Grey': '#808080',
                'SkyBlue': '#87CEEB',
                'LightSkyBlue': '#87CEFA',
                'BlueViolet': '#8A2BE2',
                'DarkRed': '#8B0000',
                'DarkMagenta': '#8B008B',
                'SaddleBrown': '#8B4513',
                'DarkSeaGreen': '#8FBC8F',
                'LightGreen': '#90EE90',
                'MediumPurple': '#9370DB',
                'DarkViolet': '#9400D3',
                'PaleGreen': '#98FB98',
                'DarkOrchid': '#9932CC',
                'YellowGreen': '#9ACD32',
                'Sienna': '#A0522D',
                'Brown': '#A52A2A',
                'DarkGrey': '#A9A9A9',
                'LightBlue': '#ADD8E6',
                'GreenYellow': '#ADFF2F',
                'PaleTurquoise': '#AFEEEE',
                'LightSteelBlue': '#B0C4DE',
                'PowderBlue': '#B0E0E6',
                'FireBrick': '#B22222',
                'DarkGoldenRod': '#B8860B',
                'MediumOrchid': '#BA55D3',
                'RosyBrown': '#BC8F8F',
                'DarkKhaki': '#BDB76B',
                'Silver': '#C0C0C0',
                'MediumVioletRed': '#C71585',
                'IndianRed': '#CD5C5C',
                'Peru': '#CD853F',
                'Chocolate': '#D2691E',
                'Tan': '#D2B48C',
                'LightGrey': '#D3D3D3',
                'Thistle': '#D8BFD8',
                'Orchid': '#DA70D6',
                'GoldenRod': '#DAA520',
                'PaleVioletRed': '#DB7093',
                'Crimson': '#DC143C',
                'Gainsboro': '#DCDCDC',
                'Plum': '#DDA0DD',
                'BurlyWood': '#DEB887',
                'LightCyan': '#E0FFFF',
                'Lavender': '#E6E6FA',
                'DarkSalmon': '#E9967A',
                'Violet': '#EE82EE',
                'PaleGoldenRod': '#EEE8AA',
                'LightCoral': '#F08080',
                'Khaki': '#F0E68C',
                'AliceBlue': '#F0F8FF',
                'HoneyDew': '#F0FFF0',
                'Azure': '#F0FFFF',
                'SandyBrown': '#F4A460',
                'Wheat': '#F5DEB3',
                'Beige': '#F5F5DC',
                'WhiteSmoke': '#F5F5F5',
                'MintCream': '#F5FFFA',
                'GhostWhite': '#F8F8FF',
                'Salmon': '#FA8072',
                'AntiqueWhite': '#FAEBD7',
                'Linen': '#FAF0E6',
                'LightGoldenRodYellow': '#FAFAD2',
                'OldLace': '#FDF5E6',
                'Red': '#FF0000',
                'Magenta': '#FF00FF',
                'DeepPink': '#FF1493',
                'OrangeRed': '#FF4500',
                'Tomato': '#FF6347',
                'HotPink': '#FF69B4',
                'Coral': '#FF7F50',
                'DarkOrange': '#FF8C00',
                'LightSalmon': '#FFA07A',
                'Orange': '#FFA500',
                'LightPink': '#FFB6C1',
                'Pink': '#FFC0CB',
                'Gold': '#FFD700',
                'PeachPuff': '#FFDAB9',
                'NavajoWhite': '#FFDEAD',
                'Moccasin': '#FFE4B5',
                'Bisque': '#FFE4C4',
                'MistyRose': '#FFE4E1',
                'BlanchedAlmond': '#FFEBCD',
                'PapayaWhip': '#FFEFD5',
                'LavenderBlush': '#FFF0F5',
                'SeaShell': '#FFF5EE',
                'Cornsilk': '#FFF8DC',
                'LemonChiffon': '#FFFACD',
                'FloralWhite': '#FFFAF0',
                'Snow': '#FFFAFA',
                'Yellow': '#FFFF00',
                'LightYellow': '#FFFFE0',
                'Ivory': '#FFFFF0',
                'White': '#FFFFFF',
            };
            const $return: any = {__proto__: null},
                strtolower = ((s: string): string => String(s).toLowerCase());
            for (let [$key, $value] of Object.entries($initial)) {
                $return[strtolower($key)] = strtolower($value as unknown as string);
            }
            return {
                'samecase': $initial,
                'lowercase': $return,
                __proto__: null,
            };
        })();
    }

    static template: HTMLTemplateElement = (function () {
        const template = document.createElement('template');
        const button = document.createElement('button');
        const outerHTML = document.createElement('div');
        const textInput = document.createElement('input');
        const formInput = document.createElement('form');
        const swatches = document.createElement('div');
        const style = document.createElement('style');
        Object.assign(outerHTML.style, {
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
        selected.append(formInput);
        formInput.append(textInput);
        textInput.size = 7;
        textInput.pattern = /^#?[\da-fA-F]{6}$/.source;
        textInput.style.fontFamily = 'monospace';
        template.content.append(style, Object.assign(button, {
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
        }`;
        Object.assign(swatches.style, {
            backgroundColor: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            overflowY: 'auto',
            height: 'calc(100% - 4em)',
        });
        swatches.className = 'displayFlex';
        outerHTML.append(swatches);
        return template;
    })();

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'}),
            nodes = new.target.template.content.cloneNode(true);
        shadow.appendChild(nodes);
        this.style.position = 'relative';
        const div = shadow.querySelector('div.outerSelection') as HTMLDivElement,
            button = shadow.querySelector('button.selectionButton') as HTMLButtonElement;
        button.addEventListener('click',
            function (this: HTMLButtonElement) {
                let goOpen: boolean;
                if (this.dataset.open === 'true') {
                    this.dataset.open = 'false';
                    goOpen = false;
                } else {
                    this.dataset.open = 'true';
                    goOpen = true;
                }
                if (goOpen) div.style.display = 'block';
                else div.style.display = 'none';
            });
        const self = this;
        this.selectedElement = div.querySelector('div.selected') as HTMLDivElement;
        (this.selectedElement.querySelector('form'
        ) as HTMLFormElement).addEventListener('submit',
            function (this: HTMLFormElement, event) {
                event.preventDefault();
                self.value = (this.querySelector('input[pattern][size]'
                ) as HTMLInputElement | null)?.value ?? '#000000';
            });
        this.buttonElement = button;
    }

    connectedCallback(): void {
        this.addFormElement();
        this.swatch();
    }


    private addFormElement(): HTMLInputElement {
        const int = this.intVal, input: HTMLInputElement
                = this.querySelector("input[type=color]")
                ?? document.createElement("input"),
            self = this;
        input.type = "color";
        this.inputElement = input;
        if (int === null) {
            input.removeAttribute('value');
            this.buttonElement.innerText = 'select color';
        } else {
            const currentColor = `#${int.toString(16).padStart(6, "0")}`;
            this.buttonElement.innerText = `select color (${currentColor})`;
            input.value = currentColor;
            this.selectedElement.style.backgroundColor = currentColor;
            (this.selectedElement.querySelector('input[pattern][size]'
            ) as HTMLInputElement).value = currentColor;
        }
        {
            const inputname = this.getAttribute('inputname');
            if (inputname === null) {
                input.removeAttribute('value');
            } else {
                input.name = inputname;
            }
            const inputClassName = this.getAttribute('input-classname');//'input-classname','input-id'
            if (inputClassName !== null) {
                input.className += ' ' + inputClassName;
            }
            const inputId = this.getAttribute('input-id');
            if (inputId !== null) {
                input.id = inputId;
            }
        }
        input.addEventListener('change', function (this: HTMLInputElement) {
            const value = self.value = this.value;
            self.dispatchEvent(new CustomEvent('newColorSelected', {detail: {value}}));
        });
        this.append(input);
        return input;
    }

    private swatch() {
        const flex = this.shadowRoot!.querySelector('div.displayFlex');
        const swatches = this.getSwatches(), self = this;
        if (!flex) return;
        flex.innerHTML = '';
        if (swatches === null) {
            return;
        }
        flex.append(...swatches.map(function (swatch) {
            const button = document.createElement('button');
            button.addEventListener('click',
                function (this: HTMLButtonElement) {
                    const value = self.value = button.dataset.value ?? null;
                    if (value !== null) {
                        self.dispatchEvent(new CustomEvent('newColorSelected', {detail: {value}}));
                    }
                });
            button.dataset.value = swatch;
            button.style.backgroundColor = swatch;
            // button.innerText = swatch;
            return button;
        }))
    }

    disconnectedCallback(): void {
        this.inputElement?.remove();
    }

    attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null): void {
        if (oldValue !== newValue) {
            this.addFormElement();
            this.swatch();
        }
    }

    get value(): null | string {
        const color = this.intVal;
        if (color === null) return null;
        return `#${color.toString(16).padStart(6, "0")}`;
    }

    get intVal(): null | number {
        let int = this.getAttribute('value');
        if (int === null) return null;
        const color = (this.constructor as typeof ColorPicker).toColor(int);
        if (color === false) return null;
        return color;
    }

    toString() {
        return this.value;
    }

    static toColor(color: string | number) {
        if (typeof color === "number") return color & 0xFFffFf;
        color = String(color).trim().toLowerCase();
        const htmlColorNames = this.$html_color_names.lowercase;
        if (color in htmlColorNames) {
            // @ts-expect-error
            const int = htmlColorNames[color];
            if (int === undefined) return false;
            return parseInt(int.replace(/^#/, ''), 16) & 0xffFFff;
        }
        // Check for hex colors
        const hexRegex = /^#?(?:[a-f0-9]{3}|[a-f0-9]{6})$/i;
        if (hexRegex.test(color)) {
            // Convert shorthand hex to full hex
            if (color.length === 4 && color.startsWith('#')) {
                color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
            } else if (color.length === 3 && !color.startsWith('#')) {
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

            let r: number, g: number, b: number;

            if (s === 0) {
                r = g = b = l; // achromatic
            } else {
                const hue2rgb = function (p: number, q: number, t: number): number {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
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

    set value(value: string | number | null) {
        if (value === null) {
            this.removeAttribute("value");
            return;
        }
        const int = (this.constructor as typeof ColorPicker).toColor(value);
        if (isNaN(int as unknown as number) || int === false) {
            throw new RangeError(`(${int}, ${value}) is not a valid color value`);
        }
        value = `#${int.toString(16).padStart(6, "0")}`;
        this.setAttribute('value', value);
        this.dispatchEvent(new CustomEvent('newColorSelected', {detail: {value}}));
    }

    asRGBComponents(): { r: number | null, g: number | null, b: number | null, value: number | null } {
        const value = this.intVal;
        const r = value === null ? null : (value >> 16) & 0xFF;
        const g = value === null ? null : (value >> +8) & 0xFF;
        const b = value === null ? null : (value >> +0) & 0xFF;
        return {r, g, b, value};
    }

    get r(): number | null {
        return this.asRGBComponents().r;
    }

    get b(): number | null {
        return this.asRGBComponents().b;
    }

    get g(): number | null {
        return this.asRGBComponents().g;
    }

    invertColor(): number | null {
        const value = this.intVal;
        if (value === null) return null;
        return this.value = value ^ 0xffFFff;
    }

    getSwatches(): string[] | null {
        const swatches = this.getAttribute('swatches')?.split(/;/);
        if (swatches === undefined) return null;
        const colors = swatches.map(string => (this.constructor as typeof ColorPicker).toColor(string));
        return colors.map(int => int === false ? null : `#${int.toString(16).padStart(6, "0")}`)
            .filter(m => m !== null) as string[];
    }

    setSwatches(swatches: string[]) {
        let a: (number | false)[] | string[] = Array.from(swatches, m => (this.constructor as typeof ColorPicker).toColor(m));
        a = a.map(int => int === false ? null : `#${int.toString(16).padStart(6, "0")}`).filter(m => m !== null) as string[];
        a = a.filter(s => /^#?[\da-f]{6}$/i.test(s));
        this.setAttribute('swatches', a.map(s => s.startsWith('#') ? s : '#' + s).join(';'));
        return a;
    }

    deduplicateSwatches(): string[] | null {
        const swatches = this.getSwatches();
        if (swatches === null) return null;
        return [...(new Set(swatches))];
    }

    replaceSwatch(color: string | number, addAnyway: boolean = false) {
        const swatches = this.getSwatches() ?? [];
        const int = (this.constructor as typeof ColorPicker).toColor(color);
        const convertedColor = int === false ? null : `#${int.toString(16).padStart(6, "0")}`;
        if (convertedColor === null) return false;
        const index = swatches.indexOf(convertedColor);
        if (index < 0) {
            if (addAnyway) {
                swatches.push(convertedColor);
            } else return false;
        } else {
            swatches[index] = convertedColor;
        }

        return true;
    }

    removeSwatch(colors: (string | number)[]) {
        const swatches = this.getSwatches() ?? [];
        const toRemove = Array.from(colors, (this.constructor as typeof ColorPicker).toColor).map(
            int => int === false ? null : `#${int.toString(16).padStart(6, "0")}`
        ).filter(m => null !== m);
        return this.setSwatches(swatches.filter(swatch => !toRemove.includes(swatch)));
    }
}

customElements.define('color-picker', ColorPicker);

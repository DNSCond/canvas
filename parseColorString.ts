// parseColorString
export type ParsedColor = { color: string; name: string; };

export function parseColorString(string: string): ParsedColor[] {
    const proto = {
            get [Symbol.toStringTag](): string {
                // @ts-expect-error (i dont know how to annotate this)
                return `Color(${this.name}=${this.color})`;
            },
        }, regexp = /(#[\da-f]{6})(?:\s*=\s*([^;#]*);?)?/ig,
        strx = `${string}`.matchAll(regexp);
    return Array.from(strx, mixed => ({
        name: mixed[2]?.trim() || mixed[1],
        color: mixed[1], __proto__: proto,
    }));
}

export function serializeColorString(colors: ParsedColor[]): string {
    const strings = Array.from(colors, mixed => {
        if (typeof mixed.name?.trim !== 'function') {
            return null;
        }
        const name = mixed.name.trim();
        if (/^#[\da-f]{6}$/ig.exec(mixed.color) && /^[^#;]*$/ig.exec(name)) {
            if (name) {
                return `${mixed.color}=${name}`;
            } else {
                return `${mixed.color}`;
            }
        }
        return null;
    }).filter(mixed => mixed !== null) as string[];
    return strings.join(';');
}

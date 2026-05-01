import LayoutElementPk from '../element/layout-element';

export default class Typography extends LayoutElementPk {
    protected structuralCss(): string {
        return `
            typography-pk {
                display: block;
                font-family: var(--typo-font-family, inherit);
                font-size: var(--typo-font-size, inherit);
                font-weight: var(--typo-font-weight, normal);
                font-style: var(--typo-font-style, normal);
                line-height: var(--typo-line-height, inherit);
                letter-spacing: var(--typo-letter-spacing, normal);
                text-align: var(--typo-text-align, inherit);
                text-transform: var(--typo-text-transform, none);
                text-decoration: var(--typo-text-decoration, none);
                color: var(--typo-color, inherit);
            }
            typography-pk[variant="heading-1"] {
                --typo-font-size: var(--s4);
                --typo-font-weight: bold;
                --typo-line-height: 1.1;
                --typo-letter-spacing: -0.025em;
            }
            typography-pk[variant="heading-2"] {
                --typo-font-size: var(--s3);
                --typo-font-weight: bold;
                --typo-line-height: 1.2;
                --typo-letter-spacing: -0.02em;
            }
            typography-pk[variant="heading-3"] {
                --typo-font-size: var(--s2);
                --typo-font-weight: 600;
                --typo-line-height: 1.3;
                --typo-letter-spacing: -0.01em;
            }
            typography-pk[variant="body"] {
                --typo-font-size: var(--s0);
                --typo-line-height: 1.6;
            }
            typography-pk[variant="caption"] {
                --typo-font-size: var(--s-1);
                --typo-line-height: 1.4;
                --typo-letter-spacing: 0.01em;
            }
            typography-pk[variant="small"] {
                --typo-font-size: var(--s-2);
                --typo-line-height: 1.3;
                --typo-letter-spacing: 0.02em;
            }
        `;
    }

    protected override applyInstanceStyles(): void {
        const map: [string, string][] = [
            ['--typo-font-family', this.fontFamily],
            ['--typo-font-size', this.fontSize],
            ['--typo-font-weight', this.fontWeight],
            ['--typo-font-style', this.fontStyle],
            ['--typo-line-height', this.lineHeight],
            ['--typo-letter-spacing', this.letterSpacing],
            ['--typo-text-align', this.textAlign],
            ['--typo-text-transform', this.textTransform],
            ['--typo-text-decoration', this.textDecoration],
            ['--typo-color', this.color],
        ];
        for (const [prop, value] of map) {
            if (value) this.style.setProperty(prop, value);
            else this.style.removeProperty(prop);
        }
    }

    get fontFamily() { return this.getAttribute('fontFamily') || ''; }
    set fontFamily(value: string) { this.setAttribute('fontFamily', value); }
    get fontSize() { return this.getAttribute('fontSize') || ''; }
    set fontSize(value: string) { this.setAttribute('fontSize', value); }
    get fontWeight() { return this.getAttribute('fontWeight') || ''; }
    set fontWeight(value: string) { this.setAttribute('fontWeight', value); }
    get fontStyle() { return this.getAttribute('fontStyle') || ''; }
    set fontStyle(value: string) { this.setAttribute('fontStyle', value); }
    get lineHeight() { return this.getAttribute('lineHeight') || ''; }
    set lineHeight(value: string) { this.setAttribute('lineHeight', value); }
    get letterSpacing() { return this.getAttribute('letterSpacing') || ''; }
    set letterSpacing(value: string) { this.setAttribute('letterSpacing', value); }
    get textAlign() { return this.getAttribute('textAlign') || ''; }
    set textAlign(value: string) { this.setAttribute('textAlign', value); }
    get textTransform() { return this.getAttribute('textTransform') || ''; }
    set textTransform(value: string) { this.setAttribute('textTransform', value); }
    get textDecoration() { return this.getAttribute('textDecoration') || ''; }
    set textDecoration(value: string) { this.setAttribute('textDecoration', value); }
    get color() { return this.getAttribute('color') || ''; }
    set color(value: string) { this.setAttribute('color', value); }
    get variant() { return this.getAttribute('variant') || ''; }
    set variant(value: string) { this.setAttribute('variant', value); }

    static get observedAttributes() {
        return ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'letterSpacing', 'textAlign', 'textTransform', 'textDecoration', 'color', 'variant'];
    }
}

if ('customElements' in window && !customElements.get('typography-pk')) {
    customElements.define('typography-pk', Typography);
}

import ShadowElementPk from '../element/shadow-element';

export default class Typography extends ShadowElementPk {
    constructor() {
        super('typography-pk');
    }

    styles(): string {
        return `
            :host {
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
        `;
    }

    render(): void {
        this.shadow.innerHTML = `<slot></slot>`;
        this.updateStyles();
    }

    protected override update(): void { this.updateStyles(); }

    private updateStyles(): void {
        const v = this.getVariantStyles();
        this.style.setProperty('--typo-font-family', this.fontFamily || v.fontFamily || 'inherit');
        this.style.setProperty('--typo-font-size', this.fontSize || v.fontSize || 'inherit');
        this.style.setProperty('--typo-font-weight', this.fontWeight || v.fontWeight || 'normal');
        this.style.setProperty('--typo-font-style', this.fontStyle || 'normal');
        this.style.setProperty('--typo-line-height', this.lineHeight || v.lineHeight || 'inherit');
        this.style.setProperty('--typo-letter-spacing', this.letterSpacing || v.letterSpacing || 'normal');
        this.style.setProperty('--typo-text-align', this.textAlign || 'inherit');
        this.style.setProperty('--typo-text-transform', this.textTransform || 'none');
        this.style.setProperty('--typo-text-decoration', this.textDecoration || 'none');
        this.style.setProperty('--typo-color', this.color || 'inherit');
    }

    private getVariantStyles(): Record<string, string> {
        switch (this.variant) {
            case 'heading-1': return { fontSize: 'var(--s4)', fontWeight: 'bold', lineHeight: '1.1', letterSpacing: '-0.025em', fontFamily: 'inherit' };
            case 'heading-2': return { fontSize: 'var(--s3)', fontWeight: 'bold', lineHeight: '1.2', letterSpacing: '-0.02em', fontFamily: 'inherit' };
            case 'heading-3': return { fontSize: 'var(--s2)', fontWeight: '600', lineHeight: '1.3', letterSpacing: '-0.01em', fontFamily: 'inherit' };
            case 'body': return { fontSize: 'var(--s0)', fontWeight: 'normal', lineHeight: '1.6', letterSpacing: 'normal', fontFamily: 'inherit' };
            case 'caption': return { fontSize: 'var(--s-1)', fontWeight: 'normal', lineHeight: '1.4', letterSpacing: '0.01em', fontFamily: 'inherit' };
            case 'small': return { fontSize: 'var(--s-2)', fontWeight: 'normal', lineHeight: '1.3', letterSpacing: '0.02em', fontFamily: 'inherit' };
            default: return {};
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

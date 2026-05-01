import LayoutElementPk from '../element/layout-element';

export default class Box extends LayoutElementPk {
    protected structuralCss(): string {
        return `
            box-pk {
                display: inline-block;
                box-sizing: border-box;
                padding: var(--box-padding, var(--s1));
                border-style: solid;
                border-width: var(--box-border-width, 0);
                border-color: var(--box-border-color, transparent);
                border-radius: var(--box-border-radius, 0);
                color: var(--box-color, inherit);
                background-color: var(--box-bg-color, transparent);
                box-shadow: var(--box-shadow, none);
            }
        `;
    }

    protected override applyInstanceStyles(): void {
        this.style.setProperty('--box-padding', this.padding);
        this.style.setProperty('--box-border-width', this.borderWidth === 'none' ? '0' : this.borderWidth);
        this.style.setProperty('--box-border-color', this.borderColor);
        this.style.setProperty('--box-border-radius', this.borderRadius);
        this.style.setProperty('--box-color', this.color);
        this.style.setProperty('--box-bg-color', this.backgroundColor);
        this.style.setProperty('--box-shadow', this.boxShadow || 'none');
    }

    get padding() { return this.getAttribute('padding') || 'var(--s1)'; }
    set padding(val: string) { this.setAttribute('padding', val); }

    get borderWidth() { return this.getAttribute('borderWidth') || 'none'; }
    set borderWidth(val: string) { this.setAttribute('borderWidth', val); }

    get borderColor() { return this.getAttribute('borderColor') || '#000'; }
    set borderColor(val: string) { this.setAttribute('borderColor', val); }

    get borderRadius() { return this.getAttribute('borderRadius') || '0'; }
    set borderRadius(val: string) { this.setAttribute('borderRadius', val); }

    get color() { return this.getAttribute('color') || 'inherit'; }
    set color(val: string) { this.setAttribute('color', val); }

    get backgroundColor() { return this.getAttribute('backgroundColor') || 'transparent'; }
    set backgroundColor(val: string) { this.setAttribute('backgroundColor', val); }

    get boxShadow() { return this.getAttribute('shadow') || ''; }
    set boxShadow(val: string) { this.setAttribute('shadow', val); }

    static get observedAttributes() {
        return ['padding', 'borderWidth', 'borderColor', 'borderRadius', 'color', 'backgroundColor', 'shadow'];
    }
}

if ('customElements' in window && !customElements.get('box-pk')) {
    customElements.define('box-pk', Box);
}

declare global {
    interface HTMLElementTagNameMap {
        'box-pk': Box;
    }
}

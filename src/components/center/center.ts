import LayoutElementPk from '../element/layout-element';

export default class Center extends LayoutElementPk {
    protected structuralCss(): string {
        return `
            center-pk {
                display: block;
                box-sizing: content-box;
                margin-inline-start: auto;
                margin-inline-end: auto;
                max-inline-size: var(--center-max-width, var(--measure));
                padding-inline-start: var(--center-gutter, 0);
                padding-inline-end: var(--center-gutter, 0);
            }
            center-pk[alignText] { text-align: center; }
            center-pk[intrinsic] {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        `;
    }

    protected override applyInstanceStyles(): void {
        this.style.setProperty('--center-max-width', this.maxWidth);
        this.style.setProperty('--center-gutter', this.gutters || '0');
    }

    get maxWidth() { return this.getAttribute('maxWidth') || 'var(--measure)'; }
    set maxWidth(value: string) { this.setAttribute('maxWidth', value); }

    get alignText() { return this.hasAttribute('alignText'); }
    set alignText(value: boolean) { value ? this.setAttribute('alignText', '') : this.removeAttribute('alignText'); }

    get gutters() { return this.getAttribute('gutters'); }
    set gutters(value: string | null) { value ? this.setAttribute('gutters', value) : this.removeAttribute('gutters'); }

    get intrinsic() { return this.hasAttribute('intrinsic'); }
    set intrinsic(value: boolean) { value ? this.setAttribute('intrinsic', '') : this.removeAttribute('intrinsic'); }

    static get observedAttributes() { return ['maxWidth', 'alignText', 'gutters', 'intrinsic']; }
}

if ('customElements' in window && !customElements.get('center-pk')) {
    customElements.define('center-pk', Center);
}

declare global {
    interface HTMLElementTagNameMap {
        'center-pk': Center;
    }
}

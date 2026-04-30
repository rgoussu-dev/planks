import { LayoutShadowElementPk } from '../element/shadow-element';

export default class Imposter extends LayoutShadowElementPk {
    constructor() {
        super('imposter-pk');
    }

    styles(): string {
        return `
            :host {
                position: var(--imposter-position, absolute);
                inset-block-start: 50%;
                inset-inline-start: 50%;
                transform: translate(-50%, -50%);
            }
            :host(:not([breakout])) {
                overflow: auto;
                max-inline-size: calc(100% - (var(--imposter-margin, 0) * 2));
                max-block-size: calc(100% - (var(--imposter-margin, 0) * 2));
            }
        `;
    }

    render(): void {
        this.shadow.innerHTML = `<slot></slot>`;
        this.updateStyles();
    }

    protected override update(): void { this.updateStyles(); }

    private updateStyles(): void {
        this.style.setProperty('--imposter-position', this.fixed ? 'fixed' : 'absolute');
        this.style.setProperty('--imposter-margin', this.margin);
    }

    get breakout() { return this.hasAttribute('breakout'); }
    set breakout(value: boolean) { value ? this.setAttribute('breakout', '') : this.removeAttribute('breakout'); }

    get margin() { return this.getAttribute('margin') || '0'; }
    set margin(value: string) { this.setAttribute('margin', value); }

    get fixed() { return this.hasAttribute('fixed'); }
    set fixed(value: boolean) { value ? this.setAttribute('fixed', '') : this.removeAttribute('fixed'); }

    static get observedAttributes() { return ['breakout', 'margin', 'fixed']; }
}

if ('customElements' in window && !customElements.get('imposter-pk')) {
    customElements.define('imposter-pk', Imposter);
}

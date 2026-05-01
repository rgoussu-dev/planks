import LayoutElementPk from '../element/layout-element';

export default class Imposter extends LayoutElementPk {
    protected structuralCss(): string {
        return `
            imposter-pk {
                position: var(--imposter-position, absolute);
                inset-block-start: 50%;
                inset-inline-start: 50%;
                transform: translate(-50%, -50%);
            }
            imposter-pk:not([breakout]) {
                overflow: auto;
                max-inline-size: calc(100% - (var(--imposter-margin, 0) * 2));
                max-block-size: calc(100% - (var(--imposter-margin, 0) * 2));
            }
        `;
    }

    protected override applyInstanceStyles(): void {
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

declare global {
    interface HTMLElementTagNameMap {
        'imposter-pk': Imposter;
    }
}

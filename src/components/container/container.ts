import LayoutElementPk from '../element/layout-element';

export default class Container extends LayoutElementPk {
    protected structuralCss(): string {
        return `
            container-pk {
                display: block;
                container-type: inline-size;
            }
        `;
    }

    protected override applyInstanceStyles(): void {
        if (this.name) this.style.setProperty('container-name', this.name);
        else this.style.removeProperty('container-name');
    }

    get name() { return this.getAttribute('name'); }
    set name(val: string | null) { val ? this.setAttribute('name', val) : this.removeAttribute('name'); }

    static get observedAttributes() { return ['name']; }
}

if ('customElements' in window && !customElements.get('container-pk')) {
    customElements.define('container-pk', Container);
}

declare global {
    interface HTMLElementTagNameMap {
        'container-pk': Container;
    }
}

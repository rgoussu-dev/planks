import { LayoutShadowElementPk } from '../element/shadow-element';

export default class Container extends LayoutShadowElementPk {
    constructor() {
        super('container-pk');
    }

    styles(): string {
        return `
            :host {
                display: block;
                container-type: inline-size;
                container-name: var(--container-name, none);
            }
            .wrapper { display: contents; }
        `;
    }

    render(): void {
        this.shadow.innerHTML = `<div class="wrapper" part="wrapper"><slot></slot></div>`;
        this.updateStyles();
    }

    protected override update(): void { this.updateStyles(); }

    private updateStyles(): void {
        this.style.setProperty('--container-name', this.name || 'none');
    }

    get name() { return this.getAttribute('name'); }
    set name(val: string | null) { val ? this.setAttribute('name', val) : this.removeAttribute('name'); }

    static get observedAttributes() { return ['name']; }
}

if ('customElements' in window && !customElements.get('container-pk')) {
    customElements.define('container-pk', Container);
}

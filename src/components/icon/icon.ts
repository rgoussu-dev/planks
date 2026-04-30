import { LayoutShadowElementPk } from '../element/shadow-element';

export default class Icon extends LayoutShadowElementPk {
    constructor() {
        super('icon-pk');
    }

    styles(): string {
        return `
            :host { display: inline-flex; align-items: baseline; }
            ::slotted(svg) {
                width: 0.75em;
                width: 1cap;
                height: 0.75em;
                height: 1cap;
                margin-inline-end: var(--icon-space, 0);
            }
        `;
    }

    render(): void {
        this.shadow.innerHTML = `<slot></slot>`;
        this.updateStyles();
        this.updateAccessibility();
    }

    protected override update(): void {
        this.updateStyles();
        this.updateAccessibility();
    }

    private updateStyles(): void {
        this.style.setProperty('--icon-space', this.space || '0');
    }

    private updateAccessibility(): void {
        if (this.label) {
            this.setAttribute('role', 'img');
            this.setAttribute('aria-label', this.label);
        } else {
            this.removeAttribute('role');
            this.removeAttribute('aria-label');
        }
    }

    get space() { return this.getAttribute('space'); }
    set space(val: string | null) { val ? this.setAttribute('space', val) : this.removeAttribute('space'); }

    get label() { return this.getAttribute('label'); }
    set label(val: string | null) { val ? this.setAttribute('label', val) : this.removeAttribute('label'); }

    static get observedAttributes() { return ['space', 'label']; }
}

if ('customElements' in window && !customElements.get('icon-pk')) {
    customElements.define('icon-pk', Icon);
}

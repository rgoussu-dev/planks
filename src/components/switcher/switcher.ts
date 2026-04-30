import { LayoutShadowElementPk } from '../element/shadow-element';

export default class Switcher extends LayoutShadowElementPk {
    constructor() {
        super('switcher-pk');
    }

    styles(): string {
        return `
            :host {
                display: flex;
                flex-wrap: wrap;
                gap: var(--switcher-space, var(--s1));
            }
            ::slotted(*) {
                flex-basis: calc((var(--switcher-threshold, var(--measure)) - 100%) * 999);
            }
            ::slotted(:nth-last-child(n + var(--switcher-limit-plus-one))),
            ::slotted(:nth-last-child(n + var(--switcher-limit-plus-one)) ~ *) {
                flex-basis: 100%;
            }
        `;
    }

    render(): void {
        this.shadow.innerHTML = `<slot></slot>`;
        this.updateStyles();
    }

    protected override update(): void { this.updateStyles(); }

    private updateStyles(): void {
        this.style.setProperty('--switcher-threshold', this.threshold);
        this.style.setProperty('--switcher-space', this.space);
        this.style.setProperty('--switcher-limit-plus-one', ((this.limit || 4) + 1).toString());
    }

    get threshold() { return this.getAttribute('threshold') || 'var(--measure)'; }
    set threshold(value: string) { this.setAttribute('threshold', value); }

    get space() { return this.getAttribute('space') || 'var(--s1)'; }
    set space(value: string) { this.setAttribute('space', value); }

    get limit(): number | undefined {
        return this.hasAttribute('limit') ? parseInt(this.getAttribute('limit') || '0') : undefined;
    }
    set limit(value: number) { this.setAttribute('limit', value.toString()); }

    static get observedAttributes() { return ['threshold', 'space', 'limit']; }
}

if ('customElements' in window && !customElements.get('switcher-pk')) {
    customElements.define('switcher-pk', Switcher);
}

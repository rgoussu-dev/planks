import { LayoutShadowElementPk } from '../element/shadow-element';

export default class Cover extends LayoutShadowElementPk {
    constructor() {
        super('cover-pk');
    }

    styles(): string {
        return `
            :host {
                display: flex;
                flex-direction: column;
                min-block-size: var(--cover-min-height, 100vh);
                padding: var(--cover-padding, var(--s1));
            }
            :host([noPad]) { padding: 0; }
            ::slotted(*) { margin-block: var(--cover-space, var(--s0)); }
            ::slotted(:first-child:not([slot="centered"])) { margin-block-start: 0; }
            ::slotted(:last-child:not([slot="centered"])) { margin-block-end: 0; }
            slot[name="centered"] { margin-block: auto; }
        `;
    }

    render(): void {
        const centered = this.centered || 'centered';
        this.shadow.innerHTML = `<slot></slot><slot name="${centered}"></slot>`;
        this.updateStyles();
    }

    protected override update(): void { this.updateStyles(); }

    private updateStyles(): void {
        this.style.setProperty('--cover-min-height', this.minHeight || '100vh');
        this.style.setProperty('--cover-space', this.space || 'var(--s0)');
        this.style.setProperty('--cover-padding', this.space || 'var(--s1)');
    }

    get centered() { return this.getAttribute('centered') || undefined; }
    set centered(value: string | undefined) {
        value === undefined ? this.removeAttribute('centered') : this.setAttribute('centered', value);
    }

    get space() { return this.getAttribute('space') || undefined; }
    set space(value: string | undefined) {
        value === undefined ? this.removeAttribute('space') : this.setAttribute('space', value);
    }

    get minHeight() { return this.getAttribute('minHeight') || undefined; }
    set minHeight(value: string | undefined) {
        value === undefined ? this.removeAttribute('minHeight') : this.setAttribute('minHeight', value);
    }

    get noPad() { return this.hasAttribute('noPad'); }
    set noPad(value: boolean) { value ? this.setAttribute('noPad', '') : this.removeAttribute('noPad'); }

    static get observedAttributes() { return ['centered', 'space', 'minHeight', 'noPad']; }
}

if ('customElements' in window && !customElements.get('cover-pk')) {
    customElements.define('cover-pk', Cover);
}

import LayoutElementPk from '../element/layout-element';

export default class Cover extends LayoutElementPk {
    protected structuralCss(): string {
        return `
            cover-pk {
                display: flex;
                flex-direction: column;
                min-block-size: var(--cover-min-height, 100vh);
                padding: var(--cover-padding, var(--s1));
            }
            cover-pk[noPad] { padding: 0; }
            cover-pk > * { margin-block: var(--cover-space, var(--s0)); }
            cover-pk > [data-pk-centered],
            cover-pk > [slot="centered"] { margin-block: auto; }
            cover-pk > :first-child:not([data-pk-centered]):not([slot="centered"]) { margin-block-start: 0; }
            cover-pk > :last-child:not([data-pk-centered]):not([slot="centered"]) { margin-block-end: 0; }
        `;
    }

    protected override applyInstanceStyles(): void {
        this.style.setProperty('--cover-min-height', this.minHeight || '100vh');
        this.style.setProperty('--cover-space', this.space || 'var(--s0)');
        this.style.setProperty('--cover-padding', this.space || 'var(--s1)');
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

    static get observedAttributes() { return ['space', 'minHeight', 'noPad']; }
}

if ('customElements' in window && !customElements.get('cover-pk')) {
    customElements.define('cover-pk', Cover);
}

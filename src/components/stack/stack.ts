import LayoutElementPk from '../element/layout-element';

export default class Stack extends LayoutElementPk {
    protected structuralCss(): string {
        return `
            stack-pk { display: block; }
            stack-pk > * + * { margin-block-start: var(--stack-space, var(--s1)); }
            stack-pk[recursive] * + * { margin-block-start: var(--stack-space, var(--s1)); }
            stack-pk[splitAfter]:only-child { block-size: 100%; }
        `;
    }

    protected override applyInstanceStyles(): void {
        this.style.setProperty('--stack-space', this.space);
        if (this.splitAfter) {
            this.dataset.pkSplit = this.splitAfter;
            const n = this.splitAfter;
            LayoutElementPk.ensureDynamicStyle(`stack-split-${n}`, () =>
                `stack-pk[data-pk-split="${n}"] > :nth-child(${n}) { margin-block-end: auto; }`
            );
        } else {
            delete this.dataset.pkSplit;
        }
    }

    get space() { return this.getAttribute('space') || 'var(--s1)'; }
    set space(value: string) { this.setAttribute('space', value); }

    get recursive() { return this.hasAttribute('recursive'); }
    set recursive(value: boolean) { value ? this.setAttribute('recursive', '') : this.removeAttribute('recursive'); }

    get splitAfter() { return this.getAttribute('splitAfter') || ''; }
    set splitAfter(value: string) { this.setAttribute('splitAfter', value); }

    static get observedAttributes() { return ['space', 'recursive', 'splitAfter']; }
}

if ('customElements' in window && !customElements.get('stack-pk')) {
    customElements.define('stack-pk', Stack);
}

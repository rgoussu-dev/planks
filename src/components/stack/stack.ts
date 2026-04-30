import { LayoutShadowElementPk } from '../element/shadow-element';

export default class Stack extends LayoutShadowElementPk {
    constructor() {
        super('stack-pk');
    }

    styles(): string {
        return `
            :host { display: block; }
            :host([splitAfter]:only-child) { block-size: 100%; }
            ::slotted(* + *) { margin-block-start: var(--stack-space, var(--s1)); }
            :host([recursive]) ::slotted(* *) { margin-block-start: var(--stack-space, var(--s1)); }
        `;
    }

    render(): void {
        this.shadow.innerHTML = `<slot></slot>`;
        this.updateStyles();
        this.updateSplitAfter();
    }

    protected override update(): void {
        this.updateStyles();
        this.updateSplitAfter();
    }

    private updateStyles(): void {
        this.style.setProperty('--stack-space', this.space);
    }

    private updateSplitAfter(): void {
        if (this.splitAfter) {
            const styleId = `stack-split-${this.splitAfter}`;
            if (!this.shadow.querySelector(`#${styleId}`)) {
                const style = document.createElement('style');
                style.id = styleId;
                style.textContent = `::slotted(*:nth-child(${this.splitAfter})) { margin-block-end: auto !important; }`;
                this.shadow.appendChild(style);
            }
        } else {
            this.shadow.querySelectorAll('[id^="stack-split-"]').forEach(s => s.remove());
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

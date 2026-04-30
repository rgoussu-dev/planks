import { LayoutShadowElementPk } from '../element/shadow-element';

export default class Reel extends LayoutShadowElementPk {
    private resizeObserver?: ResizeObserver;
    private mutationObserver?: MutationObserver;

    constructor() {
        super('reel-pk');
    }

    styles(): string {
        return `
            :host {
                display: flex;
                block-size: var(--reel-height, auto);
                overflow-x: auto;
                overflow-y: hidden;
            }
            :host(:not([noBar])) { scrollbar-color: #fff #000; }
            :host(:not([noBar]))::-webkit-scrollbar { block-size: 1rem; }
            :host(:not([noBar]))::-webkit-scrollbar-track { background-color: #000; }
            :host(:not([noBar]))::-webkit-scrollbar-thumb {
                background-color: #000;
                background-image: linear-gradient(#000 0, #000 0.25rem, #fff 0.25rem, #fff 0.75rem, #000 0.75rem);
            }
            :host([noBar])::-webkit-scrollbar { display: none; }
            :host([noBar]) { -ms-overflow-style: none; scrollbar-width: none; }
            ::slotted(*) { flex: 0 0 var(--reel-item-width, auto); }
            ::slotted(img) { block-size: 100%; flex-basis: auto; width: auto; }
            ::slotted(* + *) { margin-inline-start: var(--reel-space, var(--s0)); }
            :host(.overflowing:not([noBar])) { padding-block-end: 1rem; }
        `;
    }

    render(): void {
        this.shadow.innerHTML = `<slot></slot>`;
        this.updateStyles();
        this.toggleOverflowClass();
    }

    protected override update(): void { this.updateStyles(); }

    private updateStyles(): void {
        this.style.setProperty('--reel-item-width', this.itemWidth);
        this.style.setProperty('--reel-space', this.space);
        this.style.setProperty('--reel-height', this.height);
    }

    private toggleOverflowClass(): void {
        this.classList.toggle('overflowing', this.scrollWidth > this.clientWidth);
    }

    get itemWidth() { return this.getAttribute('itemWidth') || 'auto'; }
    set itemWidth(value: string) { this.setAttribute('itemWidth', value); }

    get space() { return this.getAttribute('space') || 'var(--s0)'; }
    set space(value: string) { this.setAttribute('space', value); }

    get height() { return this.getAttribute('height') || 'auto'; }
    set height(value: string) { this.setAttribute('height', value); }

    get noBar() { return this.hasAttribute('noBar'); }
    set noBar(value: boolean) { value ? this.setAttribute('noBar', '') : this.removeAttribute('noBar'); }

    override connectedCallback(): void {
        super.connectedCallback();
        if ('ResizeObserver' in window) {
            this.resizeObserver = new ResizeObserver(() => this.toggleOverflowClass());
            this.resizeObserver.observe(this);
        }
        if ('MutationObserver' in window) {
            this.mutationObserver = new MutationObserver(() => this.toggleOverflowClass());
            this.mutationObserver.observe(this, { childList: true });
        }
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        this.resizeObserver?.disconnect();
        this.mutationObserver?.disconnect();
    }

    static get observedAttributes() { return ['itemWidth', 'space', 'height', 'noBar']; }
}

if ('customElements' in window && !customElements.get('reel-pk')) {
    customElements.define('reel-pk', Reel);
}

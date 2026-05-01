import LayoutElementPk from '../element/layout-element';

export default class Grid extends LayoutElementPk {
    protected structuralCss(): string {
        return `
            grid-pk {
                display: grid;
                grid-gap: var(--grid-space, var(--s1));
                align-items: var(--grid-align, stretch);
                justify-content: var(--grid-justify, stretch);
            }
            @supports (width: min(var(--grid-min, 250px), 100%)) {
                grid-pk {
                    grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min, 250px), 100%), 1fr));
                }
            }
        `;
    }

    protected override applyInstanceStyles(): void {
        this.style.setProperty('--grid-min', this.min);
        this.style.setProperty('--grid-space', this.space);
        this.style.setProperty('--grid-align', this.align || 'stretch');
        this.style.setProperty('--grid-justify', this.justify || 'stretch');
    }

    get min() { return this.getAttribute('min') || '250px'; }
    set min(value: string) { this.setAttribute('min', value); }

    get space() { return this.getAttribute('space') || 'var(--s1)'; }
    set space(value: string) { this.setAttribute('space', value); }

    get align() { return this.getAttribute('align') || ''; }
    set align(value: string) { this.setAttribute('align', value); }

    get justify() { return this.getAttribute('justify') || ''; }
    set justify(value: string) { this.setAttribute('justify', value); }

    static get observedAttributes() { return ['min', 'space', 'align', 'justify']; }
}

if ('customElements' in window && !customElements.get('grid-pk')) {
    customElements.define('grid-pk', Grid);
}

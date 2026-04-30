import { LayoutShadowElementPk } from '../element/shadow-element';

export default class Sidebar extends LayoutShadowElementPk {
    constructor() {
        super('sidebar-pk');
    }

    styles(): string {
        return `
            :host {
                display: flex;
                flex-wrap: wrap;
                gap: var(--sidebar-space, var(--s1));
                align-items: var(--sidebar-align, stretch);
            }
            ::slotted(:first-child) {
                flex-grow: var(--sidebar-first-grow, 1);
                flex-basis: var(--sidebar-first-basis, 0);
                min-inline-size: var(--sidebar-first-min, auto);
            }
            ::slotted(:last-child) {
                flex-grow: var(--sidebar-last-grow, 999);
                flex-basis: var(--sidebar-last-basis, 0);
                min-inline-size: var(--sidebar-last-min, 50%);
            }
        `;
    }

    render(): void {
        this.shadow.innerHTML = `<slot></slot>`;
        this.updateStyles();
    }

    protected override update(): void { this.updateStyles(); }

    private updateStyles(): void {
        this.style.setProperty('--sidebar-space', this.space);
        this.style.setProperty('--sidebar-align', this.noStretch ? 'flex-start' : 'stretch');

        if (this.side === 'left') {
            this.style.setProperty('--sidebar-first-grow', '1');
            this.style.setProperty('--sidebar-first-basis', this.sideWidth || '0');
            this.style.setProperty('--sidebar-first-min', 'auto');
            this.style.setProperty('--sidebar-last-grow', '999');
            this.style.setProperty('--sidebar-last-basis', '0');
            this.style.setProperty('--sidebar-last-min', this.contentWidth || '50%');
        } else {
            this.style.setProperty('--sidebar-first-grow', '999');
            this.style.setProperty('--sidebar-first-basis', '0');
            this.style.setProperty('--sidebar-first-min', this.contentWidth || '50%');
            this.style.setProperty('--sidebar-last-grow', '1');
            this.style.setProperty('--sidebar-last-basis', this.sideWidth || '0');
            this.style.setProperty('--sidebar-last-min', 'auto');
        }
    }

    get side() { return (this.getAttribute('side') as 'left' | 'right') || 'left'; }
    set side(value: 'left' | 'right') { this.setAttribute('side', value); }

    get sideWidth() { return this.getAttribute('sideWidth') || '250px'; }
    set sideWidth(value: string) { this.setAttribute('sideWidth', value); }

    get contentWidth() { return this.getAttribute('contentWidth') || ''; }
    set contentWidth(value: string) { this.setAttribute('contentWidth', value); }

    get space() { return this.getAttribute('space') || 'var(--s2)'; }
    set space(value: string) { this.setAttribute('space', value); }

    get noStretch() { return this.hasAttribute('noStretch'); }
    set noStretch(value: boolean) { value ? this.setAttribute('noStretch', '') : this.removeAttribute('noStretch'); }

    static get observedAttributes() { return ['side', 'sideWidth', 'contentWidth', 'space', 'noStretch']; }
}

if ('customElements' in window && !customElements.get('sidebar-pk')) {
    customElements.define('sidebar-pk', Sidebar);
}

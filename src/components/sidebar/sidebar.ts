import LayoutElementPk from '../element/layout-element';

export default class Sidebar extends LayoutElementPk {
    protected structuralCss(): string {
        return `
            sidebar-pk {
                display: flex;
                flex-wrap: wrap;
                gap: var(--sidebar-space, var(--s2));
                align-items: stretch;
            }
            sidebar-pk[noStretch] { align-items: flex-start; }

            sidebar-pk:not([side="right"]) > :first-child {
                flex-grow: 1;
                flex-basis: var(--sidebar-side-basis, 0);
                min-inline-size: auto;
            }
            sidebar-pk:not([side="right"]) > :last-child {
                flex-grow: 999;
                flex-basis: 0;
                min-inline-size: var(--sidebar-content-min, 50%);
            }

            sidebar-pk[side="right"] > :first-child {
                flex-grow: 999;
                flex-basis: 0;
                min-inline-size: var(--sidebar-content-min, 50%);
            }
            sidebar-pk[side="right"] > :last-child {
                flex-grow: 1;
                flex-basis: var(--sidebar-side-basis, 0);
                min-inline-size: auto;
            }
        `;
    }

    protected override applyInstanceStyles(): void {
        this.style.setProperty('--sidebar-space', this.space);
        this.style.setProperty('--sidebar-side-basis', this.sideWidth || '0');
        if (this.contentWidth) this.style.setProperty('--sidebar-content-min', this.contentWidth);
        else this.style.removeProperty('--sidebar-content-min');
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

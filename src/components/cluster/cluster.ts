import LayoutElementPk from '../element/layout-element';

export default class Cluster extends LayoutElementPk {
    protected structuralCss(): string {
        return `
            cluster-pk {
                display: flex;
                flex-wrap: wrap;
                gap: var(--cluster-gap, var(--s1));
                justify-content: var(--cluster-justify, flex-start);
                align-items: var(--cluster-align, flex-start);
            }
        `;
    }

    protected override applyInstanceStyles(): void {
        this.style.setProperty('--cluster-gap', this.space);
        this.style.setProperty('--cluster-justify', this.justify);
        this.style.setProperty('--cluster-align', this.align);
    }

    get space() { return this.getAttribute('space') || 'var(--s1)'; }
    set space(val: string) { this.setAttribute('space', val); }

    get justify() { return this.getAttribute('justify') || 'flex-start'; }
    set justify(val: string) { this.setAttribute('justify', val); }

    get align() { return this.getAttribute('align') || 'flex-start'; }
    set align(val: string) { this.setAttribute('align', val); }

    static get observedAttributes() { return ['space', 'justify', 'align']; }
}

if ('customElements' in window && !customElements.get('cluster-pk')) {
    customElements.define('cluster-pk', Cluster);
}

declare global {
    interface HTMLElementTagNameMap {
        'cluster-pk': Cluster;
    }
}

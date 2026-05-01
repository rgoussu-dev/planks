import LayoutElementPk from '../element/layout-element';

export default class Switcher extends LayoutElementPk {
    protected structuralCss(): string {
        return `
            switcher-pk {
                display: flex;
                flex-wrap: wrap;
                gap: var(--switcher-space, var(--s1));
            }
            switcher-pk > * {
                flex-grow: 1;
                flex-basis: calc((var(--switcher-threshold, var(--measure)) - 100%) * 999);
            }
        `;
    }

    protected override applyInstanceStyles(): void {
        this.style.setProperty('--switcher-threshold', this.threshold);
        this.style.setProperty('--switcher-space', this.space);
        if (this.limit !== undefined) {
            const n = this.limit;
            this.dataset.pkLimit = n.toString();
            LayoutElementPk.ensureDynamicStyle(`switcher-limit-${n}`, () =>
                `switcher-pk[data-pk-limit="${n}"] > :nth-last-child(n + ${n + 1}),
                 switcher-pk[data-pk-limit="${n}"] > :nth-last-child(n + ${n + 1}) ~ * {
                    flex-basis: 100%;
                 }`
            );
        } else {
            delete this.dataset.pkLimit;
        }
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

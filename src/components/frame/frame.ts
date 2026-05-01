import LayoutElementPk from '../element/layout-element';

export default class Frame extends LayoutElementPk {
    protected structuralCss(): string {
        return `
            frame-pk {
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                aspect-ratio: var(--frame-n) / var(--frame-d);
            }
            frame-pk > img,
            frame-pk > video {
                inline-size: 100%;
                block-size: 100%;
                object-fit: cover;
            }
        `;
    }

    protected override applyInstanceStyles(): void {
        const [n, d] = this.parseRatio(this.ratio);
        this.style.setProperty('--frame-n', n.toString());
        this.style.setProperty('--frame-d', d.toString());
    }

    private parseRatio(ratio: string): [number, number] {
        const parts = ratio.split(':');
        if (parts.length === 2 && parts[0] && parts[1]) {
            const n = parseInt(parts[0], 10);
            const d = parseInt(parts[1], 10);
            if (!isNaN(n) && !isNaN(d) && d !== 0) return [n, d];
        }
        return [16, 9];
    }

    get ratio() { return this.getAttribute('ratio') || '16:9'; }
    set ratio(val: string) { this.setAttribute('ratio', val); }

    static get observedAttributes() { return ['ratio']; }
}

if ('customElements' in window && !customElements.get('frame-pk')) {
    customElements.define('frame-pk', Frame);
}

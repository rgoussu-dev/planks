import { describe, it, expect } from 'vitest';
import './cluster';

const make = () => {
    const el = document.createElement('cluster-pk');
    document.body.appendChild(el);
    return el;
};

describe('cluster-pk', () => {
    it('registers the custom element', () => {
        expect(customElements.get('cluster-pk')).toBeDefined();
    });

    it('exposes default getters', () => {
        const el = make();
        expect(el.space).toBe('var(--s1)');
        expect(el.justify).toBe('flex-start');
        expect(el.align).toBe('flex-start');
        el.remove();
    });

    it('writes css variables from attributes', () => {
        const el = make();
        el.space = '1rem';
        el.justify = 'center';
        el.align = 'baseline';
        expect(el.style.getPropertyValue('--cluster-gap')).toBe('1rem');
        expect(el.style.getPropertyValue('--cluster-justify')).toBe('center');
        expect(el.style.getPropertyValue('--cluster-align')).toBe('baseline');
        el.remove();
    });

    it('writes default css variables on connect', () => {
        const el = make();
        expect(el.style.getPropertyValue('--cluster-gap')).toBe('var(--s1)');
        expect(el.style.getPropertyValue('--cluster-justify')).toBe('flex-start');
        expect(el.style.getPropertyValue('--cluster-align')).toBe('flex-start');
        el.remove();
    });
});

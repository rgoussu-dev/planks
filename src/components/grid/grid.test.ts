import { describe, it, expect } from 'vitest';
import './grid';

const make = () => {
    const el = document.createElement('grid-pk');
    document.body.appendChild(el);
    return el;
};

describe('grid-pk', () => {
    it('registers the custom element', () => {
        expect(customElements.get('grid-pk')).toBeDefined();
    });

    it('exposes default getters', () => {
        const el = make();
        expect(el.min).toBe('250px');
        expect(el.space).toBe('var(--s1)');
        expect(el.align).toBe('');
        expect(el.justify).toBe('');
        el.remove();
    });

    it('writes default css variables on connect', () => {
        const el = make();
        expect(el.style.getPropertyValue('--grid-min')).toBe('250px');
        expect(el.style.getPropertyValue('--grid-space')).toBe('var(--s1)');
        expect(el.style.getPropertyValue('--grid-align')).toBe('stretch');
        expect(el.style.getPropertyValue('--grid-justify')).toBe('stretch');
        el.remove();
    });

    it('writes css variables from attributes', () => {
        const el = make();
        el.min = '300px';
        el.space = '2rem';
        el.align = 'center';
        el.justify = 'center';
        expect(el.style.getPropertyValue('--grid-min')).toBe('300px');
        expect(el.style.getPropertyValue('--grid-space')).toBe('2rem');
        expect(el.style.getPropertyValue('--grid-align')).toBe('center');
        expect(el.style.getPropertyValue('--grid-justify')).toBe('center');
        el.remove();
    });
});

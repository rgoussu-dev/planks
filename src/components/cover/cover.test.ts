import { describe, it, expect } from 'vitest';
import './cover';

const make = () => {
    const el = document.createElement('cover-pk');
    document.body.appendChild(el);
    return el;
};

describe('cover-pk', () => {
    it('registers the custom element', () => {
        expect(customElements.get('cover-pk')).toBeDefined();
    });

    it('writes default css variables when no attributes are set', () => {
        const el = make();
        expect(el.style.getPropertyValue('--cover-min-height')).toBe('100vh');
        expect(el.style.getPropertyValue('--cover-space')).toBe('var(--s0)');
        expect(el.style.getPropertyValue('--cover-padding')).toBe('var(--s1)');
        el.remove();
    });

    it('writes css variables from attributes', () => {
        const el = make();
        el.minHeight = '50vh';
        el.space = '2rem';
        expect(el.style.getPropertyValue('--cover-min-height')).toBe('50vh');
        expect(el.style.getPropertyValue('--cover-space')).toBe('2rem');
        expect(el.style.getPropertyValue('--cover-padding')).toBe('2rem');
        el.remove();
    });

    it('toggles the noPad boolean attribute', () => {
        const el = make();
        el.noPad = true;
        expect(el.hasAttribute('noPad')).toBe(true);
        el.noPad = false;
        expect(el.hasAttribute('noPad')).toBe(false);
        el.remove();
    });

    it('removes attributes when set to undefined', () => {
        const el = make();
        el.minHeight = '50vh';
        el.space = '1rem';
        el.minHeight = undefined;
        el.space = undefined;
        expect(el.hasAttribute('minHeight')).toBe(false);
        expect(el.hasAttribute('space')).toBe(false);
        el.remove();
    });
});

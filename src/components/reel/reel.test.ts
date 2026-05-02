import { describe, it, expect } from 'vitest';
import './reel';

const make = () => {
    const el = document.createElement('reel-pk');
    document.body.appendChild(el);
    return el;
};

describe('reel-pk', () => {
    it('registers the custom element', () => {
        expect(customElements.get('reel-pk')).toBeDefined();
    });

    it('exposes default getters', () => {
        const el = make();
        expect(el.itemWidth).toBe('auto');
        expect(el.space).toBe('var(--s0)');
        expect(el.height).toBe('auto');
        expect(el.noBar).toBe(false);
        el.remove();
    });

    it('writes default css variables on connect', () => {
        const el = make();
        expect(el.style.getPropertyValue('--reel-item-width')).toBe('auto');
        expect(el.style.getPropertyValue('--reel-space')).toBe('var(--s0)');
        expect(el.style.getPropertyValue('--reel-height')).toBe('auto');
        el.remove();
    });

    it('writes css variables from attributes', () => {
        const el = make();
        el.itemWidth = '200px';
        el.space = '1rem';
        el.height = '300px';
        expect(el.style.getPropertyValue('--reel-item-width')).toBe('200px');
        expect(el.style.getPropertyValue('--reel-space')).toBe('1rem');
        expect(el.style.getPropertyValue('--reel-height')).toBe('300px');
        el.remove();
    });

    it('toggles the noBar boolean attribute', () => {
        const el = make();
        el.noBar = true;
        expect(el.hasAttribute('noBar')).toBe(true);
        el.noBar = false;
        expect(el.hasAttribute('noBar')).toBe(false);
        el.remove();
    });

    it('does not throw when disconnected (cleans observers)', () => {
        const el = make();
        expect(() => el.remove()).not.toThrow();
    });
});

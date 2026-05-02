import { describe, it, expect } from 'vitest';
import './switcher';

const make = () => {
    const el = document.createElement('switcher-pk');
    document.body.appendChild(el);
    return el;
};

describe('switcher-pk', () => {
    it('registers the custom element', () => {
        expect(customElements.get('switcher-pk')).toBeDefined();
    });

    it('exposes defaults', () => {
        const el = make();
        expect(el.threshold).toBe('var(--measure)');
        expect(el.space).toBe('var(--s1)');
        expect(el.limit).toBeUndefined();
        el.remove();
    });

    it('writes default css variables on connect', () => {
        const el = make();
        expect(el.style.getPropertyValue('--switcher-threshold')).toBe('var(--measure)');
        expect(el.style.getPropertyValue('--switcher-space')).toBe('var(--s1)');
        el.remove();
    });

    it('writes css variables from attributes', () => {
        const el = make();
        el.threshold = '40rem';
        el.space = '2rem';
        expect(el.style.getPropertyValue('--switcher-threshold')).toBe('40rem');
        expect(el.style.getPropertyValue('--switcher-space')).toBe('2rem');
        el.remove();
    });

    it('writes data-pk-limit and injects a dynamic style for limit', () => {
        const el = make();
        el.limit = 4;
        expect(el.dataset.pkLimit).toBe('4');
        expect(el.limit).toBe(4);
        const style = document.head.querySelector('style[data-pk-dyn="switcher-limit-4"]');
        expect(style).not.toBeNull();
        expect(style?.textContent).toContain('nth-last-child(n + 5)');
        el.remove();
    });

    it('clears data-pk-limit when the limit attribute is removed', () => {
        const el = make();
        el.limit = 2;
        el.removeAttribute('limit');
        expect(el.dataset.pkLimit).toBeUndefined();
        el.remove();
    });
});

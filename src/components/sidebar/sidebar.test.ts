import { describe, it, expect } from 'vitest';
import './sidebar';

const make = () => {
    const el = document.createElement('sidebar-pk');
    document.body.appendChild(el);
    return el;
};

describe('sidebar-pk', () => {
    it('registers the custom element', () => {
        expect(customElements.get('sidebar-pk')).toBeDefined();
    });

    it('exposes defaults', () => {
        const el = make();
        expect(el.side).toBe('left');
        expect(el.sideWidth).toBe('250px');
        expect(el.contentWidth).toBe('');
        expect(el.space).toBe('var(--s2)');
        expect(el.noStretch).toBe(false);
        el.remove();
    });

    it('writes default css variables and skips content-min when unset', () => {
        const el = make();
        expect(el.style.getPropertyValue('--sidebar-space')).toBe('var(--s2)');
        expect(el.style.getPropertyValue('--sidebar-side-basis')).toBe('250px');
        expect(el.style.getPropertyValue('--sidebar-content-min')).toBe('');
        el.remove();
    });

    it('writes css variables from attributes', () => {
        const el = make();
        el.space = '1rem';
        el.sideWidth = '300px';
        el.contentWidth = '60%';
        expect(el.style.getPropertyValue('--sidebar-space')).toBe('1rem');
        expect(el.style.getPropertyValue('--sidebar-side-basis')).toBe('300px');
        expect(el.style.getPropertyValue('--sidebar-content-min')).toBe('60%');
        el.remove();
    });

    it('removes content-min when contentWidth is cleared', () => {
        const el = make();
        el.contentWidth = '60%';
        el.contentWidth = '';
        expect(el.style.getPropertyValue('--sidebar-content-min')).toBe('');
        el.remove();
    });

    it('writes side and noStretch attributes', () => {
        const el = make();
        el.side = 'right';
        el.noStretch = true;
        expect(el.getAttribute('side')).toBe('right');
        expect(el.hasAttribute('noStretch')).toBe(true);
        el.noStretch = false;
        expect(el.hasAttribute('noStretch')).toBe(false);
        el.remove();
    });
});

import { describe, it, expect } from 'vitest';
import './icon';

const make = () => {
    const el = document.createElement('icon-pk');
    document.body.appendChild(el);
    return el;
};

describe('icon-pk', () => {
    it('registers the custom element', () => {
        expect(customElements.get('icon-pk')).toBeDefined();
    });

    it('writes default --icon-space of 0', () => {
        const el = make();
        expect(el.space).toBeNull();
        expect(el.style.getPropertyValue('--icon-space')).toBe('0');
        el.remove();
    });

    it('writes --icon-space from the space attribute', () => {
        const el = make();
        el.space = '0.5rem';
        expect(el.style.getPropertyValue('--icon-space')).toBe('0.5rem');
        el.remove();
    });

    it('removes space attribute when set to null', () => {
        const el = make();
        el.space = '0.5rem';
        el.space = null;
        expect(el.hasAttribute('space')).toBe(false);
        el.remove();
    });

    it('adds aria role and label when label is set', () => {
        const el = make();
        el.label = 'close';
        expect(el.getAttribute('role')).toBe('img');
        expect(el.getAttribute('aria-label')).toBe('close');
        el.remove();
    });

    it('removes aria role and label when label is cleared', () => {
        const el = make();
        el.label = 'close';
        el.label = null;
        expect(el.hasAttribute('role')).toBe(false);
        expect(el.hasAttribute('aria-label')).toBe(false);
        el.remove();
    });
});

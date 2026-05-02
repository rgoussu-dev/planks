import { describe, it, expect } from 'vitest';
import './stack';

const make = () => {
    const el = document.createElement('stack-pk');
    document.body.appendChild(el);
    return el;
};

describe('stack-pk', () => {
    it('registers the custom element', () => {
        expect(customElements.get('stack-pk')).toBeDefined();
    });

    it('exposes defaults', () => {
        const el = make();
        expect(el.space).toBe('var(--s1)');
        expect(el.recursive).toBe(false);
        expect(el.splitAfter).toBe('');
        el.remove();
    });

    it('writes the --stack-space css variable', () => {
        const el = make();
        el.space = '2rem';
        expect(el.style.getPropertyValue('--stack-space')).toBe('2rem');
        el.remove();
    });

    it('toggles the recursive attribute', () => {
        const el = make();
        el.recursive = true;
        expect(el.hasAttribute('recursive')).toBe(true);
        el.recursive = false;
        expect(el.hasAttribute('recursive')).toBe(false);
        el.remove();
    });

    it('writes data-pk-split and injects a dynamic style for splitAfter', () => {
        const el = make();
        el.splitAfter = '3';
        expect(el.dataset.pkSplit).toBe('3');
        const style = document.head.querySelector('style[data-pk-dyn="stack-split-3"]');
        expect(style).not.toBeNull();
        expect(style?.textContent).toContain('nth-child(3)');
        el.remove();
    });

    it('clears data-pk-split when splitAfter is removed', () => {
        const el = make();
        el.splitAfter = '2';
        el.removeAttribute('splitAfter');
        expect(el.dataset.pkSplit).toBeUndefined();
        el.remove();
    });
});

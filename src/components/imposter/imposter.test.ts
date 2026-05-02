import { describe, it, expect } from 'vitest';
import './imposter';

const make = () => {
    const el = document.createElement('imposter-pk');
    document.body.appendChild(el);
    return el;
};

describe('imposter-pk', () => {
    it('registers the custom element', () => {
        expect(customElements.get('imposter-pk')).toBeDefined();
    });

    it('defaults to position absolute and margin 0', () => {
        const el = make();
        expect(el.fixed).toBe(false);
        expect(el.margin).toBe('0');
        expect(el.style.getPropertyValue('--imposter-position')).toBe('absolute');
        expect(el.style.getPropertyValue('--imposter-margin')).toBe('0');
        el.remove();
    });

    it('switches to position fixed when fixed is true', () => {
        const el = make();
        el.fixed = true;
        expect(el.style.getPropertyValue('--imposter-position')).toBe('fixed');
        el.fixed = false;
        expect(el.style.getPropertyValue('--imposter-position')).toBe('absolute');
        el.remove();
    });

    it('writes margin from the margin attribute', () => {
        const el = make();
        el.margin = '1rem';
        expect(el.style.getPropertyValue('--imposter-margin')).toBe('1rem');
        el.remove();
    });

    it('toggles the breakout boolean attribute', () => {
        const el = make();
        el.breakout = true;
        expect(el.hasAttribute('breakout')).toBe(true);
        el.breakout = false;
        expect(el.hasAttribute('breakout')).toBe(false);
        el.remove();
    });
});

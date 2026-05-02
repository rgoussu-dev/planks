import { describe, it, expect } from 'vitest';
import './center';

const make = () => {
    const el = document.createElement('center-pk');
    document.body.appendChild(el);
    return el;
};

describe('center-pk', () => {
    it('registers the custom element', () => {
        expect(customElements.get('center-pk')).toBeDefined();
    });

    it('exposes default getters', () => {
        const el = make();
        expect(el.maxWidth).toBe('var(--measure)');
        expect(el.alignText).toBe(false);
        expect(el.gutters).toBeNull();
        expect(el.intrinsic).toBe(false);
        el.remove();
    });

    it('writes max-width and gutter css variables', () => {
        const el = make();
        el.maxWidth = '60ch';
        el.gutters = '1rem';
        expect(el.style.getPropertyValue('--center-max-width')).toBe('60ch');
        expect(el.style.getPropertyValue('--center-gutter')).toBe('1rem');
        el.remove();
    });

    it('falls back to "0" gutter when none is set', () => {
        const el = make();
        expect(el.style.getPropertyValue('--center-gutter')).toBe('0');
        el.remove();
    });

    it('toggles boolean alignText and intrinsic attributes', () => {
        const el = make();
        el.alignText = true;
        el.intrinsic = true;
        expect(el.hasAttribute('alignText')).toBe(true);
        expect(el.hasAttribute('intrinsic')).toBe(true);

        el.alignText = false;
        el.intrinsic = false;
        expect(el.hasAttribute('alignText')).toBe(false);
        expect(el.hasAttribute('intrinsic')).toBe(false);
        el.remove();
    });

    it('removes the gutters attribute when set to null', () => {
        const el = make();
        el.gutters = '2rem';
        el.gutters = null;
        expect(el.hasAttribute('gutters')).toBe(false);
        el.remove();
    });
});

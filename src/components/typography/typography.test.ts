import { describe, it, expect } from 'vitest';
import './typography';

const make = () => {
    const el = document.createElement('typography-pk');
    document.body.appendChild(el);
    return el;
};

describe('typography-pk', () => {
    it('registers the custom element', () => {
        expect(customElements.get('typography-pk')).toBeDefined();
    });

    it('returns empty defaults for typographic getters', () => {
        const el = make();
        expect(el.fontFamily).toBe('');
        expect(el.fontSize).toBe('');
        expect(el.fontWeight).toBe('');
        expect(el.color).toBe('');
        expect(el.variant).toBe('');
        el.remove();
    });

    it('does not write css variables when attributes are unset', () => {
        const el = make();
        expect(el.style.getPropertyValue('--typo-font-family')).toBe('');
        expect(el.style.getPropertyValue('--typo-color')).toBe('');
        el.remove();
    });

    it('writes css variables when attributes are set', () => {
        const el = make();
        el.fontFamily = 'serif';
        el.fontSize = '1.25rem';
        el.fontWeight = 'bold';
        el.fontStyle = 'italic';
        el.lineHeight = '1.4';
        el.letterSpacing = '0.05em';
        el.textAlign = 'center';
        el.textTransform = 'uppercase';
        el.textDecoration = 'underline';
        el.color = 'red';
        expect(el.style.getPropertyValue('--typo-font-family')).toBe('serif');
        expect(el.style.getPropertyValue('--typo-font-size')).toBe('1.25rem');
        expect(el.style.getPropertyValue('--typo-font-weight')).toBe('bold');
        expect(el.style.getPropertyValue('--typo-font-style')).toBe('italic');
        expect(el.style.getPropertyValue('--typo-line-height')).toBe('1.4');
        expect(el.style.getPropertyValue('--typo-letter-spacing')).toBe('0.05em');
        expect(el.style.getPropertyValue('--typo-text-align')).toBe('center');
        expect(el.style.getPropertyValue('--typo-text-transform')).toBe('uppercase');
        expect(el.style.getPropertyValue('--typo-text-decoration')).toBe('underline');
        expect(el.style.getPropertyValue('--typo-color')).toBe('red');
        el.remove();
    });

    it('removes a css variable when its attribute is cleared', () => {
        const el = make();
        el.color = 'red';
        expect(el.style.getPropertyValue('--typo-color')).toBe('red');
        el.removeAttribute('color');
        expect(el.style.getPropertyValue('--typo-color')).toBe('');
        el.remove();
    });

    it('writes the variant attribute', () => {
        const el = make();
        el.variant = 'heading-1';
        expect(el.getAttribute('variant')).toBe('heading-1');
        el.remove();
    });
});

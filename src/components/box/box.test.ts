import { describe, it, expect } from 'vitest';
import './box';

const make = () => {
    const el = document.createElement('box-pk');
    document.body.appendChild(el);
    return el;
};

describe('box-pk', () => {
    it('registers the custom element', () => {
        expect(customElements.get('box-pk')).toBeDefined();
    });

    it('marks itself as a layout element on connect', () => {
        const el = make();
        expect(el.getAttribute('data-role')).toBe('layout');
        el.remove();
    });

    it('returns default attribute values via getters', () => {
        const el = make();
        expect(el.padding).toBe('var(--s1)');
        expect(el.borderWidth).toBe('none');
        expect(el.borderColor).toBe('#000');
        expect(el.borderRadius).toBe('0');
        expect(el.color).toBe('inherit');
        expect(el.backgroundColor).toBe('transparent');
        expect(el.boxShadow).toBe('');
        el.remove();
    });

    it('writes CSS custom properties from attributes', () => {
        const el = make();
        el.padding = 'var(--s2)';
        el.borderWidth = '2px';
        el.borderColor = 'red';
        el.borderRadius = '4px';
        el.color = 'white';
        el.backgroundColor = 'black';
        expect(el.style.getPropertyValue('--box-padding')).toBe('var(--s2)');
        expect(el.style.getPropertyValue('--box-border-width')).toBe('2px');
        expect(el.style.getPropertyValue('--box-border-color')).toBe('red');
        expect(el.style.getPropertyValue('--box-border-radius')).toBe('4px');
        expect(el.style.getPropertyValue('--box-color')).toBe('white');
        expect(el.style.getPropertyValue('--box-bg-color')).toBe('black');
        el.remove();
    });

    it('maps borderWidth="none" to "0" for the css variable', () => {
        const el = make();
        el.borderWidth = 'none';
        expect(el.style.getPropertyValue('--box-border-width')).toBe('0');
        el.remove();
    });

    it('falls back to "none" for box-shadow when no shadow attribute is set', () => {
        const el = make();
        expect(el.style.getPropertyValue('--box-shadow')).toBe('none');
        el.remove();
    });
});

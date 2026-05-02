import { describe, it, expect } from 'vitest';
import './frame';

const make = () => {
    const el = document.createElement('frame-pk');
    document.body.appendChild(el);
    return el;
};

describe('frame-pk', () => {
    it('registers the custom element', () => {
        expect(customElements.get('frame-pk')).toBeDefined();
    });

    it('defaults to a 16:9 ratio', () => {
        const el = make();
        expect(el.ratio).toBe('16:9');
        expect(el.style.getPropertyValue('--frame-n')).toBe('16');
        expect(el.style.getPropertyValue('--frame-d')).toBe('9');
        el.remove();
    });

    it('parses a valid ratio attribute', () => {
        const el = make();
        el.ratio = '4:3';
        expect(el.style.getPropertyValue('--frame-n')).toBe('4');
        expect(el.style.getPropertyValue('--frame-d')).toBe('3');
        el.remove();
    });

    it('falls back to 16:9 when the ratio is malformed', () => {
        const el = make();
        el.ratio = 'garbage';
        expect(el.style.getPropertyValue('--frame-n')).toBe('16');
        expect(el.style.getPropertyValue('--frame-d')).toBe('9');
        el.remove();
    });

    it('falls back to 16:9 when the denominator is zero', () => {
        const el = make();
        el.ratio = '4:0';
        expect(el.style.getPropertyValue('--frame-n')).toBe('16');
        expect(el.style.getPropertyValue('--frame-d')).toBe('9');
        el.remove();
    });
});

import { describe, it, expect } from 'vitest';
import './container';

const make = () => {
    const el = document.createElement('container-pk');
    document.body.appendChild(el);
    return el;
};

describe('container-pk', () => {
    it('registers the custom element', () => {
        expect(customElements.get('container-pk')).toBeDefined();
    });

    it('returns null name by default and does not set container-name', () => {
        const el = make();
        expect(el.name).toBeNull();
        expect(el.style.getPropertyValue('container-name')).toBe('');
        el.remove();
    });

    it('sets container-name when name is assigned', () => {
        const el = make();
        el.name = 'main';
        expect(el.getAttribute('name')).toBe('main');
        expect(el.style.getPropertyValue('container-name')).toBe('main');
        el.remove();
    });

    it('removes container-name when name is cleared', () => {
        const el = make();
        el.name = 'main';
        el.name = null;
        expect(el.hasAttribute('name')).toBe(false);
        expect(el.style.getPropertyValue('container-name')).toBe('');
        el.remove();
    });
});

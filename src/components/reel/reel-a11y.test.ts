import { describe, it, expect } from 'vitest';
import './reel';

// happy-dom has no layout, so scrollWidth/clientWidth are stubbed per test.
const mount = (scrollWidth: number, clientWidth: number) => {
    const el = document.createElement('reel-pk');
    Object.defineProperty(el, 'scrollWidth', { value: scrollWidth, configurable: true });
    Object.defineProperty(el, 'clientWidth', { value: clientWidth, configurable: true });
    document.body.appendChild(el);
    return el;
};

describe('reel-pk overflow & keyboard access', () => {
    it('becomes keyboard-focusable while overflowing', () => {
        const el = mount(500, 100);
        expect(el.classList.contains('overflowing')).toBe(true);
        expect(el.getAttribute('tabindex')).toBe('0');
        el.remove();
    });

    it('stays unfocusable when content fits', () => {
        const el = mount(100, 100);
        expect(el.classList.contains('overflowing')).toBe(false);
        expect(el.hasAttribute('tabindex')).toBe(false);
        el.remove();
    });

    it('drops its managed tabindex when overflow goes away', () => {
        const el = mount(500, 100);
        Object.defineProperty(el, 'scrollWidth', { value: 100, configurable: true });
        el.itemWidth = '5rem';
        expect(el.classList.contains('overflowing')).toBe(false);
        expect(el.hasAttribute('tabindex')).toBe(false);
        el.remove();
    });

    it('never touches an author-set tabindex', () => {
        const el = document.createElement('reel-pk');
        el.setAttribute('tabindex', '-1');
        Object.defineProperty(el, 'scrollWidth', { value: 500, configurable: true });
        Object.defineProperty(el, 'clientWidth', { value: 100, configurable: true });
        document.body.appendChild(el);
        expect(el.getAttribute('tabindex')).toBe('-1');
        Object.defineProperty(el, 'scrollWidth', { value: 100, configurable: true });
        el.itemWidth = '5rem';
        expect(el.getAttribute('tabindex')).toBe('-1');
        el.remove();
    });

    it('rechecks overflow when itemWidth changes', () => {
        const el = mount(100, 100);
        expect(el.classList.contains('overflowing')).toBe(false);
        Object.defineProperty(el, 'scrollWidth', { value: 900, configurable: true });
        el.itemWidth = '30rem';
        expect(el.classList.contains('overflowing')).toBe(true);
        el.remove();
    });
});

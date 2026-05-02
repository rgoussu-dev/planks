import { describe, it, expect, beforeAll } from 'vitest';
import LayoutElementPk from './layout-element';

class FakePk extends LayoutElementPk {
    structuralCalls = 0;
    instanceCalls = 0;
    protected structuralCss(): string {
        this.structuralCalls++;
        return 'fake-pk { display: block; }';
    }
    protected override applyInstanceStyles(): void {
        this.instanceCalls++;
    }
    static get observedAttributes() { return ['watched']; }
}

beforeAll(() => {
    if (!customElements.get('fake-pk')) customElements.define('fake-pk', FakePk);
});

describe('LayoutElementPk', () => {
    it('sets data-role="layout" on connect', () => {
        const el = document.createElement('fake-pk');
        document.body.appendChild(el);
        expect(el.getAttribute('data-role')).toBe('layout');
        el.remove();
    });

    it('injects structural CSS only once per tag, regardless of instance count', () => {
        const a = document.createElement('fake-pk');
        const b = document.createElement('fake-pk');
        document.body.append(a, b);
        const styles = document.head.querySelectorAll('style[data-pk-component="fake-pk"]');
        expect(styles).toHaveLength(1);
        expect(styles[0]?.textContent).toContain('fake-pk');
        a.remove();
        b.remove();
    });

    it('calls applyInstanceStyles on connect and on observed attribute change', () => {
        const el = document.createElement('fake-pk') as FakePk;
        document.body.appendChild(el);
        const afterConnect = el.instanceCalls;
        expect(afterConnect).toBeGreaterThanOrEqual(1);

        el.setAttribute('unwatched', 'x');
        expect(el.instanceCalls).toBe(afterConnect);

        el.setAttribute('watched', 'y');
        expect(el.instanceCalls).toBe(afterConnect + 1);
        el.remove();
    });

    it('ensureDynamicStyle injects a style tag exactly once per key', () => {
        const css = () => '.dyn-test { color: red; }';
        LayoutElementPk.ensureDynamicStyle('dyn-test-key', css);
        LayoutElementPk.ensureDynamicStyle('dyn-test-key', css);
        const styles = document.head.querySelectorAll('style[data-pk-dyn="dyn-test-key"]');
        expect(styles).toHaveLength(1);
        expect(styles[0]?.textContent).toContain('.dyn-test');
    });
});

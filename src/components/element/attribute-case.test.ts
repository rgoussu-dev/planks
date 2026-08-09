import { describe, it, expect } from 'vitest';
import Box from '../box/box';
import Center from '../center/center';
import Cluster from '../cluster/cluster';
import Container from '../container/container';
import Cover from '../cover/cover';
import Frame from '../frame/frame';
import Grid from '../grid/grid';
import Icon from '../icon/icon';
import Imposter from '../imposter/imposter';
import Reel from '../reel/reel';
import Sidebar from '../sidebar/sidebar';
import Stack from '../stack/stack';
import Switcher from '../switcher/switcher';
import Typography from '../typography/typography';

const components: [string, { observedAttributes: string[] }][] = [
    ['box-pk', Box],
    ['center-pk', Center],
    ['cluster-pk', Cluster],
    ['container-pk', Container],
    ['cover-pk', Cover],
    ['frame-pk', Frame],
    ['grid-pk', Grid],
    ['icon-pk', Icon],
    ['imposter-pk', Imposter],
    ['reel-pk', Reel],
    ['sidebar-pk', Sidebar],
    ['stack-pk', Stack],
    ['switcher-pk', Switcher],
    ['typography-pk', Typography],
];

describe('observedAttributes casing', () => {
    // Browsers store HTML attribute names lowercased and match observedAttributes by
    // exact string, so a camelCase entry never fires attributeChangedCallback in a real
    // browser. happy-dom matches case-insensitively, which hides the bug from every
    // other test in this suite — this guard is the only thing that catches it here.
    it.each(components)('%s observes only lowercase attribute names', (_tag, ctor) => {
        for (const name of ctor.observedAttributes) {
            expect(name).toBe(name.toLowerCase());
        }
    });
});

// One attribute per test, set after connect, with no other observed attribute touched
// afterwards — a dead observedAttributes entry can't be masked by the full re-apply
// sweep another attribute's change would trigger.
describe('dynamic updates after connect', () => {
    const mount = <K extends keyof HTMLElementTagNameMap>(tag: K) => {
        const el = document.createElement(tag);
        document.body.appendChild(el);
        return el;
    };

    it('box-pk restyles when borderWidth changes', () => {
        const el = mount('box-pk');
        el.setAttribute('borderWidth', '2px');
        expect(el.style.getPropertyValue('--box-border-width')).toBe('2px');
        el.remove();
    });

    it('box-pk restyles when backgroundColor changes via the property setter', () => {
        const el = mount('box-pk');
        el.backgroundColor = 'black';
        expect(el.style.getPropertyValue('--box-bg-color')).toBe('black');
        el.remove();
    });

    it('center-pk restyles when maxWidth changes', () => {
        const el = mount('center-pk');
        el.maxWidth = '40ch';
        expect(el.style.getPropertyValue('--center-max-width')).toBe('40ch');
        el.remove();
    });

    it('cover-pk restyles when minHeight changes', () => {
        const el = mount('cover-pk');
        el.minHeight = '50vh';
        expect(el.style.getPropertyValue('--cover-min-height')).toBe('50vh');
        el.remove();
    });

    it('reel-pk restyles when itemWidth changes', () => {
        const el = mount('reel-pk');
        el.itemWidth = '20rem';
        expect(el.style.getPropertyValue('--reel-item-width')).toBe('20rem');
        el.remove();
    });

    it('sidebar-pk restyles when sideWidth changes', () => {
        const el = mount('sidebar-pk');
        el.sideWidth = '18rem';
        expect(el.style.getPropertyValue('--sidebar-side-basis')).toBe('18rem');
        el.remove();
    });

    it('sidebar-pk restyles when contentWidth changes', () => {
        const el = mount('sidebar-pk');
        el.contentWidth = '60%';
        expect(el.style.getPropertyValue('--sidebar-content-min')).toBe('60%');
        el.remove();
    });

    it('stack-pk re-marks when splitAfter changes', () => {
        const el = mount('stack-pk');
        el.splitAfter = '2';
        expect(el.dataset.pkSplit).toBe('2');
        el.remove();
    });

    it('typography-pk restyles when fontSize changes', () => {
        const el = mount('typography-pk');
        el.fontSize = '2rem';
        expect(el.style.getPropertyValue('--typo-font-size')).toBe('2rem');
        el.remove();
    });
});

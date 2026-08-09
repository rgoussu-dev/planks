// Emits dist/structural.css: the concatenation of every component's structural
// stylesheet, exactly as the runtime would inject it into document.head. SSR and
// static consumers link this file so layout applies before (or without) JavaScript.
//
// The runtime injection is driven by connectedCallback, so we boot the built bundle
// inside happy-dom, connect one instance of each element, and read the injected
// <style data-pk-component> tags back out of document.head.
import { Window } from 'happy-dom';
import { writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');

const window = new Window();
globalThis.window = window;
globalThis.document = window.document;
globalThis.HTMLElement = window.HTMLElement;
globalThis.customElements = window.customElements;
globalThis.ResizeObserver = window.ResizeObserver;
globalThis.MutationObserver = window.MutationObserver;

await import(resolve(dist, 'planks.js'));

const tags = [
    'box-pk', 'center-pk', 'cluster-pk', 'container-pk', 'cover-pk', 'frame-pk',
    'grid-pk', 'icon-pk', 'imposter-pk', 'reel-pk', 'sidebar-pk', 'stack-pk',
    'switcher-pk', 'typography-pk',
];
for (const tag of tags) {
    if (!customElements.get(tag)) throw new Error(`${tag} did not register`);
    document.body.appendChild(document.createElement(tag));
}

const sheets = [...document.head.querySelectorAll('style[data-pk-component]')];
const missing = tags.filter(t => !sheets.some(s => s.dataset.pkComponent === t));
if (missing.length) throw new Error(`no structural sheet injected for: ${missing.join(', ')}`);

const banner = '/* @rgoussu.dev/planks — structural CSS for all components (generated; do not edit) */\n';
const css = sheets
    .map(s => `/* ${s.dataset.pkComponent} */${s.textContent}`)
    .join('\n');
await writeFile(resolve(dist, 'structural.css'), banner + css + '\n');
console.log(`structural.css: ${sheets.length} component sheets written`);

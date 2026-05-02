/**
 * Demo helpers shared by every story file.
 *
 * Visual language: editorial / draftsman's plate.
 *  - paper / ink / vermillion palette
 *  - mono uppercase labels (JetBrains Mono)
 *  - serif body copy (Lora) and display (Fraunces)
 *
 * The CSS that backs `pk-*` classes lives in `.storybook/preview-head.html`.
 */

export const palette = {
  paper: '#fbf8f3',
  cream: '#f5efe6',
  wash: '#ede4d3',
  ink: '#1a1816',
  graphite: '#6b655c',
  vermillion: '#c8362d',
} as const;

type CellTone = 'cream' | 'wash' | 'paper' | 'ink' | 'vermillion';

export interface CellOptions {
  tone?: CellTone;
  height?: string;
  width?: string;
  align?: 'start' | 'center' | 'end';
}

/** Numbered cell — the primary "demo content" used to make layout effects visible. */
export function cell(label: string | number, opts: CellOptions = {}): string {
  const tone = opts.tone ?? 'cream';
  const cls = `pk-cell pk-cell--${tone}`;
  const align = opts.align ?? 'center';
  const justify = align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center';
  const styles = [
    'display:flex',
    'align-items:center',
    `justify-content:${justify}`,
    opts.height ? `min-height:${opts.height}` : '',
    opts.width ? `width:${opts.width}` : '',
  ]
    .filter(Boolean)
    .join(';');
  return `<div class="${cls}" style="${styles}">${label}</div>`;
}

/** A "tag" / "chip" pill for cluster demos. */
export function tag(label: string, opts: { tone?: 'cream' | 'ink' | 'vermillion' } = {}): string {
  const tone = opts.tone ?? 'cream';
  const bg = tone === 'cream' ? 'var(--pk-cream)' : tone === 'ink' ? 'var(--pk-ink)' : 'var(--pk-vermillion)';
  const fg = tone === 'cream' ? 'var(--pk-ink)' : 'var(--pk-paper)';
  return `<span style="
    display:inline-flex;align-items:center;gap:0.4em;
    background:${bg};color:${fg};
    padding:0.35em 0.85em;border-radius:999px;
    font-family:var(--font-mono);font-size:0.72rem;letter-spacing:0.08em;text-transform:uppercase;
    border:1px solid ${tone === 'cream' ? 'var(--pk-rule)' : 'transparent'};
  ">${label}</span>`;
}

/** A button that fits the aesthetic. */
export function button(label: string, opts: { variant?: 'ghost' | 'solid' } = {}): string {
  const solid = opts.variant === 'solid';
  return `<button style="
    font-family:var(--font-mono);font-size:0.72rem;letter-spacing:0.16em;text-transform:uppercase;
    padding:0.7em 1.2em;cursor:pointer;
    background:${solid ? 'var(--pk-ink)' : 'transparent'};
    color:${solid ? 'var(--pk-paper)' : 'var(--pk-ink)'};
    border:1px solid var(--pk-ink);
  ">${label}</button>`;
}

/** Small rich content card used to demo Box, Grid, Reel. */
export function card(opts: { eyebrow?: string; title: string; body: string; accent?: boolean }): string {
  const accent = opts.accent ? 'border-left:3px solid var(--pk-vermillion);padding-left:calc(1.25rem - 3px);' : '';
  return `<article style="
    background:var(--pk-paper);border:1px solid var(--pk-rule);
    padding:1.25rem;${accent}
    height:100%;box-sizing:border-box;
    display:flex;flex-direction:column;gap:0.5rem;
  ">
    ${opts.eyebrow ? `<span class="pk-mono">${opts.eyebrow}</span>` : ''}
    <h4 style="
      margin:0;font-family:var(--font-display);font-weight:500;font-size:1.15rem;
      letter-spacing:-0.01em;color:var(--pk-ink);
    ">${opts.title}</h4>
    <p style="margin:0;font-family:var(--font-family);font-size:0.92rem;line-height:1.55;color:var(--pk-ink)">${opts.body}</p>
  </article>`;
}

/** Mono caption / eyebrow text. */
export function caption(text: string): string {
  return `<span class="pk-mono">${text}</span>`;
}

/**
 * Plate frame: wraps a demo with an editorial label header
 * (plate number + section title), an optional measurement footer.
 *
 * Usage:
 *   plate({ no: '01', title: 'Default rhythm', body: htmlString, foot: 'Space — var(--s1)' })
 */
export interface PlateOptions {
  no?: string;
  title?: string;
  body: string;
  foot?: string;
  bare?: boolean;
  accent?: boolean;
}

export function plate(opts: PlateOptions): string {
  const headClass = opts.accent ? 'pk-plate__head pk-plate__head--accent' : 'pk-plate__head';
  const bodyClass = opts.bare ? 'pk-plate__body pk-plate__body--bare' : 'pk-plate__body';
  const head =
    opts.no || opts.title
      ? `<header class="${headClass}">
          <span class="pk-plate__no">${opts.no ? `Plate ${opts.no}` : ''}</span>
          <span class="pk-plate__title">${opts.title ?? ''}</span>
        </header>`
      : '';
  const foot = opts.foot ? `<footer class="pk-plate__foot">${opts.foot}</footer>` : '';
  return `<figure class="pk-plate">${head}<div class="${bodyClass}">${opts.body}</div>${foot}</figure>`;
}

/** Stack of plates separated by a small gap — for stories that show several specimens. */
export function specimens(parts: string[], gap = '1.5rem'): string {
  return `<div style="display:flex;flex-direction:column;gap:${gap}">${parts.join('')}</div>`;
}

/** Two-column responsive sample grid — for showing variants side by side. */
export function sampleGrid(items: string[], min = '260px'): string {
  return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(${min},1fr));gap:1rem">${items.join('')}</div>`;
}

/** Inline annotation showing a measurement (e.g. for spacing scale). */
export function dimension(label: string, value: string): string {
  return `<div style="display:flex;align-items:center;gap:0.75rem;font-family:var(--font-mono);font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--pk-graphite)">
    <span style="display:inline-block;width:0.5rem;height:0.5rem;background:var(--pk-vermillion)"></span>
    <span>${label}</span>
    <span style="flex:1;border-bottom:1px dashed var(--pk-rule)"></span>
    <span>${value}</span>
  </div>`;
}

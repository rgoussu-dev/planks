export interface StyleConfig {
    id: string;
    css: string;
}

export default abstract class ShadowElementPk extends HTMLElement {
    protected shadow: ShadowRoot;
    private static styleSheetCache = new Map<string, CSSStyleSheet>();
    private static baseStyleSheet: CSSStyleSheet | null = null;
    protected templateCache = new Map<string, HTMLTemplateElement>();

    constructor(tagName: string, mode: 'open' | 'closed' = 'open') {
        super();
        this.shadow = this.attachShadow({ mode });
        this.setAttribute('tag', tagName);
    }

    private static getBaseStyles(): string {
        return `
            *,
            *::before,
            *::after {
                box-sizing: border-box;
                max-inline-size: var(--measure);
            }

            :host {
                font-family: var(--font-family, system-ui, sans-serif);
                color: inherit;
                max-inline-size: none;
            }

            img {
                max-width: 100%;
                height: auto;
            }

            div,
            section,
            header,
            nav,
            main,
            footer,
            [data-role="layout"],
            slot {
                max-inline-size: none;
            }
        `;
    }

    abstract styles(): string | null;
    abstract render(): void;

    attributeChangedCallback(_name: string, _oldValue: string | null, _newValue: string | null) {
        if (this.isConnected) {
            this.update();
        }
    }

    connectedCallback() {
        this.applyStyles();
        this.render();
    }

    disconnectedCallback() {
        this.templateCache.clear();
    }

    private applyStyles() {
        const sheets: CSSStyleSheet[] = [];

        if (!ShadowElementPk.baseStyleSheet) {
            ShadowElementPk.baseStyleSheet = new CSSStyleSheet();
            ShadowElementPk.baseStyleSheet.replaceSync(ShadowElementPk.getBaseStyles());
        }
        sheets.push(ShadowElementPk.baseStyleSheet);

        const css = this.styles();
        if (css) {
            const styleId = `${this.tagName.toLowerCase()}-styles`;
            let sheet = ShadowElementPk.styleSheetCache.get(styleId);

            if (!sheet) {
                sheet = new CSSStyleSheet();
                sheet.replaceSync(css);
                ShadowElementPk.styleSheetCache.set(styleId, sheet);
            }
            sheets.push(sheet);
        }

        this.shadow.adoptedStyleSheets = sheets;
    }

    protected update() {}

    protected createTemplate(id: string, html: string): HTMLTemplateElement {
        if (this.templateCache.has(id)) {
            return this.templateCache.get(id)!;
        }
        const template = document.createElement('template');
        template.innerHTML = html;
        this.templateCache.set(id, template);
        return template;
    }

    protected cloneTemplate(id: string): DocumentFragment {
        const template = this.templateCache.get(id);
        if (!template) {
            throw new Error(`Template ${id} not found. Call createTemplate first.`);
        }
        return template.content.cloneNode(true) as DocumentFragment;
    }

    protected createElement<K extends keyof HTMLElementTagNameMap>(
        tagName: K,
        attributes?: Record<string, string>,
        textContent?: string
    ): HTMLElementTagNameMap[K] {
        const element = document.createElement(tagName);
        if (attributes) {
            Object.entries(attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }
        if (textContent) {
            element.textContent = textContent;
        }
        return element;
    }

    protected query<T extends Element = Element>(selector: string): T | null {
        return this.shadow.querySelector<T>(selector);
    }

    protected queryAll<T extends Element = Element>(selector: string): NodeListOf<T> {
        return this.shadow.querySelectorAll<T>(selector);
    }
}

export abstract class LayoutShadowElementPk extends ShadowElementPk {
    constructor(tagName: string) {
        super(tagName);
        this.setAttribute('data-role', 'layout');
    }
}

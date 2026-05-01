const registeredStructural = new Set<string>();
const registeredDynamic = new Set<string>();

export default abstract class LayoutElementPk extends HTMLElement {
    protected abstract structuralCss(): string;
    protected applyInstanceStyles(): void {}

    connectedCallback() {
        this.setAttribute('data-role', 'layout');
        const tag = this.localName;
        if (!registeredStructural.has(tag)) {
            registeredStructural.add(tag);
            const style = document.createElement('style');
            style.dataset.pkComponent = tag;
            style.textContent = this.structuralCss();
            document.head.appendChild(style);
        }
        this.applyInstanceStyles();
    }

    disconnectedCallback() {}

    attributeChangedCallback(_n: string, _o: string | null, _v: string | null) {
        if (this.isConnected) this.applyInstanceStyles();
    }

    static ensureDynamicStyle(key: string, css: () => string) {
        if (registeredDynamic.has(key)) return;
        registeredDynamic.add(key);
        const style = document.createElement('style');
        style.dataset.pkDyn = key;
        style.textContent = css();
        document.head.appendChild(style);
    }
}

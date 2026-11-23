class CustomComponent extends HTMLElement {
    connectedCallback() {
        this.textContent = 
    }

}

customElements.define("custom-component", CustomComponent);
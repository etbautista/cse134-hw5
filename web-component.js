import { load, save } from "./localStorage.js";

const FACTS_VIS_PREFERENCES_KEY = "facts-visible";
const FACTS_VIS_PREFERENCES = ["false", "true"];

const EXAMPLE_ITEMS = [
    "Pinapples take about 2-3 years to grow full size!", 
    "A Cloud can weigh around a million tons!",
    "All the world's bacteria would stretch for 10 billion light-years!"
]

const MAX_FACTS_FETCHED = 5;

let fetchedFacts = new Array(MAX_FACTS_FETCHED);

async function getFact() {
    const url = "https://uselessfacts.jsph.pl/api/v2/facts/random";

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(response.status);
        }

        const res = await response.json();
        return res.text;

    } catch (err) {
        return err;
    }
}

class FactComponent extends HTMLElement {
    static observedAttributes = ["vis"];
    #current = 0;
    #loaded = false;
    #fact;
    #count;
    #header;
    #retry;

    connectedCallback() {
        this.#fact = document.createElement("p");
        this.#count = document.createElement("small");
        this.#header = document.createElement("h3");
        this.#retry = document.createElement("button");
        const mainContainer = document.createElement("horizontal-container");
        const controlContainer = document.createElement("horizontal-container");
        const leftButton = document.createElement("button");
        const rightButton = document.createElement("button");
        const leftIcon = document.createElement("img");
        const rightIcon = document.createElement("img");
        
        this.#load();

        this.id = "fact-box";
        leftIcon.src = "public/assets/icons/left.svg";
        leftIcon.alt = "Previous Fact";
        rightIcon.src = "public/assets/icons/right.svg";
        rightIcon.alt = "Next Fact";
        this.#header.textContent = "Did You Know?";
        this.#retry.textContent = "load new facts";
        this.#retry.id = "new-facts";
        
        leftButton.appendChild(leftIcon);
        rightButton.appendChild(rightIcon);
        
        mainContainer.append(leftButton, this.#fact, rightButton,);
        controlContainer.append(this.#count, this.#retry);
        this.append(this.#header, mainContainer, controlContainer);

        this.#fact.role = "status";
        this.#fact.ariaLive = "polite";  
        
        leftButton.addEventListener("click", () => {
            this.#current = this.#current <= 0 ? MAX_FACTS_FETCHED - 1 : this.#current - 1;
            this.#renderFact();
        });
        
        rightButton.addEventListener("click", () => {
            this.#current = this.#current >= MAX_FACTS_FETCHED - 1 ? 0 : this.#current + 1;
            this.#renderFact();
        });
        
        this.#retry.addEventListener("click", () => {
            this.#loaded = false;
            this.#load();
        })
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        
        if (name === "vis") {
            if (newValue) {
                this.style.display = "flex";
            } else {    
                this.style.display = "none";
            }
        }
    }

    #renderFact() {
        this.#fact.textContent = fetchedFacts[this.#current];
        this.#count.textContent = `${this.#current + 1} of ${MAX_FACTS_FETCHED}`;
    }

    #renderError() {
        this.#header.textContent = "Error loading facts :(";
        this.#retry.textContent = "retry";
        this.#header.className = "error";
        this.#fact.className = "error";
        this.replaceChildren();
        this.append(this.#header, this.#fact, this.#retry);
    }
    
    async #load() {

        if(!this.#loaded) {
            this.#fact.textContent = "Loading facts...";
        }
        
        for(let i = 0; i < MAX_FACTS_FETCHED; i++){
            let data = await getFact();
            if(!(data instanceof Error)){
                fetchedFacts[i] = data;
            } else {
                this.#fact.textContent = data.message;
                this.#renderError();
                return;
            }
        }
        
        this.#renderFact();
        this.#loaded = true;
    }
}  

customElements.define("fact-component", FactComponent);

const component = document.querySelector("fact-component");

if(load(FACTS_VIS_PREFERENCES_KEY, FACTS_VIS_PREFERENCES, "true") === "true"){
    component.setAttribute("vis", "vis");
} else {
    component.setAttribute("vis", "");
}

const visButton = document.getElementById("facts-toggle");
visButton.addEventListener("click", () => {

    if (component.getAttribute("vis")){
        save(FACTS_VIS_PREFERENCES_KEY, "false");
        component.setAttribute("vis", "");
    } else {
        save(FACTS_VIS_PREFERENCES_KEY, "true");
        component.setAttribute("vis", "vis");
    }
})
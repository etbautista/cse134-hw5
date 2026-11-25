import { load, save } from "./localStorage.js";

const FACTS_VIS_PREFERENCES_KEY = "facts-visible";
const FACTS_VIS_PREFERENCES = ["false", "true"];

const EXAMPLE_ITEMS = [
    "Pinapples take about 2-3 years to grow full size!", 
    "A Cloud can weigh around a million tons!",
    "All the world's bacteria would stretch for 10 billion light-years!"
]

const MAX_FACTS_FETCHED = 1;

let fetchedFacts = new Array(MAX_FACTS_FETCHED);

async function getFact() {
    const url = "https://uselessfacts.jsph.pl/api/v2/facts/random";

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(response.status);
        }

        const res = await response.json();

        if(typeof res?.text !== "string"){
            throw new Error("Unexpected response format");
        }

        return res.text;

    } catch (err) {
        return err;
    }
}

class FactComponent extends HTMLElement {
    _initalized = false;
    static observedAttributes = ["vis"];
    #current = 0;
    #loaded = false;
    #fact;
    #count;
    #header;
    #retry;
    #mainContainer;
    #controlContainer;
    #leftButton;
    #rightButton;

    connectedCallback() {
        if (this._initalized) return;

        this._initalized = true;

        this.#fact = document.createElement("p");
        this.#count = document.createElement("small");
        this.#header = document.createElement("h3");
        this.#retry = document.createElement("button");
        this.#mainContainer = document.createElement("horizontal-container");
        this.#controlContainer = document.createElement("horizontal-container");
        this.#leftButton = document.createElement("button");
        this.#rightButton = document.createElement("button");
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
        
        this.#leftButton.appendChild(leftIcon);
        this.#rightButton.appendChild(rightIcon);
        
        this.#mainContainer.append(this.#leftButton, this.#fact, this.#rightButton,);
        this.#controlContainer.append(this.#count, this.#retry);
        this.append(this.#header, this.#mainContainer, this.#controlContainer);

        this.#fact.role = "status";
        this.#fact.ariaLive = "polite";  
        
        this.#leftButton.addEventListener("click", () => {
            this.#current = this.#current <= 0 ? MAX_FACTS_FETCHED - 1 : this.#current - 1;
            this.#renderFact();
        });
        
        this.#rightButton.addEventListener("click", () => {
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

    #renderError(msg) {
        this.#header.textContent = "Error loading facts :(";
        this.#retry.textContent = "retry";
        this.#header.className = "error";
        this.#fact.className = "error";
        this.#fact.textContent = msg;
        this.#retry.textContent = "retry";
        this.#leftButton.hidden = true;
        this.#rightButton.hidden = true;
        this.#count.hidden = true;
    }

    #clearError(){
        this.#header.textContent = "Did You Know?";
        this.#retry.textContent = "load new facts";
        this.#header.className = "";
        this.#fact.className = "";
        this.#leftButton.hidden = false;
        this.#rightButton.hidden = false;
        this.#count.hidden = false;
    }

    async #load() {
        this.#retry.disabled = true;
        this.#fact.textContent = "Loading facts...";
    
        try {
            for(let i = 0; i < MAX_FACTS_FETCHED; i++){
                let data = await getFact();
                if(data instanceof Error){
                    this.#renderError(`Couldn't load facts: data.message.`);
                    return;
                } 
                fetchedFacts[i] = data;
            }
            
            this.#clearError();
            this.#current = 0;
            this.#renderFact();
            this.#loaded = true;
            
        } finally {
            this.#retry.disabled = false;
        }
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
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const msgInput = document.getElementById("message");
const errorDisp = document.querySelector("error-field");
const warnDisp = document.querySelector("warning-field");
const nameErr = document.getElementById("name-err");
const emailErr = document.getElementById("email-err");
const form = document.querySelector("form");
const msgErr = document.getElementById("msg-err");
const nameWarn = document.getElementById("name-warn");
const emailWarn = document.getElementById("email-warn");
const msgWarn = document.getElementById("msg-warn");
const submitButton = document.getElementById("form-submit");
let nameErrorPresent = false;
let emailErrorPresent = false;
let msgErrorPresent = false;

let form_errors = [];

nameInput.addEventListener("input", () => {
    const characterCt = document.getElementById("name-char-ct")
    let characterLength = nameInput.value.trim().length;

    if (characterLength < nameInput.minLength){
        nameInput.setCustomValidity(`Please enter a name longer than ${nameInput.minLength} character.`);
    
    } else if (characterLength > nameInput.maxLength - 10 && characterLength < nameInput.maxLength){
    warnDisp.style.display = "block";
    nameWarn.textContent = "Approaching character limit.";

    } else if (characterLength >= nameInput.maxLength) {
        warnDisp.style.display = "block";
        nameWarn.textContent = `Max character limit is ${nameInput.maxLength}.`;

    } else {
        nameInput.setCustomValidity("");
        warnDisp.style.display = "none";
    }

    characterCt.innerHTML = `${characterLength}/100`
})

nameInput.addEventListener("blur", () => {
    warnDisp.style.display = "none"

    if(!nameInput.checkValidity()){
        if (nameInput.value.trim().length < 1) {
            nameInput.setCustomValidity(`Please enter a name longer than ${nameInput.minLength} character.`);
            nameInput.classList.add("not-valid");
        }

        nameErrorPresent = true;
        nameErr.textContent = nameInput.validationMessage;
        errorDisp.style.display = "block";
        nameErr.style.display = "block";
        nameErr.setAttribute('aria-invalid', 'true');
    } else {
        nameErr.style.display = "none";
        nameErrorPresent = false;
        nameInput.classList.remove("not-valid");
        nameErr.setAttribute('aria-invalid', 'false');
    }

    if(!(nameErrorPresent || emailErrorPresent || msgErrorPresent)){
        errorDisp.style.display = "none"
    }
})

nameInput.addEventListener("invalid", () => {
    if (nameInput.validity.valueMissing) {
        nameInput.setCustomValidity(`Please enter an name longer than ${nameInput.minLength} character.`);
        nameErrorPresent = true;
        nameErr.textContent = nameInput.validationMessage;
        errorDisp.style.display = "block";
        nameErr.style.display = "block";
        nameErr.setAttribute('aria-invalid', 'true');
    }
})

emailInput.addEventListener("input", () => {
    const characterCt = document.getElementById("email-char-ct")
    let characterLength = emailInput.value.trim().length;

    if (characterLength < emailInput.minLength){
        emailInput.setCustomValidity(`Please enter an email longer than ${emailInput.minLength} character.`);
    
    } else if (characterLength > emailInput.maxLength - 10 && characterLength < emailInput.maxLength){
        warnDisp.style.display = "block";
        emailWarn.textContent = "Approaching character limit.";

    } else if (characterLength >= emailInput.maxLength) {
        warnDisp.style.display = "block";
        emailWarn.textContent = `Max character limit is ${emailInput.maxLength}.`;

    } else {
        emailInput.setCustomValidity("");
        warnDisp.style.display = "none";

    }

    characterCt.textContent = `${characterLength}/100`
})

emailInput.addEventListener("blur", () => {
    warnDisp.style.display = "none"


    if(!emailInput.checkValidity()){
        if (emailInput.value.trim().length < 1) {
            emailInput.setCustomValidity(`Please enter an email longer than ${emailInput.minLength} character.`);
            emailInput.classList.add("not-valid");
        }

        emailErrorPresent = true;
        emailErr.textContent = emailInput.validationMessage;
        errorDisp.style.display = "block";
        emailErr.style.display = "block";
        emailErr.setAttribute('aria-invalid', 'true');
    } else {
        emailErr.style.display = "none";
        emailErrorPresent = false;
        emailInput.classList.remove("not-valid");
        emailErr.setAttribute('aria-invalid', 'false');
    }

    if(!(nameErrorPresent || emailErrorPresent || msgErrorPresent)){
        errorDisp.style.display = "none"
    }
})

emailInput.addEventListener("invalid", () => {
    if (emailInput.validity.valueMissing) {
        emailInput.setCustomValidity(`Please enter an email longer than ${emailInput.minLength} character.`);
        emailErrorPresent = true;
        emailErr.textContent = emailInput.validationMessage;
        errorDisp.style.display = "block";
        emailErr.style.display = "block";
        emailErr.setAttribute('aria-invalid', 'true');
    }
})

msgInput.addEventListener("input", () => {
    const characterCt = document.getElementById("msg-char-ct")
    let characterLength = msgInput.value.trim().length;

    if (characterLength < msgInput.minLength){
        msgInput.setCustomValidity(`Please enter a message longer than ${msgInput.minLength} characters.`);
        warnDisp.style.display = "none";

    } else if (characterLength > msgInput.maxLength - 50 && characterLength < msgInput.maxLength){
        warnDisp.style.display = "block";
        msgWarn.textContent = "Approaching character limit.";

    } else if (characterLength >= msgInput.maxLength) {
        warnDisp.style.display = "block";
        msgWarn.textContent = `Max character limit is ${msgInput.maxLength}.`;

    } else {
        msgInput.setCustomValidity("");
        warnDisp.style.display = "none";

    }
    characterCt.textContent = `${characterLength}/1000`
})

msgInput.addEventListener("blur", () => {
    warnDisp.style.display = "none"

    if(!msgInput.checkValidity()){
        if (msgInput.value.trim().length < 1) {
            msgInput.setCustomValidity(`Please enter a message longer than ${msgInput.minLength} characters.`);
            msgInput.classList.add("not-valid");
        } 

        msgErrorPresent = true;
        msgErr.textContent = msgInput.validationMessage;
        errorDisp.style.display = "block";
        msgErr.style.display = "block";
        msgErr.setAttribute('aria-invalid', 'true');
    } else {
        msgErr.style.display = "none";
        msgErrorPresent = false;
        msgInput.classList.remove("not-valid");
        msgErr.setAttribute('aria-invalid', 'false');
    }

    if(!(nameErrorPresent || emailErrorPresent || msgErrorPresent)){
        errorDisp.style.display = "none"

    }
})

msgInput.addEventListener("invalid", (event) => {
    if (msgInput.validity.valueMissing) {
        msgInput.setCustomValidity(`Please enter a message longer than ${msgInput.minLength} characters.`);
        msgErrorPresent = true;
        msgErr.textContent = msgInput.validationMessage;
        errorDisp.style.display = "block";
        msgErr.style.display = "block";
        msgErr.setAttribute('aria-invalid', 'true');
        form_errors.push(event.target.validationMessage);
    }
})

form.addEventListener("invalid", (event) => {
    event.preventDefault();
    

    form_errors.push(`${event.target.name}: ${event.target.validationMessage}`);

}, true)

form.addEventListener("submit", () => {
    const error_hist = form.querySelector('[name="form-errors"]');
    const set = [...new Set(form_errors)]

    error_hist.value = JSON.stringify(set);


})
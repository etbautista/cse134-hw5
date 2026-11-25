import { load, save } from "./localStorage.js";

const THEME_KEY = "theme";
const THEMES = ["light", "dark"];


const toggle = document.getElementById("theme-change");

document.documentElement.dataset.theme = load(THEME_KEY, THEMES, "light");

toggle.addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    save(THEME_KEY, theme);
})
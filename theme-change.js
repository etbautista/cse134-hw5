const toggle = document.getElementById("theme-change");


toggle.addEventListener("click", () => {
    const currTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currTheme === "dark" ? "light" : "dark";


    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
})
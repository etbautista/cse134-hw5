const left = document.getElementById("left-arrow");
const right = document.getElementById("right-arrow");
const pages = [...document.querySelectorAll(".tech-page")];
pages.forEach((page, i) => (page.hidden = i !== 0));

let index = 0;
let current = null;

function slide(step) {
    const update = () => {
        pages[index].hidden = true;
        index = (index + step + pages.length) % pages.length;
        pages[index].hidden = false;
    }

    if (!document.startViewTransition) return update();

    document.documentElement.dataset.direction = step > 0 ? "next" : "prev";
    const t = (current = document.startViewTransition(update));
    t.finished.finally(() => {
        if (current === t) delete document.documentElement.dataset.direction;
    })
}

left.addEventListener("click", () => {
    slide(-1);
});

right.addEventListener("click", () => {
    slide(1);
});
const range = document.querySelector(".range");
const displayedRange = document.querySelector(".displayedSize");
const container = document.querySelector(".container");
const buttons = document.querySelectorAll("button");
let activeMode = "blackWhite";

window.addEventListener("DOMContentLoaded", () => {
    updateGrid();
});

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        buttons.forEach((btn) => {
            btn.classList.remove("active");
        });
        activeMode = btn.className;
        btn.classList.add("active");
        clearItems();
    });
});

function clearItems() {
    let items = document.querySelectorAll(".item");
    items.forEach((item) => {
        item.style.backgroundColor = "#FFF";
    });
}

range.addEventListener("input", () => {
    displayedRange.textContent = `${range.value}x${range.value}`;
    updateGrid();
});

function updateGrid() {
    clear();
    addItems();
    updateSizes();
}

function updateSizes() {
    let items = document.querySelectorAll(".item");
    items.forEach((item) => {
        item.style.width = `${100 / range.value}%`;
        item.style.height = `${100 / range.value}%`;
    });
}

function clear() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function addItems() {
    const itemToCopy = document.createElement("div");
    itemToCopy.className = "item";
    itemToCopy.style.backgroundColor = "#FFF";
    for (let i = 0; i < range.value ** 2; i++) {
        const item = itemToCopy.cloneNode(true);
        container.appendChild(item);
        item.addEventListener("mouseover", () => {
            itemColor(item);
        });
    }
}

function itemColor(item) {
    let color = "#0b1a25";
    if (activeMode === "rainbow") {
        color = randomColor();
    } else if (activeMode === "grayscale") {
        color = darkerColor(item.style.backgroundColor);
    }
    item.style.backgroundColor = color;
}

function randomColor() {
    let colorDigits = "0123456789ABCDEF";
    let color = ["#"];
    for (let i = 0; i < 6; i++) {
        color.push(colorDigits[Math.floor(Math.random() * 16)]);
    }
    return color.join("");
}

function darkerColor(prevColor) {
    const sepDigits = prevColor.slice(4, -1).split(", ");
    sepDigits.forEach((digit, i) => {
        if (sepDigits[i] - 45 >= 0) {
            sepDigits[i] = sepDigits[i] - 45;
        } else {
            sepDigits[i] = 0;
        }
    });
    const newColor = `rgb(${sepDigits[0]}, ${sepDigits[1]}, ${sepDigits[2]})`;
    return newColor;
}

const gridbox = document.querySelector(".grid");
const btns = document.querySelectorAll("button");
const colorPick = document.querySelector("#clrpicker");
const nOfUnit = document.querySelector(".showunit");
const unitSelector = document.querySelector("#gridunit");


let unitInRow = 16;
let color = '#000000';

function getRandomColor() {
    randClr = Math.floor(Math.random() * 256);
    return `rgb(${randClr}, ${randClr}, ${randClr})`;
}

function createDivs(numOfUnit) {
    let unitSize = gridbox.offsetWidth / numOfUnit;
    console.log(gridbox.offsetWidth);
    console.log(unitSize);
    for (let i = 0; i < numOfUnit ** 2; i++) {
        let unitSquare = document.createElement('div');
        unitSquare.className = "unit";
        unitSquare.setAttribute('style', `width:${unitSize}px; height: ${unitSize}px`);
        // unitSquare.setAttribute('height', `${unitSize}px`);
        gridbox.appendChild(unitSquare);
    }
}

// to get color from the input
colorPick.addEventListener("input", (e) => {
    color = e.target.value;
    console.log(color);
})

// get the number of unit
unitSelector.addEventListener("input", (e) => {
    nOfUnit.textContent = `${e.target.value}x${e.target.value}`;
    unitInRow = e.target.value;
    console.log(unitInRow);
})

document.addEventListener("DOMContentLoaded", () => {
    createDivs(unitInRow);
    console.log(gridbox);
})

// WAY TO GOOOOOOOOOOOOOOOOO tomorrow I have to
// make it dinamically change with the range
// make it change color with the color input
// make the rainbow shit
// and clear and eraser (color white)
// and make it clear the table after each change in range



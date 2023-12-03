const gridbox = document.querySelector(".grid");
const btns = document.querySelectorAll("button");
const colorPick = document.querySelector("#clrpicker");
const nOfUnit = document.querySelector(".showunit");
const unitSelector = document.querySelector("#gridunit");


let unitInRow = 16;
let color = '#000000';
let currentMode = 'color';
let tempColor; //always declare variables out!!!
let colorRGB = hexToRgb(color);

let mouseDown = false;
document.body.addEventListener('mousedown', () => { mouseDown = true});
document.body.addEventListener('mouseup', () => { mouseDown = false});

btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        btnId = e.target.id;
        switch (btnId) {
            case 'clrbtn':
                currentMode = 'color';
                break;
            case 'rainbowbtn':
                currentMode = 'rainbow';
                break;
            case 'eraserbtn':
                currentMode = 'eraser';
                break;
            case 'clearbtn':
                clearGrid();
                createDivs(unitInRow);
                break;
        }
    })
})


function getRandomColor() {
    randRed = Math.floor(Math.random() * 256);
    randGreen = Math.floor(Math.random() * 256);
    randBlue = Math.floor(Math.random() * 256);
    return `rgb(${randRed}, ${randGreen}, ${randBlue})`;
}

function createDivs(numOfUnit) {
    let unitSize = gridbox.offsetWidth / numOfUnit;
    console.log(gridbox.offsetWidth);
    console.log(unitSize);
    for (let i = 0; i < numOfUnit ** 2; i++) {
        let unitSquare = document.createElement('div');
        unitSquare.className = "unit";
        unitSquare.setAttribute('style', `width:${unitSize}px; height: ${unitSize}px`);
        unitSquare.addEventListener('mouseenter', changeColor);
        unitSquare.addEventListener('mouseover', hoverCells);
        unitSquare.addEventListener('mouseout', hoverCells);
        gridbox.appendChild(unitSquare);
    }
}

// also gridbox.innerHTML = ''; but this is more secure although less performances
function clearGrid() {
    while (gridbox.firstChild) {
        gridbox.removeChild(gridbox.firstChild);
    }
}

// convert hex to rgb to do the darkening effect
function hexToRgb(hex) {
    // Remove the hash (#) if it exists
    hex = hex.replace(/^#/, '');

    // Parse the hex code into individual color components
    var bigint = parseInt(hex, 16);

    // Extract the red, green, and blue components
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    // Return the RGB values as a string
    return `rgb(${r}, ${g}, ${b})`;
}
  

// to get color from the input
colorPick.addEventListener("input", (e) => {
    color = e.target.value;
    colorRGB = hexToRgb(color);
    console.log(hexToRgb(color));
})

function changeColor(e) {
    if (e.type === 'mouseenter' && mouseDown) {
        if (currentMode === 'color') {
            e.target.style.backgroundColor = colorRGB;
        }
        else if (currentMode === 'rainbow') {
            e.target.style.backgroundColor = getRandomColor();
        }
        else if (currentMode === 'eraser') {
            e.target.style.backgroundColor = '#FFFFFF';
    }}
}

function hoverCells(e) {
    if (e.type == 'mouseover' && !mouseDown) {
        tempColor = e.target.style.backgroundColor;
        e.target.style.backgroundColor = color;
    }
    else if (e.type == 'mouseout' && !mouseDown) {
        e.target.style.backgroundColor = tempColor;
    }
}

// for performances I divide the actions
 unitSelector.addEventListener("input", (e) => {
    nOfUnit.textContent = `${e.target.value}x${e.target.value}`;
})

// get the number of unit and create grid
unitSelector.addEventListener("change", (e) => {
    unitInRow = e.target.value;
    clearGrid();
    createDivs(unitInRow);
})

document.addEventListener("DOMContentLoaded", () => {
    createDivs(unitInRow);
})


//to make the additional shade first convert hex to rgb then add +10 of shade everytime!
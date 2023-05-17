const cells = []
let selectingStart = false;
let selectingFinish = false;

// BUTTONS
let selectStart = document.getElementById('select-start').addEventListener('click', () => {
    selectingStart = true;
});

let selectFinish = document.getElementById('select-finish').addEventListener('click', () => {
    selectingFinish = true;
})

let startTraversal = document.getElementById('start-traversal');

let clearBoard = document.getElementById('clear-board').addEventListener('click', () => {
    clearTheBoard();
})

// CREATE THE GRID
const createGrid = () => {
    const grid = document.getElementById('grid')

    for (let i = 0; i < 46; i++) {
        const row = []
        for (let j = 0; j < 71; j++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            grid.appendChild(cellElement);

            // CREATE THE CELL OBJECT
            const cell = {
                x: i,
                y: j,
                isStart: false,
                isFinish: false,
                isWall: false,
                weight: 0,
                traversed: false,
                element: cellElement
            };

            // ONCLICK SET THE CELL TO THE START LOCATION
            cellElement.addEventListener('click', () => {
                if (selectingStart) {
                    removeStartLocation();
                    cell.isStart = true;
                    selectStart = false;
                    cellElement.style.backgroundColor = 'green';
                    selectingStart = false;
                }
            })

            // ONCLICK SET THE CELL TO THE FINISH LOCATION
            cellElement.addEventListener('click', () => {
                if (selectingFinish) {
                    removeFinishLocation();
                    cell.isFinish = true;
                    selectFinish = false;
                    cellElement.style.backgroundColor = 'red';
                    selectingFinish = false;
                }
            })
            row.push(cell);
        }
        cells.push(row)
    }
}


// REMOVE START LOCATION
const removeStartLocation = () => {
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j].isStart) {
                cells[i][j].isStart = false;
                cells[i][j].element.style.backgroundColor = "antiquewhite";
            }
        }
    }
}


// REMOVE ALL WEIGHTS
const removeAllWeights = () => {
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j].weight !== 0) {
                cells[i][j].weight = 0;
            }
        }
    }
}


// REMOVE FINISH LOCATION
const removeFinishLocation = () => {
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j].isFinish) {
                cells[i][j].isFinish = false;
                cells[i][j].element.style.backgroundColor = "antiquewhite";
            }
        }
    }
}


// REMOVE ALL WALLS
const removeAllWalls = () => {
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j].isWall) {
                cells[i][j].isWall = false;
            }
        }
    }
}


// REMOVE TRAVERSAL STATUS
const removeTraversalStatus = () => {
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j].traversed) {
                cells[i][j].traversed = false;
            }
        }
    }
}


// CLEAR THE BOARD
const clearTheBoard = () => {
    removeStartLocation();
    removeFinishLocation();
    removeTraversalStatus();
    removeAllWalls();
}


// CREATE WEIGHTS


// CREATE WALLS





createGrid();





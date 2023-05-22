const cells = []
let selectingStart = false;
let selectingFinish = false;
let selectingWall = false;
let startCell = null;
let finishCell = null;
let mouseDown = false;

// BUTTONS
let selectStart = document.getElementById('select-start').addEventListener('click', () => {
    selectingStart = true;
    selectingWall = false; // Disable wall selection
});

let selectFinish = document.getElementById('select-finish').addEventListener('click', () => {
    selectingFinish = true;
    selectingWall = false; // Disable wall selection
})

let selectWall = document.getElementById('select-wall').addEventListener('click', () => {
    selectingWall = !selectingWall;
})

let startTraversal = document
.getElementById('start-traversal')
.addEventListener('click', ()=> {
    selectingWall = false; // Disable wall selection
    if (startCell === null) {
        alert("Please set a Start Location")
    } else if (finishCell === null) {
        alert("Please set a Finish Location")
    } else {
        depthFirstSearch(cells, startCell, finishCell)
    }
});

let clearBoard = document.getElementById('clear-board').addEventListener('click', () => {
    selectingWall = false;
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
                visited: false,
                element: cellElement
            };

            // ONCLICK SET THE CELL TO THE START LOCATION
            cellElement.addEventListener('click', () => {
                if (selectingStart) {
                    removeStartLocation();
                    cell.isStart = true;
                    cellElement.style.backgroundColor = 'green';
                    selectingStart = false;
                    startCell = cell
                    console.log("START", cell)
                }
            })

            // ONCLICK SET THE CELL TO THE FINISH LOCATION
            cellElement.addEventListener('click', () => {
                if (selectingFinish) {
                    removeFinishLocation();
                    cell.isFinish = true;
                    cellElement.style.backgroundColor = 'red';
                    selectingFinish = false;
                    finishCell = cell
                    console.log("FINISH", cell)
                }
            })

            // ONCLICK SET THE CELL TO WALL
            cell

            cellElement.addEventListener('click', () => {
                if (selectingWall) {
                    cell.isWall = true;
                    cellElement.style.backgroundColor = 'black'
                }
            })

            cellElement.addEventListener('mousedown', () => {
                if (selectingWall) {
                    mouseDown = true;
                    cell.isWall = true;
                    cellElement.style.backgroundColor = 'black';
                }
            })

            cellElement.addEventListener('mouseenter', () => {
                if (selectingWall && mouseDown) {
                    cell.isWall = true;
                    cellElement.style.backgroundColor = 'black';
                }
            })

            cellElement.addEventListener('mouseup', () => {
                mouseDown = false;
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


// REMOVE VISITED STATUS
const removeVisitedStatus = () => {
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j].visited) {
                cells[i][j].visited = false;
            }
        }
    }
}


// RESET PATH
const resetPath = () => {
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            cells[i][j].element.style.backgroundColor = "antiquewhite";
        }
    }
}


// CLEAR THE BOARD
const clearTheBoard = () => {
    removeStartLocation();
    removeFinishLocation();
    removeVisitedStatus();
    removeAllWalls();
    resetPath();
}


// CREATE WEIGHTS


// CREATE WALLS


// SLEEPER FUNCTION
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}


// DEPTH FIRST SEARCH
const depthFirstSearch = async (grid, start, finish) => {
    let startLocation = [start.x, start.y]
    let finishLocation = [finish.x, finish.y]
    let stack = [[startLocation, [startLocation]]];
    let visited = new Set([start.toString()]);

    while (stack.length > 0) {
        let [vertex, path] = stack.pop();

        // If it's not the start or finish, color the cell and wait
        if ((vertex[0] !== startLocation[0] || vertex[1] !== startLocation[1]) &&
            (vertex[0] !== finishLocation[0] || vertex[1] !== finishLocation[1])) {
                grid[vertex[0]][vertex[1]].element.style.backgroundColor = 'coral';
                await sleep(10);
            }

        if (vertex[0] === finishLocation[0] && vertex[1] === finishLocation[1]) {
            console.log("PATH", path)
            return path
        }

        let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

        for (let dir of directions) {
            let nextVertex = [vertex[0] + dir[0], vertex[1] + dir[1]];

            if (
                nextVertex[0] >= 0 && nextVertex[0] < grid.length &&
                nextVertex[1] >= 0 && nextVertex[1] < grid[0].length &&
                !grid[nextVertex[0]][nextVertex[1]].isWall &&
                !visited.has(nextVertex.toString())
            ) {
                visited.add(nextVertex.toString());
                stack.push([nextVertex, [...path, nextVertex]])
            }
        }
    }
    console.log("NO PATH FOUND")
    return null
}

createGrid();
const cells = []
let selectingStart = false;
let selectingFinish = false;
let selectingWall = false;
let startCell = null;
let finishCell = null;
let mouseDown = false;

// COLOURS
const startColour = '#235ec4';
const finishColour = '#db2113';
const wallColour = 'black';
const cellColour = '#f7c6a8';
const pathColour = '#C38D9E';

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

let addWeights = document.getElementById('add-weights').addEventListener('click', () => {
    selectingWall = !selectingWall;
    randomizeWeights();
})

let startTraversal = document
.getElementById('start-traversal')
.addEventListener('click', async ()=> {
    // clearPath();
    selectingWall = false; // Disable wall selection
    let traversalMethod = document.getElementById('traversal-method').value;
    if (startCell === null) {
        alert("Please set a Start Location")
    } else if (finishCell === null) {
        alert("Please set a Finish Location")
    } else {
        let path = null;
        if (traversalMethod === 'depthFirstSearch') {
            path = await depthFirstSearch(cells, startCell, finishCell)
        } else if (traversalMethod === 'breadthFirstSearch') {
            path = await breadthFirstSearch(cells, startCell, finishCell)
        } else if (traversalMethod === 'dijkstra') {
            path = await dijkstrasAlgorithm(cells, startCell, finishCell)
        } else if (traversalMethod === 'aStar') {
            path = await aStarAlgorithm(cells, startCell, finishCell)
        } else {
            console.log("Invalid traversal method")
        }
        if (path) {
            await iterateOverPath(path)
        }
    }});

let clearBoard = document.getElementById('clear-board').addEventListener('click', () => {
    selectingWall = false;
    clearTheBoard();
})

let clearPath = document.getElementById('clear-path').addEventListener('click', () => {
    selectingWall = false;
    resetPath();
})

let clearWeights = document.getElementById('clear-weights').addEventListener('click', () => {
    selectingWall = false;
    removeAllWeights();
})


// CREATE THE GRID
const createGrid = () => {
    const grid = document.getElementById('grid')

    for (let i = 0; i < 40; i++) { // 46
        const row = []
        for (let j = 0; j < 40; j++) { // 71
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
                    cellElement.style.backgroundColor = startColour;
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
                    cellElement.style.backgroundColor = finishColour;
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
                    cellElement.style.backgroundColor = wallColour;
                }
            })

            cellElement.addEventListener('mousedown', () => {
                if (selectingWall) {
                    mouseDown = true;
                    cell.isWall = true;
                    cellElement.style.backgroundColor = wallColour;
                }
            })

            cellElement.addEventListener('mouseenter', () => {
                if (selectingWall && mouseDown) {
                    cell.isWall = true;
                    cellElement.style.backgroundColor = wallColour;
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
                cells[i][j].element.style.backgroundColor = cellColour;
            }
        }
    }
}


// RANDOMIZE WEIGHTS
const randomizeWeights = () => {
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            const randomWeight = Math.floor(Math.random() * 10);
            if (randomWeight <= 5) {
                cells[i][j].weight = randomWeight;
                if (cells[i][j].weight !== 0) {
                    cells[i][j].element.innerHTML = randomWeight;
                }   
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
                cells[i][j].element.innerHTML = '';
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
                cells[i][j].element.style.backgroundColor = cellColour;
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
            if (cells[i][j].isWall || cells[i][j].isStart || cells[i][j].isFinish) {
                continue;
            } else {
                cells[i][j].element.style.backgroundColor = cellColour;
            }
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
    removeAllWeights();
}


// CREATE WALLS


// SLEEPER FUNCTION
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}


// ITERATE OVER PATH
const iterateOverPath = async (path) => {
    if (path) {
        for (let i = 0; i < path.length; i++) {
            let location = path[i];
            if (cells[location[0]][location[1]].isStart || cells[location[0]][location[1]].isFinish) {
                continue;
            } else {
                cells[location[0]][location[1]].element.style.backgroundColor = 'aquamarine';
                await sleep(10);
            }
        }
    }
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
                grid[vertex[0]][vertex[1]].element.style.backgroundColor = pathColour;
                await sleep(5);
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


// BREADTH FIRST SEARCH
const breadthFirstSearch = async (grid, start, finish) => {
    let startLocation = [start.x, start.y]
    let finishLocation = [finish.x, finish.y]
    let queue = [[startLocation, [startLocation]]];
    let visited = new Set([start.toString()]);

    while (queue.length > 0) {
        let [vertex, path] = queue.shift();

        // If it's not the start or finish, color the cell and wait
        if ((vertex[0] !== startLocation[0] || vertex[1] !== startLocation[1]) &&
            (vertex[0] !== finishLocation[0] || vertex[1] !== finishLocation[1])) {
                grid[vertex[0]][vertex[1]].element.style.backgroundColor = pathColour;
                await sleep(5);
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
                queue.push([nextVertex, [...path, nextVertex]])
            }
        }
    }
    console.log("NO PATH FOUND")
    return null
}


// DIJKSTRA'S ALGORITHM
const dijkstrasAlgorithm = async (grid, start, finish) => {
    let startLocation = [start.x, start.y]
    let finishLocation = [finish.x, finish.y]
    let queue = [[startLocation, [startLocation], 0]];
    let visited = new Set([start.toString()]);

    while (queue.length > 0) {
        let [vertex, path, distance] = queue.shift();

        // If it's not the start or finish, color the cell and wait
        if ((vertex[0] !== startLocation[0] || vertex[1] !== startLocation[1]) &&
            (vertex[0] !== finishLocation[0] || vertex[1] !== finishLocation[1])) {
                grid[vertex[0]][vertex[1]].element.style.backgroundColor = pathColour;
                await sleep(5);
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
                let newDistance = distance + grid[nextVertex[0]][nextVertex[1]].weight;
                queue.push([nextVertex, [...path, nextVertex], newDistance]);
            }   
        }

        queue.sort((a, b) => a[2] - b[2]);
    }
    console.log("NO PATH FOUND")
    return null
}


// A* ALGORITHM
const aStarAlgorithm = async (grid, start, finish) => {
    let startLocation = [start.x, start.y]
    let finishLocation = [finish.x, finish.y]
    let queue = [[startLocation, [startLocation], 0]];
    let visited  = new Set([start.toString()]);

    while (queue.length > 0) {
        let [vertex, path, distance] = queue.shift();

        // If it's not the start or finish, color the cell and wait
        if ((vertex[0] !== startLocation[0] || vertex[1] !== startLocation[1]) &&
            (vertex[0] !== finishLocation[0] || vertex[1] !== finishLocation[1])) {
                grid[vertex[0]][vertex[1]].element.style.backgroundColor = pathColour;
                await sleep(5);
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
                let newDistance = distance + grid[nextVertex[0]][nextVertex[1]].weight;
                queue.push([nextVertex, [...path, nextVertex], newDistance + heuristic(nextVertex, finishLocation)]);
            }
        }

        queue.sort((a, b) => a[2] - b[2]);
    }
    console.log("NO PATH FOUND")
    return null
}

// HEURISTIC FUNCTION
const heuristic = (a, b) => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}


createGrid();
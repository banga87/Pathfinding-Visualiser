const createGrid = () => {
    const grid = document.getElementById('grid')

    for (let i = 0; i < 46; i++) {
        for (let j = 0; j < 71; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.position = `${i}-${j}`
            grid.appendChild(cell);
        }
    }
}

createGrid();

// const breadthFirstSearch = () => {
//     let visited = new Set();
//     let path = []

//     const bfs = (x, y) => {
//         if (x < 0 ||
//             x === xAxis ||
//             y < 0 ||
//             y === yAxis )
//     }

// }
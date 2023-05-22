const depthFirstSearch = (grid, start, finish) => {
    
  let path = grid.map(row => row.map(() => null))
  path[start.x][start.y] = start // Set start of path to point to itself.

  const dfs = (x, y) => {

      console.log("Current Cell", grid[x][y])

      // BASE CASE
      if (
          x < 0 ||
          x >= grid.length ||
          y < 0 || 
          y >= grid[x].length ||
          grid[x][y].visited ||
          grid[x][y].isWall ||
          path[x][y] !== null
      ) {
          return false
      }

      grid[x][y].visited = true;
      path[x][y] = grid[x][y]

      if (x === finish.x && y === finish.y) {
          return true
      }

     // CHECK UP
  if (x - 1 >= 0 && path[x - 1][y] === null && dfs(x - 1, y)) return true;

  // CHECK DOWN
  if (x + 1 < grid.length && path[x + 1][y] === null && dfs(x + 1, y)) return true;

  // CHECK LEFT
  if (y - 1 >= 0 && path[x][y - 1] === null && dfs(x, y - 1)) return true;

  // CHECK RIGHT
  if (y + 1 < grid[0].length && path[x][y + 1] === null && dfs(x, y + 1)) return true;

  return false
 
  }

  const getPath = (start, finish) => {
      let track = []
      let x = finish.x;
      let y = finish.y;
      
      while (path[x][y] !== start) {
          track.push([x, y])
          [x, y] = path[x][y]
      }

      return track.reverse();
  }

  dfs(start.x, start.y)
  if (finish !== null) {
      console.log(getPath(start, finish))
      return getPath(start, finish)
  } else {
      console.log("Path not found.")
  }
}
# Pathfinding-Visualiser
This project is a pure HTML, CSS and JavaScript build.
The user can choose a start location, end location and select a pathfinding algorithm to find a path from start to finish on a grid.
The grid is built using a loop the creates a DIV and stores information within each cell DIV. The algorithm checks each DIV as it iterates over them and makes decisions based on the contents.

The algorithms used are:
- Depth-First Search
- Breadth-First Search
- Dijkstra's
- A*
  
The users can also add walls that are impassable by the algorithm as well as weights that are used to help Dijkstra's and A* make decisions.

## Possible Improvements
- Move algorithms into a separate file.
- Add listener to change cell background colour based on isWall vs isFinish etc instead of handling in each separate event listener.
- Separate the creation of the grid and functions of program into separate files.
- Create a dynamically sized grid based on screen size rather than a fixed size grid.
- Mobile optimisations.
- Change colour of selection buttons when they are currently active so user knows which they're using.
- Prompts that teach user how to use the app.
- Fix naming convention to be more consistent. eg. Remove vs Clear do very similar tasks. Be consistent.

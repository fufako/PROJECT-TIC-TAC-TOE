const makeBoard = (() => {
  const board = document.getElementById("gameboard")
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let gridItem = document.createElement("div")
      gridItem.dataset.row = i
      gridItem.dataset.column = j
      gridItem.innerHTML = "row: " + i + ", column: " + j
      board.appendChild(gridItem)
    }
  }
})()

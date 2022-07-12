const makeBoard = (() => {
  const board = document.getElementById("gameboard")
  for (let i = 1; i < 10; i++) {
    let gridItem = document.createElement("div")
    gridItem.dataset.index = i
    gridItem.innerHTML = i
    board.appendChild(gridItem)
  }
})()

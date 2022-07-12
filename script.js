const makeBoard = (() => {
  const board = document.getElementById("gameboard")
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let gridItem = document.createElement("div")
      gridItem.dataset.row = i
      gridItem.dataset.column = j
      gridItem.className = "field"
      gridItem.innerHTML = "row: " + i + ", column: " + j
      board.appendChild(gridItem)
    }
  }
})()

const gameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]

  const setBoardField = (field, sign) => {
    board[field.dataset.row][field.dataset.column] = sign
    field.textContent = sign
  }

  return { setBoardField }
})()

const displayController = (() => {
  const fields = document.querySelectorAll(".field")
  fields.forEach((field) =>
    field.addEventListener("click", (e) => {
      if (gameStatus.isOver() || e.target.textContent === "") {
        return
      }
      gameBoard.setBoardField(field, "X")
    })
  )
})()

const gameStatus = (() => {
  const isOver = () => {
    return false
  }

  return { isOver }
})()

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

const Player = (sign) => {
  this.sign = sign
  const getSign = () => {
    return sign
  }

  return { getSign }
}

const gameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]

  const setBoardField = (field, sign) => {
    board[field.dataset.row][field.dataset.column] = sign
    field.textContent = sign
    console.log(board)
  }
  const resetBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = ""
      }
    }
  }

  return { setBoardField, resetBoard }
})()

const displayController = (() => {
  const fields = document.querySelectorAll(".field")
  const resetBtn = document.getElementById("reset")
  fields.forEach((field) =>
    field.addEventListener("click", (e) => {
      if (gameStatus.isOver() || e.target.textContent === "") {
        return
      }
      gameStatus.playRound(field)
    })
  )
  resetBtn.addEventListener("click", (e) => {
    gameBoard.resetBoard()
  })
})()

const gameStatus = (() => {
  const playerX = Player("X")
  const playerO = Player("O")
  let move = 1

  const playRound = (field) => {
    gameBoard.setBoardField(field, getCurrentPlayer())
    move += 1
  }
  const getCurrentPlayer = () => {
    return move % 2 === 1 ? playerX.getSign() : playerO.getSign()
  }
  const isOver = () => {
    return false
  }

  return { isOver, playRound }
})()

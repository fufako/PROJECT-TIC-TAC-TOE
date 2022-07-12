const setupBoard = (() => {
  const board = document.getElementById("gameboard")

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let gridItem = document.createElement("div")
      gridItem.dataset.row = i
      gridItem.dataset.column = j
      gridItem.className = "field"
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
  const message = document.getElementById("message")
  message.textContent = "Player X's turn"
  fields.forEach((field) =>
    field.addEventListener("click", (e) => {
      if (gamePlay.getIsOver() || e.target.textContent !== "") {
        return
      } else {
        gamePlay.playRound(field)
      }
    })
  )
  resetBtn.addEventListener("click", (e) => {
    gameBoard.resetBoard()
    gamePlay.reset()
    resetDisplay()
    setMessage("Player X's turn")
  })

  const resetDisplay = () => {
    fields.forEach((field) => {
      field.textContent = ""
    })
  }

  const setMessage = (messageContent) => {
    message.textContent = messageContent
  }
  return { setMessage }
})()

const gamePlay = (() => {
  const playerX = Player("X")
  const playerO = Player("O")
  let isOver = false
  let move = 1

  const playRound = (field) => {
    gameBoard.setBoardField(field, getCurrentPlayer())
    move += 1
    displayController.setMessage("Player " + getCurrentPlayer() + "'s turn")
    if (move > 9) {
      isOver = true
    }
    if (move === 10) {
      displayController.setMessage("Draw")
    }
  }
  const getCurrentPlayer = () => {
    return move % 2 === 1 ? playerX.getSign() : playerO.getSign()
  }
  const getIsOver = () => {
    return isOver
  }
  const reset = () => {
    move = 1
    isOver = false
  }

  return { getIsOver, playRound, reset }
})()

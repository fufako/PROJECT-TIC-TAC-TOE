const setupBoard = (() => {
  const board = document.getElementById("gameboard")

  for (let i = 0; i < 9; i++) {
    let gridItem = document.createElement("div")
    gridItem.dataset.index = i
    gridItem.className = "field"
    board.appendChild(gridItem)
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
  const board = ["", "", "", "", "", "", "", "", ""]

  const setBoardField = (field, sign) => {
    board[field.dataset.index] = sign
    field.textContent = sign
  }
  const resetBoard = () => {
    for (let i = 0; i < 9; i++) {
      board[i] = ""
    }
  }

  const getBoard = () => {
    return board
  }

  return { setBoardField, resetBoard, getBoard, board }
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
    if (isWinner(gameBoard.getBoard(), getCurrentPlayer())) {
      isOver = true
      displayController.setMessage("Player " + getCurrentPlayer() + "'s WON!")
      return
    }
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

  const isWinner = (board, sign) =>
    (board[0] === sign && board[1] === sign && board[2] === sign) ||
    (board[3] === sign && board[4] === sign && board[5] === sign) ||
    (board[6] === sign && board[7] === sign && board[8] === sign) ||
    (board[0] === sign && board[3] === sign && board[6] === sign) ||
    (board[1] === sign && board[4] === sign && board[7] === sign) ||
    (board[2] === sign && board[5] === sign && board[8] === sign) ||
    (board[0] === sign && board[4] === sign && board[8] === sign) ||
    (board[2] === sign && board[4] === sign && board[6] === sign)

  return { getIsOver, playRound, reset }
})()

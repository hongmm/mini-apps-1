function ticTacToe() {
  var turnCount = 0;
  var hasWinner = false;
  var winner;

  setPiece = function(event) {
    event.preventDefault();

    if (hasWinner) {
      return;
    }

    if (event.target.innerHTML === 'X' || event.target.innerHTML === 'O') {
      console.log('Already marked')
    } else {
      turnCount++;
      if (turnCount % 2 === 1) {
        event.target.innerHTML = 'X';
      } else {
        event.target.innerHTML = 'O';
      }
      // console.log(event.target.id);
      // console.log(event);
    }
    checkStatus(event.target.id);
  }

  currentBoardState = function() {
    var boardElements = Array.prototype.slice.call(document.getElementsByClassName('grid-item'));
    //console.log(boardElements);
    var board = [[],[],[]];

    for (var i = 0; i < boardElements.length; i++) {
      var row = Math.floor(i/3);
      var col = i % 3;
      board[row][col] = boardElements[i].innerHTML;
    }

    return board;
  }

  checkStatus = function(id) {
    var currentBoard = currentBoardState();
    var rowIndex = Math.floor(Number(id - 1) / 3);
    var colIndex = Number(id - 1) % 3;
    if (checkIfTicTacToe(currentBoard, rowIndex, colIndex)) {
      hasWinner = true;
      winner = (turnCount % 2 === 1) ? 'X' : 'O'
      toggleWinner(winner);
      console.log('Tic Tac Toe!')
    } else {
      console.log('Turn: ' + turnCount);
      if (turnCount === 9) {
        console.log('TIE GAME')
        var winnerElement = document.getElementById('winner');
        winnerElement.innerHTML = 'TIE GAME'
      }
    }
  }

  checkIfTicTacToe = function(board, rowIndex, colIndex) {
    console.log('horizontal: ' + checkHorizontal(board, rowIndex));
    console.log('vertical: ' + checkVertical(board, colIndex));
    console.log('diagonal: ' + checkDiagonal(board));
    if (checkVertical(board, colIndex) || checkHorizontal(board, rowIndex) || checkDiagonal(board)) {
      return true;
    }

    return false;
  }

  checkHorizontal = function(board, rowIndex) {
    // if any of the columns has all X or all O
    var firstValInRow = board[rowIndex][0];
    for (var col = 0; col < board[rowIndex].length; col++) {
      if (board[rowIndex][col] === '') {
        return false;
      }
      if (firstValInRow !== board[rowIndex][col]) {
        return false;
      }
    }

    return true;
  }

  checkVertical = function(board, colIndex) {
    // if any of the columns has all X or all O
    var firstValInCol = board[0][colIndex];
    for (var row = 0; row < board[0].length; row++) {
      if (board[row][colIndex] === '') {
        return false;
      }
      if (firstValInCol !== board[row][colIndex]) {
        return false;
      }
    }

    return true;
  }

  checkDiagonal = function(board) {
    if (checkMajorDiagonal(board) || checkMinorDiagonal(board)) {
      return true;
    }
    return false;
  }

  checkMajorDiagonal = function(board) {
    var firstVal = board[0][0];
    for (var i = 0; i < board.length; i++) {
      if (board[i][i] === '') {
        return false;
      }
      if (firstVal !== board[i][i]) {
        return false;
      }
    }
    return true;
  }

  checkMinorDiagonal = function(board) {
    var firstVal = board[0][board.length - 1];
    for (var i = 0; i < board.length; i++) {
      if (board[i][board.length - 1 - i] === '') {
        return false;
      }
      if (firstVal !== board[i][board.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }

  resetBoard = function() {
    turnCount = 0;
    hasWinner = false;
    winner = undefined;

    var boardElements = document.getElementsByClassName('grid-item');
    Array.prototype.forEach.call(boardElements, function(element) {
      element.innerHTML = '';
    })

    var winnerElement = document.getElementById('winner');
    winnerElement.innerHTML = '';
    winnerElement.style.display = 'none';
  }
}

toggleWinner = function(win) {
  var winnerElement = document.getElementById('winner');
  if (win) {
    console.log('winner:' + win);
    winnerElement.style.display = 'block';
    if (win === 'X') {
      winnerElement.innerHTML = 'WINNER: X';
    }
    if (win === 'O') {
      winnerElement.innerHTML = 'WINNER: O';
    }
  } else {
    winnerElement.style.display = 'none';
  }
}

// onClickEvent = function(evt) {
//   console.log(evt.target.innerHTML);
//   turnCount++;
//   console.log(turnCount)

//   // on clicking, change to O or X depding on turn
//   // then check state of board, if there is a win, kill the event listeners and display winner name
// }

ticTacToe()
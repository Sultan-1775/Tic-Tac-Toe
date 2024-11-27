const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const gameOverMessage = document.getElementById('game-over');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            highlightWinningCells(a, b, c);
            setTimeout(() => {
                gameOverMessage.textContent = `${gameBoard[a]} победил! GAME OVER`;
                gameOverMessage.style.display = 'block';
            }, 200);
            isGameOver = true;
            return true;
        }
    }
    if (gameBoard.every(cell => cell)) {
        setTimeout(() => {
            gameOverMessage.textContent = 'Ничья! GAME OVER';
            gameOverMessage.style.display = 'block';
        }, 200);
        isGameOver = true;
    }
    return false;
}

function highlightWinningCells(a, b, c) {
    cells[a].style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
    cells[b].style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
    cells[c].style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
}

function handleClick(event) {
    if (isGameOver) return;

    const cellIndex = event.target.dataset.index;
    
    if (gameBoard[cellIndex]) return; // Skip if cell is already filled
    
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (!checkWinner()) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '';
    });
    currentPlayer = 'X';
    gameOverMessage.style.display = 'none';
    isGameOver = false;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

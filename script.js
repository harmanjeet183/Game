document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById('game-board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');

    let currentPlayer = 'X';
    let gameBoard = Array(9).fill(null);

    function createBoard() {
        board.innerHTML = '';
        gameBoard.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.className = 'cell w-20 h-20 bg-gray-300 flex items-center justify-center text-2xl font-bold';
            cell.dataset.index = index;
            cell.textContent = value;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        });
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (gameBoard[index] || checkWinner()) return;

        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            status.textContent = `Player ${currentPlayer} Wins!`;
        } else if (gameBoard.every(cell => cell)) {
            status.textContent = 'It\'s a Tie!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }
        return false;
    }

    function resetGame() {
        gameBoard = Array(9).fill(null);
        currentPlayer = 'X';
        status.textContent = `Player ${currentPlayer}'s Turn`;
        createBoard();
    }

    resetButton.addEventListener('click', resetGame);

    // Initialize the board
    createBoard();
    resetGame();
});

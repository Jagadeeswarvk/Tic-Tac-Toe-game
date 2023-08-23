const cells = document.querySelectorAll(".cell");
const statusText=document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let answer = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
startGame();
function startGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (answer[cellIndex] != "" || !running) return;
    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index) {
    answer[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    statusText.textContent=`${currentPlayer}'s turn`
}
function checkWinner() {
    let result = false;
    for (let i = 0; i < win.length; i++) {
        const box = win[i];
        const boxA = answer[box[0]];
        const boxB = answer[box[1]];
        const boxC = answer[box[2]];
        if (boxA == "" || boxB == "" || boxC == "") continue;
        if (boxA == boxB && boxB == boxC) {
            result = true;
            break;
        }
    }
    if (result) {
        statusText.textContent = `${currentPlayer} wins!`;
        running= false;
    }
    else if (!answer.includes("")) {
        statusText.textContent = ` Draw! `;
        running = false;
    }
    else changePlayer();
}
function restartGame() {
    currentPlayer = "X";
    answer = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}


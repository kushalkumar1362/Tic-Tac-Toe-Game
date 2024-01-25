const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameButton = document.querySelector(".newGame");
const resetGameButton = document.querySelector(".resetGame");

let currentPlayer;
let gameGrid;

// All possible combinations for winning
const winningPostions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Start The Game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box-${index + 1}`;
    });
    newGameButton.classList.remove("active");
    resetGameButton.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

initGame();

function checkGameOver() {
    let answer = "";
    winningPostions.forEach((position) => {
        if (
            (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])
        ) {

            if(gameGrid[position[0]] === "X") {
                answer = "X";
            } else {
                answer = "O";
            }

            // Disable Pointer event after getting a winner
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        resetGameButton.classList.remove("active");
        newGameButton.classList.add("active");
        return;
    }

    //Check Game is Tied or not!
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "") {
            fillCount++;
        }
    });

    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        resetGameButton.classList.remove("active");
        newGameButton.classList.add("active");
    }

}

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        resetGameButton.classList.add("active");
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameButton.addEventListener("click", initGame);
resetGameButton.addEventListener("click", initGame);

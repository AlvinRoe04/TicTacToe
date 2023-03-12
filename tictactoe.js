const upper = 0;
const mid = 1;
const lower = 2;
const left = 0;
const right = 2;
const empty = 0;
const x = 1;
const o = 2;


const gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

//Returns boolean if any of the winning conditions are fulfilled.
function hasWinner() {
    return (gameBoard[upper][left] !== 0 && 
        (((gameBoard[upper][left] === gameBoard[upper][mid] && gameBoard[upper][mid] === gameBoard[upper][right]) 
        || (gameBoard[upper][left] === gameBoard[mid][left] && gameBoard[mid][left] === gameBoard[lower][left]))
        || (gameBoard[upper][left] === gameBoard[mid][mid] && gameBoard[mid][mid] === gameBoard[lower][right])))
        || (gameBoard[mid][left] != 0 && (gameBoard[mid][left] === gameBoard[mid][mid] && gameBoard[mid][mid] === gameBoard[mid][right]))
        || (gameBoard[lower][left] !== 0 && ((gameBoard[lower][left] === gameBoard[lower][mid] && gameBoard[lower][mid] === gameBoard[lower][right])
        || (gameBoard[lower][left] === gameBoard[mid][mid] && gameBoard[mid][mid] === gameBoard[upper][right])))
        || (gameBoard[upper][mid] !== 0 && gameBoard[upper][mid] === gameBoard[mid][mid] && gameBoard[mid][mid] === gameBoard[lower][mid])
        || (gameBoard[upper][right] !== 0 && gameBoard[upper][right] === gameBoard[mid][right] && gameBoard[mid][right] === gameBoard[lower][right]);
}



const playerFactory = (placement, name, number) => { return {name, placement, number};};
const playerOne = playerFactory('X', 'Player One', 1);
const playerTwo = playerFactory('O', 'Player Two', 2);

const gameManager = (() => {
    let isPlayerOneTurn = true;
    let gameOver = false;
    const getActivePlayer = () => isPlayerOneTurn ? playerOne : playerTwo;
    const getActiveSymbol = () => isPlayerOneTurn ? playerOne.placement : playerTwo.placement;
    const switchPlayerTurn = () => isPlayerOneTurn = !isPlayerOneTurn; 
    const getPlayerNumber = () => isPlayerOneTurn ? playerOne.number : playerTwo.number;
    const setGameOver = (isGameOver) => gameOver = isGameOver; 
    const isGameOver = () => gameOver;

    return {getActivePlayer, getActiveSymbol, switchPlayerTurn, getPlayerNumber, setGameOver, isGameOver};
})(); 

const gameBoard = (() => {
    let row = -1;
    let column = -1;
    let openSlots = 9;
    const rowReference = {
        upper: 0,
        mid: 1,
        lower: 2
    }
    const columnReference = {
        left: 0,
        center: 1,
        right: 2
    }    
    const board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    const chooseRow = (rowNumber) => row = rowNumber;
    const chooseColumn = (columnNumber) => column = columnNumber;
    const get = (row, column) => board[row][column];
    const reset = () => {
        const gameBoardHTML = document.querySelectorAll('.gameSpace');
        for(let row = 0; row < 3; row++){
            for(let column = 0; column < 3; column++){
                board[row][column] = empty;
            }
        }
        gameBoardHTML.forEach(space => space.innerHTML = '');
        openSlot = 9;
    }
    const setSpace = (row, column) => {

    }
    const isOutOfSpace = () => openSlots <= 0;

    const hasWinner = () => {
        return (board[rowReference.upper][columnReference.left] !== 0 && 
            (((board[rowReference.upper][columnReference.left] === board[rowReference.upper][columnReference.mid] && board[rowReference.upper][columnReference.mid] === board[rowReference.upper][columnReference.right]) 
            || (board[rowReference.upper][columnReference.left] === board[rowReference.mid][columnReference.left] && board[rowReference.mid][columnReference.left] === board[rowReference.lower][columnReference.left]))
            || (board[rowReference.upper][columnReference.left] === board[rowReference.mid][columnReference.mid] && board[rowReference.mid][columnReference.mid] === board[rowReference.lower][columnReference.right])))
            || (board[rowReference.mid][columnReference.left] != 0 && (board[rowReference.mid][columnReference.left] === board[rowReference.mid][columnReference.mid] && board[rowReference.mid][columnReference.mid] === board[rowReference.mid][columnReference.right]))
            || (board[rowReference.lower][columnReference.left] !== 0 && ((board[rowReference.lower][columnReference.left] === board[rowReference.lower][columnReference.mid] && board[rowReference.lower][columnReference.mid] === board[rowReference.lower][columnReference.right])
            || (board[rowReference.lower][columnReference.left] === board[rowReference.mid][columnReference.mid] && board[rowReference.mid][columnReference.mid] === board[rowReference.upper][columnReference.right])))
            || (board[rowReference.upper][columnReference.mid] !== 0 && board[rowReference.upper][columnReference.mid] === board[rowReference.mid][columnReference.mid] && board[rowReference.mid][columnReference.mid] === board[rowReference.lower][columnReference.mid])
            || (board[rowReference.upper][columnReference.right] !== 0 && board[rowReference.upper][columnReference.right] === board[rowReference.mid][columnReference.right] && board[rowReference.mid][columnReference.right] === board[rowReference.lower][columnReference.right]);
    }

    return {chooseRow, chooseColumn, get, reset, setSpace, isOutOfSpace, hasWinner, rowReference, columnReference};
})();

const columnStrings = {
    0: 'left',
    1: 'mid',
    2: 'right'
};

const rowStrings = {
    0: 'upper',
    1: 'center',
    2: 'lower'
};

const upperSpaces = document.querySelectorAll('.gameSpace.upper');
const centerSpaces = document.querySelectorAll('.gameSpace.center');
const lowerSpaces = document.querySelectorAll('.gameSpace.lower');
const leftSpaces = document.querySelectorAll('.gameSpace.left');
const midSpaces = document.querySelectorAll('.gameSpace.mid');
const rightSpaces = document.querySelectorAll('.gameSpace.right');


let rowPicked = -1;
let columnPicked = -1; 

upperSpaces.forEach(space => space.addEventListener('click', e => rowPicked = upper));
centerSpaces.forEach(space => space.addEventListener('click', e => rowPicked = mid));
lowerSpaces.forEach(space => space.addEventListener('click', e => rowPicked = lower));
leftSpaces.forEach(space => space.addEventListener('click', e => onColumnPicked(left, gameManager.getPlayerNumber())));
midSpaces.forEach(space => space.addEventListener('click', e => onColumnPicked(mid, gameManager.getPlayerNumber())));
rightSpaces.forEach(space => space.addEventListener('click', e => onColumnPicked(right, gameManager.getPlayerNumber())));


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

function onColumnPicked(columnNumber, placement){
    if(gameManager.isGameOver()) {
        resetGame();
        return;
    }
    
    columnPicked = columnNumber;

    if(gameBoard[rowPicked][columnPicked] !== empty) return;

    const queryString = `.gameSpace.${rowStrings[rowPicked]}.${columnStrings[columnPicked]}`;
    const elementPicked = document.querySelector(queryString);

    gameBoard[rowPicked][columnPicked] = placement;
    elementPicked.innerHTML = gameManager.getActiveSymbol();
    gameManager.switchPlayerTurn();
    if(hasWinner()){
        gameManager.setGameOver(true);
    }    
}

function resetGame() {
    const gameBoardHTML = document.querySelectorAll('.gameSpace');

    for(let row = 0; row < 3; row++){
        for(let column = 0; column < 3; column++){
            gameBoard[row][column] = empty;
        }
    }

    gameBoardHTML.forEach(space => space.innerHTML = '');
    gameManager.setGameOver(false);
    gameManager.resetOpenSlotCount();
}




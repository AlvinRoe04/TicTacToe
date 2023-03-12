const playerFactory = (placement, name, number) => { return {name, placement, number};};
const playerOne = playerFactory('X', 'Player One', 1);
const playerTwo = playerFactory('O', 'Player Two', 2);

const gameManager = (() => {
    let isPlayerOneTurn = true;
    let openSlots = 9;
    const getActivePlayer = () => isPlayerOneTurn ? playerOne : playerTwo;
    const getActiveSymbol = () => isPlayerOneTurn ? playerOne.placement : playerTwo.placement;
    const switchPlayerTurn = () => isPlayerOneTurn = !isPlayerOneTurn; 
    const getPlayerNumber = () => isPlayerOneTurn ? playerOne.number : playerTwo.number;
    const onSpacePicked = (element) => {
        
    };

    return {getActivePlayer, getActiveSymbol, switchPlayerTurn, getPlayerNumber};
})();  

const upper = 0;
const mid = 1;
const lower = 2;
const left = 0;
const right = 2;
const empty = 0;

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

const gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

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
    columnPicked = columnNumber;
    if(gameBoard[rowPicked][columnPicked] !== empty) return;

    const queryString = `.gameSpace.${rowStrings[rowPicked]}.${columnStrings[columnPicked]}`;
    const elementPicked = document.querySelector(queryString);

    gameBoard[rowPicked][columnPicked] = placement;
    elementPicked.innerHTML = gameManager.getActiveSymbol();
    gameManager.switchPlayerTurn();
    console.log(hasWinner());
}




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
    let openSlots = 9;
    const empty = 0;
    const rows = {
        upper: 0,
        center: 1,
        lower: 2
    }
    const columns = {
        left: 0,
        mid: 1,
        right: 2
    }
    const rowStrings = {
        0: 'upper',
        1: 'center',
        2: 'lower'
    }
    const columnStrings = {
        0: 'left',
        1: 'mid',
        2: 'right' 
    }    
    const board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    const chooseRow = (rowNumber) => row = rowNumber;
    const reset = () => {
        const gameBoardHTML = document.querySelectorAll('.gameSpace');
        for(let row = 0; row < 3; row++){
            for(let column = 0; column < 3; column++){
                board[row][column] = empty;
            }
        }
        gameBoardHTML.forEach(space => space.innerHTML = '');
        openSlot = 9;
        gameManager.setGameOver(false);
    }
    const isOutOfSpace = () => openSlots <= 0;

    const hasWinner = () => {        
        return (board[rows.upper][columns.left] !== 0 && 
            (((board[rows.upper][columns.left] === board[rows.upper][columns.mid] && board[rows.upper][columns.mid] === board[rows.upper][columns.right]) 
            || (board[rows.upper][columns.left] === board[rows.center][columns.left] && board[rows.center][columns.left] === board[rows.lower][columns.left]))
            || (board[rows.upper][columns.left] === board[rows.center][columns.mid] && board[rows.center][columns.mid] === board[rows.lower][columns.right])))
            || (board[rows.center][columns.left] != 0 && (board[rows.center][columns.left] === board[rows.center][columns.mid] && board[rows.center][columns.mid] === board[rows.center][columns.right]))
            || (board[rows.lower][columns.left] !== 0 && ((board[rows.lower][columns.left] === board[rows.lower][columns.mid] && board[rows.lower][columns.mid] === board[rows.lower][columns.right])
            || (board[rows.lower][columns.left] === board[rows.center][columns.mid] && board[rows.center][columns.mid] === board[rows.upper][columns.right])))
            || (board[rows.upper][columns.mid] !== 0 && board[rows.upper][columns.mid] === board[rows.center][columns.mid] && board[rows.center][columns.mid] === board[rows.lower][columns.mid])
            || (board[rows.upper][columns.right] !== 0 && board[rows.upper][columns.right] === board[rows.center][columns.right] && board[rows.center][columns.right] === board[rows.lower][columns.right]);
            
    }

    const onColumnPicked = (column) => {
        if(gameManager.isGameOver()) {
            reset();
            return;
        }
        
        console.log('Row: ' + row);
        console.log(`Column: ${column}`);

        if(board[row][column] !== empty) return;

        const queryString = `.gameSpace.${rowStrings[row]}.${columnStrings[column]}`;
        const elementPicked = document.querySelector(queryString);
        
        board[row][column] = gameManager.getPlayerNumber();
        elementPicked.innerHTML = gameManager.getActiveSymbol();
        gameManager.switchPlayerTurn();
        if(gameBoard.hasWinner()) {
            gameManager.setGameOver(true);
            console.log('Game had winner');
        }
    }

    return {chooseRow, onColumnPicked, isOutOfSpace, hasWinner, rows, columns, board};
})();

const upperSpaces = document.querySelectorAll('.gameSpace.upper');
const centerSpaces = document.querySelectorAll('.gameSpace.center');
const lowerSpaces = document.querySelectorAll('.gameSpace.lower');
const leftSpaces = document.querySelectorAll('.gameSpace.left');
const midSpaces = document.querySelectorAll('.gameSpace.mid');
const rightSpaces = document.querySelectorAll('.gameSpace.right');

upperSpaces.forEach(space => space.addEventListener('click', e => gameBoard.chooseRow(gameBoard.rows.upper)));
centerSpaces.forEach(space => space.addEventListener('click', e => gameBoard.chooseRow(gameBoard.rows.center)));
lowerSpaces.forEach(space => space.addEventListener('click', e => gameBoard.chooseRow(gameBoard.rows.lower)));
leftSpaces.forEach(space => space.addEventListener('click', e => gameBoard.onColumnPicked(gameBoard.columns.left)));
midSpaces.forEach(space => space.addEventListener('click', e => gameBoard.onColumnPicked(gameBoard.columns.mid)));
rightSpaces.forEach(space => space.addEventListener('click', e => gameBoard.onColumnPicked(gameBoard.columns.right)));




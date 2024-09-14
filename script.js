const game_info = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const new_game_btn = document.querySelector('.btn');


let currentPlayer; // shows current player turn
let checked_boxes; // to store the checked boxes positions
let checked_cnt; // to count the checked boxes

const winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


boxes.forEach((box, idx) => {
    // console.log(box, idx);
    box.addEventListener('click', () => checkBox(box, idx));
});

function checkBox(box, idx) {
    if(checked_boxes[idx] == '') {
        box.textContent = currentPlayer;
        checked_boxes[idx] = currentPlayer;
        checked_cnt++;
        box.style.pointerEvents = 'none';

        if(currentPlayer == 'X')    currentPlayer = 'O';
        else    currentPlayer = 'X';
        game_info.textContent = `Player ${currentPlayer} Turn`;
        
        checkGameStatus();
    }
}

function checkGameStatus() {
    winPositions.forEach((posi) => {
        if((checked_boxes[posi[0]] != '' && checked_boxes[posi[0]] != '' && checked_boxes[posi[0]] != '') && (checked_boxes[posi[0]] === checked_boxes[posi[1]] && checked_boxes[posi[1]] === checked_boxes[posi[2]]))
            gameOver(checked_boxes[posi[0]], posi);
    });

    if(checked_cnt == 9)    gameOver('Tied');
};

function gameOver(status, winBoxes) {
    console.log('status');
    if(status == 'Tied')    game_info.textContent = 'Game Tied';
    else {
        game_info.textContent = `Player ${status} won`;
        winBoxes.forEach((idx) => boxes[idx].classList.add('win'));
    }    

    new_game_btn.classList.add('active');
    boxes.forEach((box) => box.style.pointerEvents = 'none');
}

new_game_btn.addEventListener('click', startGame);

function startGame() {
    currentPlayer = 'X';
    game_info.textContent = `Player ${currentPlayer} Turn`;
    checked_boxes = ['', '', '', '', '', '', '', '', ''];
    boxes.forEach((box) => {
        box.textContent = '';
        box.style.pointerEvents = 'all';
        box.classList.remove('win');
});
    checked_cnt = 0;
    new_game_btn.classList.remove('active');
}

startGame();
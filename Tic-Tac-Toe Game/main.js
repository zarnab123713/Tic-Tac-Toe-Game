// const cells = document.querySelectorAll(".cell");
// const statusText = document.getElementById("status");
// const scoreX = document.getElementById("scoreX");
// const scoreO = document.getElementById("scoreO");
// const clickSound = document.getElementById("clickSound");
// const winSound = document.getElementById("winSound");

// let board = ["","","","","","","","",""];
// let currentPlayer = "X";
// let gameActive = true;
// let mode = "pvp";
// let scores = {X:0, O:0};

// const winPatterns = [
//  [0,1,2],[3,4,5],[6,7,8],
//  [0,3,6],[1,4,7],[2,5,8],
//  [0,4,8],[2,4,6]
// ];

// cells.forEach((cell, index)=>{
//     cell.addEventListener("click", ()=> handleClick(index));
// });

// function setMode(m){
//     mode = m;
//     resetGame();
// }

// function handleClick(index){
//     if(board[index] !== "" || !gameActive) return;

//     makeMove(index, currentPlayer);

//     if(checkResult()) return;

//     if(mode === "ai"){
//         setTimeout(computerMove, 400);
//     }
// }

// function makeMove(index, player){
//     board[index] = player;
//     cells[index].innerText = player;
//     clickSound.play();
// }

// function computerMove(){
//     if(!gameActive) return;

//     let empty = board.map((v,i)=> v===""? i:null).filter(v=>v!==null);
//     let move = empty[Math.floor(Math.random()*empty.length)];
//     makeMove(move, "O");
//     checkResult();
// }

// function checkResult(){
//     let winCombo = getWin();
//     if(winCombo){
//         winCombo.forEach(i=> cells[i].classList.add("win"));
//         winSound.play();

//         statusText.innerText = `${currentPlayer} wins!`;
//         scores[currentPlayer]++;
//         updateScore();
//         gameActive = false;
//         return true;
//     }

//     if(board.every(c=>c!=="")){
//         statusText.innerText = "Draw!";
//         gameActive = false;
//         return true;
//     }

//     currentPlayer = currentPlayer === "X" ? "O" : "X";
//     statusText.innerText = `Turn: ${currentPlayer}`;
//     return false;
// }

// function getWin(){
//     for(let p of winPatterns){
//         if(p.every(i=> board[i] === currentPlayer)) return p;
//     }
//     return null;
// }

// function updateScore(){
//     scoreX.innerText = scores.X;
//     scoreO.innerText = scores.O;
// }

// function resetGame(){
//     board = ["","","","","","","","",""];
//     cells.forEach(c=>{
//         c.innerText="";
//         c.classList.remove("win");
//     });
//     currentPlayer="X";
//     gameActive=true;
//     statusText.innerText="Player X's turn";
// }
document.body.addEventListener("click", () => {
    clickSound.play().catch(()=>{});
    clickSound.pause();
    clickSound.currentTime = 0;
}, { once: true });



const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = true;
let mode = "pvp";

let scores = {
    X: 0,
    O: 0
};

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(index));
});

function setMode(m){
    mode = m;
    resetGame();
}

function handleClick(index){
    if(board[index] !== "" || !gameActive) return;

    makeMove(index, currentPlayer);

    if(checkResult()) return;

    if(mode === "ai"){
        setTimeout(computerMove, 400);
    }
}

function makeMove(index, player){
    board[index] = player;
    cells[index].innerText = player;

    clickSound.currentTime = 0;
    clickSound.play().catch(()=>{});
}

function computerMove(){
    if(!gameActive) return;

    let empty = board
        .map((v,i) => v === "" ? i : null)
        .filter(v => v !== null);

    if(empty.length === 0) return;

    let move = empty[Math.floor(Math.random() * empty.length)];
    makeMove(move, "O");
    checkResult();
}

function checkResult(){
    let winCombo = getWin();

    if(winCombo){
        winCombo.forEach(i => cells[i].classList.add("win"));

        winSound.currentTime = 0;
        winSound.play().catch(()=>{});

        statusText.innerText = `${currentPlayer} wins!`;

        scores[currentPlayer]++;
        updateScore();

        gameActive = false;
        return true;
    }

    if(board.every(cell => cell !== "")){
        statusText.innerText = "Draw!";
        gameActive = false;
        return true;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Turn: ${currentPlayer}`;
    return false;
}

function getWin(){
    for(let pattern of winPatterns){
        if(pattern.every(i => board[i] === currentPlayer)){
            return pattern;
        }
    }
    return null;
}

function updateScore(){
    scoreX.innerText = scores.X;
    scoreO.innerText = scores.O;
}

function resetGame(){
    board = ["","","","","","","","",""];

    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("win");
    });

    currentPlayer = "X";
    gameActive = true;
    statusText.innerText = "Player X's turn";
}

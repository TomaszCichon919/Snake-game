const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let setIntervalId;
let velocityX = 0, velocityY =0;
let score = 0;

//Getting high score form local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText =`High Score: ${highScore}`;
// Passing a random 0-30 value for food position
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random()* 30)+ 1;
    foodY = Math.floor(Math.random()*30) +1;
}

const handleGameOver = () => {
    //Clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over The snake died");
    location.reload();
}

// changing velocity value on key press
const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY !=1) {
    velocityX = 0;
    velocityY = -1; }
    else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1; }
    else if (e.key ==="ArrowLeft" && velocityX !=1) {
            velocityX = -1;
            velocityY = 0; }
    else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    
        }

controls.forEach(key => {
    // Calling changedirection on each key click and passing key data set value as an object
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key}));
});

const initGame = () => {
    if(gameOver) return handleGameOver ();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
//Checking if the snake hit the food
    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition ();
        snakeBody.push ([foodX, foodY]);// Oushing food position to snake body array
        score++; //Increasing score by 1
        
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText =`Score: ${score}`;
        highScoreElement.innerText =`High Score: ${highScore}`;
     
    //console.log (snakeBody);
    
    }
for (let i = snakeBody.length -1; i> 0; i--){
    //Schifting forward the values of the elements in the snake body by one
    snakeBody[i] = snakeBody[i-1];
}

    snakeBody[0] = [snakeX, snakeY]; //setting first element of nake body to current snake posiiton

//Updating the snake head position based on current velocity
snakeX += velocityX;
snakeY += velocityY; 

//checking if snake had is out of the field if game over
if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
}

for(let i=0; i<snakeBody.length; i++) {
   //Adding a div for each part of snake body
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`; 
   //If head of snake touch the body
    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
    gameOver = true;
}
}
   
    //console.log (htmlMarkup);
    playBoard.innerHTML = htmlMarkup;
};
changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);




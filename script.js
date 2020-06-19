const cart = document.getElementById("cart");
const modalBtn = document.getElementById("modalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");
const blockArea = document.getElementById("blockArea");
const ball = document.getElementById("ball");
const mainScreen = document.getElementById("mainScreen");
const ctx = mainScreen.getContext("2d");



let positionIndex = 0;
let ballDirectionDeg = 0;


let x = mainScreen.width/2;
let y = mainScreen.height-30;
let dx = 2;
let dy = -2;
let rightPressed = false;
let leftPressed = false;

const ballRadius = 3;
const paddleHeight = 5;
const paddleWidth = 35;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 20;
const brickHeight = 5;
const brickPaddingX = 23.5;
const brickPaddingY = 10;
const brickOffsetTop = 15;
const brickOffsetLeft = 10;

let paddleX = (mainScreen.width - paddleWidth) / 2;

let bricks = [];

for(let j=0 ; j < 4 ; j++ ){
    bricks[j] = [];
    for(let i=0 ; i < 12 ; i++){
        bricks[j][i] = { x: 0, y: 0, status: 1}
    }
}

function draw() {
    ctx.clearRect(0, 0, mainScreen.width, mainScreen.height);
    drawBall();
    x += dx;
    y += dy;
    checkGameOver()
    if(x + dx > mainScreen.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    
    if(y + dy > mainScreen.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
        console.log(y)
    }
    drawPaddle();
    drawBricks();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, mainScreen.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    if(rightPressed && paddleX < mainScreen.width - paddleWidth){
        paddleX += 3;
    }
    if(leftPressed && paddleX > 0){
        paddleX -= 3;
    }
} 

function drawBricks() {
    for(let j=0 ; j < 4 ; j++){
    for(let i=0 ; i < 12 ; i++){
        
        if(bricks[j][i].status == 1){
            const brickX = brickOffsetLeft + brickPaddingX * i;
            const brickY = brickOffsetTop + brickPaddingY * j;
            hitDetect(brickX, brickY, j, i);
        bricks[j][i].x = brickX;
        bricks[j][i].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "skyblue";
            ctx.fill();
            ctx.closePath(); 
        }
    }
}
}

function hitDetect(brickX, brickY, j, i) {
    if( bricks[j][i].status == 1){
        if(brickX < x && brickX + brickWidth > x && brickY < y && brickY + brickHeight > y){
            dy = -dy;
            bricks[j][i].status = 0;
        }
    }
}


function checkGameOver(){
    console.log(dy)
    if(y + dy >= mainScreen.height - ballRadius){
        if(paddleX <= x && x<= paddleX + paddleWidth){
            dy = -dy;
            console.log(paddleX)
        }else{
            alert("GAME OVER");
            document.location.reload();
            clearInterval(checkGameOver)
        }

    }
}


function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function openModal(){
    modal.style.animation = "modalOpen 1s forwards";    
}

function closeModal(){
    modal.style.animation = "modalClose 1s forwards"; 
}



function init(){
    modalBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModal);
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    const interval = setInterval(draw, 15);
}

init();
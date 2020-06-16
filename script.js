const cart = document.getElementById("cart");
const modalBtn = document.getElementById("modalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");
const blockArea = document.getElementById("blockArea");
const ball = document.getElementById("ball");
const mainScreen = document.getElementById("mainScreen");
const ctx = mainScreen.getContext("2d");


console.log(mainScreen.width)
let positionIndex = 0;
let ballDirectionDeg = 0;


let x = mainScreen.width/2;
let y = mainScreen.height-30;
let dx = 2;
let dy = -2;

const ballRadius = 3;

const paddleHeight = 5;
const paddleWidth = 35;
const paddleX = (mainScreen.width - paddleWidth) / 2;

function draw() {
    ctx.clearRect(0, 0, mainScreen.width, mainScreen.height);
    drawBall();
    x += dx;
    y += dy;
    if(x + dx > mainScreen.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    
    if(y + dy > mainScreen.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    drawPaddle()
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
}

function initBlocks(){
    for(let i=0; i<40 ; i++){
        const block = document.createElement("div");
        block.className = "block";
        blockArea.appendChild(block);
    }
    
}

function controlCart(e){
    console.log(e)

    const pressedKey = e.key;
        if(pressedKey === "ArrowRight"){
            if(e.repeat === true){
                const moveRight = setInterval(() => {
                    if(positionIndex > -44){
                        cart.style.right = `${positionIndex-=0.1}%`;
                    }
                },5);
                setTimeout(()=>{
                    clearInterval(moveRight);
                },100) // 0.1초 동안 0.005 초마다 -0.1%씩 움직임
            }
            else{
                const moveRight = setInterval(() => {
                    if(positionIndex > -44){
                        cart.style.right = `${positionIndex-=0.2}%`;
                        window.addEventListener("keyup", ()=>{
                            clearInterval(moveRight);
                        });
                    }
                },5);
                setTimeout(()=>{
                    clearInterval(moveRight);
                },550) // 키를 꾹 누르고 있을 떄 repeat === true가 활성화되기 까지 길리는 시간 (약 0.5~0.6초)
            }
        }
        else if(pressedKey === "ArrowLeft"){
            if(e.repeat === true){
                const moveLeft = setInterval(() => {
                    if(positionIndex < 43){
                        cart.style.right = `${positionIndex+=0.1}%`;
                    }
                },5);
                setTimeout(()=>{
                    clearInterval(moveLeft);
                },100) // 0.1초 동안 0.005 초마다 -0.1%씩 움직임
            }
            else{
                const moveLeft = setInterval(() => {
                    if(positionIndex < 43){
                        cart.style.right = `${positionIndex+=0.2}%`;
                        window.addEventListener("keyup", ()=>{
                            clearInterval(moveLeft);
                        });
                    }
                },5);
                setTimeout(()=>{
                    clearInterval(moveLeft);
                },550) // 키를 꾹 누르고 있을 떄 repeat === true가 활성화되기 까지 길리는 시간 (약 0.5~0.6초)
            }
        }
}

function openModal(){
    modal.style.animation = "modalOpen 1s forwards";    
}

function closeModal(){
    modal.style.animation = "modalClose 1s forwards"; 
}



function init(){
    window.addEventListener("keydown", controlCart);
    modalBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModal);
    initBlocks()
    setInterval(draw, 10);
}

init();
const cart = document.getElementById("cart");
const modalBtn = document.getElementById("modalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");
const blockArea = document.getElementById("blockArea");

let positionIndex = 0;

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
                },550) // 0.5초 동안 0.005 초마다 -0.1%씩 움직임
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
                },100)
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
                },550)
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
}

init();
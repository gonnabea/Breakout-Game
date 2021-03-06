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
    const pressedKey = e.key;
    console.log(pressedKey)
    console.log(positionIndex)
    if(pressedKey === "ArrowRight" && positionIndex > -44){
        cart.style.right = `${positionIndex-=4}%`;
    }
    else if(pressedKey === "ArrowLeft" && positionIndex < 44){
        cart.style.right = `${positionIndex+=4}%`;
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
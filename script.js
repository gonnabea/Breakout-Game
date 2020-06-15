const cart = document.getElementById("cart");

let positionIndex = 0;

function controlCart(e){
    const pressedKey = e.key;
    console.log(pressedKey)
    if(pressedKey === "ArrowRight"){
        cart.style.right = `${positionIndex-=1}px`;
    }
    else if(pressedKey === "ArrowLeft"){
        cart.style.right = `${positionIndex+=1}px`;
    }
}

function init(){
    window.addEventListener("keydown", controlCart)
}

init();
const para = document.querySelector("p")
const text = para.innerText
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"


let iteration = 0

function randomText(){

   const str = text.split("").map((char, index) =>{
    if (index < iteration){
        return char
    }
        return characters.split("")[Math.floor(Math.random() * characters.length)]

    }).join("")
    para.innerHTML = str
    iteration += 0.2

}

setInterval(randomText, 30)

para.addEventListener("mouseover", () => {
  iteration = 0;
  clearInterval(interval);
  interval = setInterval(randomText, 30);
});


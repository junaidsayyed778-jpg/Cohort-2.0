function openFeaures(){
    const allElem = document.querySelectorAll(".elem");
const fullElem = document.querySelectorAll(".fullElem")
const back = document.querySelectorAll(".back")

allElem.forEach(function(elem){
    elem.addEventListener("click", function(){
       fullElem[elem.id].style.display = 'block'
    })
})

back.forEach(function(back){
    back.addEventListener("click", function(){
         fullElem[back.id].style.display = 'none'
    })

})
}
openFeaures();

const form = document.querySelector(".addTask form")
const taskInput = document.querySelector(".addTask form input")
const taskDetailsInput = document.querySelector("..addTask form textarea")

form.addEventListener("submit", function(e){
    e.preventDefault()
    
})
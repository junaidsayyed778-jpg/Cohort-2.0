var container = document.querySelector('.container');
var button = document.querySelector('button');

button.addEventListener('click', function() {
    var c1 = Math.floor(Math.random() * 256)
    var c2 = Math.floor(Math.random() * 256)
    var c3 = Math.floor(Math.random() * 256)
    
    container.style.backgroundColor = `rgb(${c1}, ${c2}, ${c3})`;
})
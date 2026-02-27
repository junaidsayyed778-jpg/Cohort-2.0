function debouncing(func, delay){
    let timer;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(func,delay)
    };

}

document.querySelector("#search").addEventListener("input", debouncing(function(){
    console.log("hi");
}, 400));
/*const pro = new Promise((resolve, reject) =>{
    setTimeout(()=>{
        resolve();
    }, 2000);
});

pro.then(()=>{
    console.log("Promise resolved");
});

pro.catch(()=>{
    console.log("Promise rejected");
});
*/

/*
console.log("fetching data...");
setTimeout(()=>{
    
fetch('https://jsonplaceholder.typicode.com/todos/1')


.then(responce => responce.json())
.then((data) => {
    console.log(data)})
    .catch((err)=>{
        console.log("error", err);
    })


}, 3000);

*/

function getNum(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const num = Math.floor(Math.random() * 10);
            if(num > 5){
                resolve(true);

            }
            else{
                reject(false);
            }
        })
    })
}

async function checkNum(){
   let result = await getNum();
   console.log(result);
}
checkNum();
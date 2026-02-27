/*class Remote{
    constructor(brand, price, color){
        this.brand = brand;
        this.price = price;
        this.color = color;
    }

    switchOn(){
        console.log("the remote is on ");
    }
    switchOff(){
        console.log("the remote is off");
    }

}

let remote1 = new Remote("sony", 200, "black");
remote1.switchOff();
*/

//arrow function and this keyword
/*
let obj ={
    name: "john",
    func: () => {
        console.log(this);
    }
    
}
obj.func();
*/

// call apply bind
/*
let obj= {
    name: "john",
};
function abcd(a,b,c){
    console.log(this, a,b,c);
}
abcd.apply(obj,[1,2,3]);
*/
/*
class animal{
    constructor(){
        this.breed = "persian";
        this.color = "white";
    }
}
let cat1 = new animal();
*/
/*
function abcd(fn){
    fn(function(){});
};

abcd(function(fn2){
    fn2();
})
    */

//details lao

function detailslao(adress, cd){
    console.log("details fetching....");
    setTimeout(()=>{
cd({name: "john"});
    },3000);

};

detailslao("adress", function(obj){
    console.log(obj);
})






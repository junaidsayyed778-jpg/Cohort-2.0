function getUser(username, cb){
    console.log("Fetching user from database...");
    setTimeout(() =>{
        cb({id: 1, username: "junaid"});
    }, 1000);
}

function getUserPost(id, cb){
    setTimeout(() => {
        cb(["hello","world"]);
    }, 2000);

}

getUser ("junaid",function(data){
    console.log(data);
    getUserPost(data.id, function(allposts){
        console.log(allposts);
    });

}) 



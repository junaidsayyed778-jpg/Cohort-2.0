
function sendEmail(email){
    let Timeout = Math.floor(Math.random * 5);
    return new Promise((resolve, reject)=>{

 
    setTimeout(()=>{
        let probablity = Math.floor(Math.random * 10);
        if(probablity <= 5) resolve("Email send successfully");
        else reject("Email is not send");
        

    },Timeout * 1000);

       });

}
sendEmail("junaid778gmail.com")
.then(function(data){
    console.log(data)
})
.catch(function(err){
    console.log(err)

})

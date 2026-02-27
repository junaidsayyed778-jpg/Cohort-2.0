

async function getWeather(city){
    let API_KEY = `92ac28721194d097331ecefa8573930e`

    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metrics`)
   let realData= await data.json();
   if(realData.main.temp < 273){
    console.log(`too cold weather.... ${realData.main.temp}`)
   }
   else if (realData.main.temp > 313){
    console.log(`too hot weather... ${realData.main.temp}`)
   }
   else{
    console.log(realData)
   }
}
getWeather("mexico");
import { useState } from 'react'
import './App.css'

function App() {
  const [marks, setMarks] = useState([40,97,30,29,67])

  function giveGrace(){
    const newMarks = marks.map(function(elem){  
        if(elem>95){
          return elem
        }else{
          return elem + 5
        }
    })
    setMarks(newMarks)
  } 

  return (
   <div>
    {marks.map(function(elem, idx){
      return <h1>Student {idx+1} = {elem} ({elem > 33?  "pass": "fail"})</h1>
    })}
    <button onClick={giveGrace}>give them grace</button>

   </div>
  
  )
}

export default App

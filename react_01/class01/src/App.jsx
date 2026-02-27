import React, { useState } from 'react'

function App() {
  const [marks, setMarks] = useState(90,76, 23, 32, 78)
  return (
    <div>
      {marks.map(function(elem, idx){
        return <h1>student {idx+1} = {elem}</h1>
      })}
    </div>
  )
}

export default App
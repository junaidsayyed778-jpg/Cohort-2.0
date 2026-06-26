import React from 'react'

const page =async ({params}) => {
    let {id} = await params
    
  return (
    <div>
      this is dyanamic route - {id}
    </div>
  )
}

export default page

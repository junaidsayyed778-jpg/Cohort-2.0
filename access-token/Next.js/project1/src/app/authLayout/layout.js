import Navbar from '@/components/authNav';
import React from 'react'

const layout = ({children}) => {
   return (
  <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}</body>
    </html>  
  );
}

export default layout

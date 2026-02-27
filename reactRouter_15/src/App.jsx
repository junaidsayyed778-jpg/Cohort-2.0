import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import Courses from './pages/Courses'
import Navbar from './components/Navbar'
import Cohort1 from './pages/Cohort1'

const App = () => {
  return (
  
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/product' element={<Product/>} />
        <Route path='/courses' element={<Courses/>} />
        <Route path='/courses/cohort1' element={<Cohort1/>} />

        
      </Routes>
    </div>
  )
}

export default App

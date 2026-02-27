import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <h1 className='flex gap-2'>Navbar</h1>
      <NavLink to="/" style={({isActive})=>({
        color:isActive?"red":"blue"
      })}>Home</NavLink>
      <NavLink to="/about" style={({isActive})=>({
        color:isActive?"red":"blue"
      })}>About</NavLink>
      <NavLink to="/courses" style={({isActive})=>({
        color:isActive?"red":"blue"
      })}>Courses</NavLink>
      <NavLink to="/product" style={({isActive})=>({
        color:isActive?"red":"blue"
      })}>Product</NavLink>


    </div>
  )
}

export default Navbar
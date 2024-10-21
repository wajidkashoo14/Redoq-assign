import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
    return (
      <div className='flex items-center gap-5 place-content-evenly bg-blue-500 text-white p-4 w-[100%] font-medium shadow-lg'>
        <NavLink to="/form">
          Form
        </NavLink>
        <NavLink to="/image-upload">
          Upload
        </NavLink>
        <NavLink to="/table">
          Table
        </NavLink>
      </div>
    )
  }
  
  export default Navbar
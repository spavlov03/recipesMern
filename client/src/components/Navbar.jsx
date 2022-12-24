import {useState} from 'react'
import { NavLink,Link } from 'react-router-dom'



const Navbar = ({user,setUser}) => {
  
  return (
    <div>
      <h1>Recipes by Svet</h1>
      <NavLink to='/login'>Login</NavLink> | <NavLink to='/register'>Register</NavLink> | <Link to="/logout">Logout</Link> | <NavLink to='/dashboard'>Dashboard</NavLink> | <Link to="/add-recipe">Add Recipe</Link> 
      
    </div>
  )
}

export default Navbar
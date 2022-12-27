import {useState,useEffect} from 'react'
import { NavLink,Link } from 'react-router-dom'
import axios from 'axios'



const Navbar = ({user,setUser}) => {
  useEffect(()=>{ 
    // const requestOne = axios.get('http://localhost:8000/api/recipes',{withCredentials:true})
    const requestTwo = axios.get('http://localhost:8000/api/user',{withCredentials:true})
    axios.all([requestTwo])
    .then(axios.spread((...res)=>{
      // const responseOne = res[0]
      // setRecipes(responseOne.data);
      const responseTwo = res[0]
      setUser(responseTwo.data)
    }))
    .catch(err=>console.log('there is error in useEffect',err))
  },[])
  
  return (
    <div>
      <h1>Recipes by Svet</h1>
      <h6>Hello {user?.firstName}</h6>
      <NavLink to='/login'>Login</NavLink> | <NavLink to='/register'>Register</NavLink> | <Link to="/logout">Logout</Link> | <NavLink to='/dashboard'>Dashboard</NavLink> | <Link to="/add-recipe">Add Recipe</Link> 
      
    </div>
  )
}

export default Navbar
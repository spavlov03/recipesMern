import axios from 'axios'
import { useState,useEffect } from 'react'
// import { Link } from 'react-router-dom'
import CoverFlow from './CoverFlow'
import {io} from 'socket.io-client'



const AllRecipes = ({socket}) => {
  const [recipes,setRecipes] = useState([]); 


  useEffect(()=>{ 
    const requestOne = axios.get('http://localhost:8000/api/recipes/approved',{withCredentials:true})
    axios.all([requestOne])
    .then(axios.spread((...res)=>{
      const responseOne = res[0]
      setRecipes(responseOne.data);
    }))
    .catch(err=>console.log('there is error in useEffect',err))
  },[])

  socket.on('recipeDeleted',(deletedId)=> { 
    setRecipes(recipes.filter((recipe)=> recipe._id !== deletedId))
  })
  return (
    <div className='me-5 ms-5'>
      <CoverFlow recipes={recipes}/>
    </div>
  )
}

export default AllRecipes
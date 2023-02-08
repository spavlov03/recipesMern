import axios from 'axios'
import { useState,useEffect } from 'react'
// import { Link } from 'react-router-dom'
import CoverFlow from './CoverFlow'




const AllRecipes = () => {
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

  return (
    <div className='me-5 ms-5'>
      <CoverFlow recipes={recipes}/>
    </div>
  )
}

export default AllRecipes
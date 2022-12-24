import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'


const Dashboard = ({user,setUser}) => {
  const [recipes,setRecipes] = useState([]); 
  useEffect(()=>{ 
    axios.get('http://localhost:8000/api/recipes',{withCredentials:true})
    .then((res)=>{
      setRecipes(res.data);
    })
    .catch(err=>console.log(err))
  },[])
  
  return (
    <div>
      <p>Hello User - {user.email}</p>
      <p>This is the Dasboard</p>
      <p>List of Recipes</p>
      {recipes.map((recipe,index)=> {
        return <p key={index}><Link to={`/recipe/${recipe._id}`}>{recipe.recipeName}</Link></p>
      })}
    </div>
  )
}

export default Dashboard
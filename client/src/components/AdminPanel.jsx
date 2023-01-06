import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'


const AdminPanel = ({loggedUser}) => {
  const [recipes,setRecipes] = useState([]); 
  // useEffect(()=>{ 
  //   axios.get('http://localhost:8000/api/recipes',{withCredentials:true})
  //   .then((res)=>{
  //     console.log('res in dashboard',res)
  //     setRecipes(res.data);
  //   })
  //   .catch(err=>console.log(err))
  // },[])
  useEffect(()=>{ 
    const requestOne = axios.get('http://localhost:8000/api/recipes/pending',{withCredentials:true})
    // const requestTwo = axios.get('http://localhost:8000/api/user',{withCredentials:true})
    axios.all([requestOne])
    .then(axios.spread((...res)=>{
      const responseOne = res[0]
      setRecipes(responseOne.data);
      // const responseTwo = res[1]
      // setUser(responseTwo.data)
    }))
    .catch(err=>console.log('there is error in useEffect',err))
  },[])
  
  return (
    <div>
      <p>Hello User - {loggedUser.firstName}</p>
      <p>This is the Admin Panel</p>
      <p>List of Recipes waiting on approval</p>
      {recipes?.map((recipe,index)=> {
        return <p key={index}><Link to={`/recipe/${recipe._id}`}>{recipe.recipeName}</Link></p>
      })}
    </div>
  )
}

export default AdminPanel
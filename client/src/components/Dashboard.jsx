import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'


const Dashboard = ({user,setUser,loggedUser,setLoggedUser}) => {
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
    const requestOne = axios.get('http://localhost:8000/api/recipes/approved',{withCredentials:true})
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
    <div>{!user._id?null:<p>Hello User - {user.firstName}</p>}
      {/* <p>This is the Dasboard</p> */}
      <p>List of All Recipes</p>
      {recipes?.map((recipe,index)=> {
        return <p key={index}><Link to={`/recipe/${recipe._id}`}>{recipe.recipeName}</Link></p>
      })}
      


    </div>
  )
}

export default Dashboard
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import CoverFlow from './CoverFlow'


const Dashboard = ({loggedUser}) => {
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
    <div className='me-5 ms-5'>
      {!loggedUser._id?null:<h2>Hello {loggedUser.firstName}!</h2>}
      {/* <p>This is the Dasboard</p>
      <p>Here is our top recipes of the week!</p>
      {recipes?.map((recipe,index)=> {
        return <p key={index}><Link to={`/recipe/${recipe._id}`}>{recipe.recipeName}</Link></p>
      })} */}
      {/* <p>Here is our top recipes of the week!</p> */}
      <CoverFlow recipes={recipes}/>
    </div>
  )
}

export default Dashboard
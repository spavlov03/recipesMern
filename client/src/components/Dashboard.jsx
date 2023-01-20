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
  let sortedRecipes = recipes.sort((r1,r2)=>(r1.likes.length<r2.likes.lenght)?1:(r1.likes.length>r2.likes.length?-1:0));
  let top5Recipes = sortedRecipes.slice(0,5)
  // console.log(top5Recipes)
  return (
    <div className='me-5 ms-5'>
      {/* <p>This page will display using cover flow top-5 recipes</p>
      <a href='https://youtu.be/CrvQ790xG7I'>Like this</a> */}
      {!loggedUser._id?null:<h2>Hello {loggedUser.firstName}!</h2>}
      <h4 className='mb-4'>Here is our top recipes of the week!</h4>
      {/* <p>This is the Dasboard</p>
      {recipes?.map((recipe,index)=> {
        return <p key={index}><Link to={`/recipe/${recipe._id}`}>{recipe.recipeName}</Link></p>
      })} */}
      {/* <p>Here is our top recipes of the week!</p> */}
      <CoverFlow recipes={top5Recipes}/>
      <div className='mt-4'>
      <Link to="/allRecipes">Click Here To See All Recipes</Link>
      </div>
    </div>
  )
}

export default Dashboard
import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams,Link } from 'react-router-dom'

const ViewRecipe = ({loggedUser,oneRecipe,setOneRecipe}) => {
  const {id} = useParams();
  const [recipeAuthor,setRecipeAuthor] = useState({});
  useEffect(()=>{
    // const requestOne = axios.get(`http://localhost:8000/api/recipe/${id}`,{withCredentials:true})
    // const requestTwo = axios.get(`http://localhost:8000/api/user/${oneRecipe.creatorId}`,{withCredentials:true})
    axios.get(`http://localhost:8000/api/recipe/${id}`,{withCredentials:true})
    .then((res)=>{
      setOneRecipe(res.data);
      axios.get(`http://localhost:8000/api/user/${oneRecipe.creatorId}`,{withCredentials:true})
      .then((res=>{
        setRecipeAuthor(res.data)
      }))
      .catch(err=>console.log('inside error',err))
    })
    .catch(err=>console.log(err))
    },[id,setOneRecipe])

  return (
    <div className='mx-auto'>
      <p>Recipe name : {oneRecipe.recipeName}</p>
      <p>Added By: <Link to={`/user/${oneRecipe.creatorId}`}>{oneRecipe.creatorFirstName} {oneRecipe.creatorLastName}</Link></p>
      <p>Cook Time : {oneRecipe.cookTime} Minutes</p>
      <p>Directions : {oneRecipe.directions}</p>
      <p>Yields: {oneRecipe.yields} <span>Servings</span></p>
      <div>Ingredients : 
        <ul>
          {oneRecipe.ingredients?.map((ing,index)=>(
        <li key={index}>{ing.ingredient} - {ing.qty} {ing.uom}</li>))} 
        </ul> 
        {/* <p>Recipe Status is {oneRecipe.status}</p> */}
        {loggedUser.type==="admin" || oneRecipe.creatorId===loggedUser._id ? <p className="">Status: {oneRecipe.status}</p> : null }
      </div>
      {oneRecipe.creatorId===loggedUser._id || loggedUser.type==='admin'?<Link className='btn btn-warning me-2' to={`/recipe/${oneRecipe._id}/edit`}>Edit Recipe</Link> : null}
      {oneRecipe.creatorId===loggedUser._id || loggedUser.type==='admin'?<button className='btn btn-danger'>Delete Recipe</button> : null}
      

    </div>
  )
}

export default ViewRecipe
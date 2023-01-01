import {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams,Link } from 'react-router-dom'

const ViewRecipe = ({user,setUser}) => {
  const {id} = useParams();
  const [recipe,setRecipe] = useState({}); 
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/recipe/${id}`,{withCredentials:true})
    .then((res)=>{
      setRecipe(res.data);
    })
    .catch(err=>console.log(err))
    },[])

  return (
    <div className='mx-auto'>
      <p>Recipe name : {recipe.recipeName}</p>
      <p>Added By: <Link to={`/user/${recipe.creatorId}`}>{recipe.creatorFirstName} {recipe.creatorLastName}</Link></p>
      <p>Cook Time : {recipe.cookTime} Minutes</p>
      <p>Directions : {recipe.directions}</p>
      <div>Ingredients : 
        <ul>
          {recipe.ingredients?.map((ing,index)=>(
        <li key={index}>{ing.ingredient} - {ing.qty} {ing.uom}</li>))} 
        </ul> 
        {user.type==="admin"? <p className="">Status: {recipe.status}</p> : null }
      </div>
      {recipe.creatorId===user._id || user.type==='admin'?<Link className='btn btn-warning me-2' to={`/recipe/${recipe._id}/edit`}>Edit Recipe</Link> : null}
      {recipe.creatorId===user._id || user.type==='admin'?<button className='btn btn-danger'>Delete Recipe</button> : null}
      

    </div>
  )
}

export default ViewRecipe
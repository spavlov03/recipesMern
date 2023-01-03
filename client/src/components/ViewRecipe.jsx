import {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams,Link } from 'react-router-dom'

const ViewRecipe = ({user,setUser,oneRecipe,setOneRecipe}) => {
  const {id} = useParams();
  // const [recipe,setRecipe] = useState({}); Not needed , state is lifted 
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/recipe/${id}`,{withCredentials:true})
    .then((res)=>{
      setOneRecipe(res.data);
    })
    .catch(err=>console.log(err))
    },[])

  return (
    <div className='mx-auto'>
      <p>Recipe name : {oneRecipe.recipeName}</p>
      <p>Added By: <Link to={`/user/${oneRecipe.creatorId}`}>{oneRecipe.creatorFirstName} {oneRecipe.creatorLastName}</Link></p>
      <p>Cook Time : {oneRecipe.cookTime} Minutes</p>
      <p>Directions : {oneRecipe.directions}</p>
      <div>Ingredients : 
        <ul>
          {oneRecipe.ingredients?.map((ing,index)=>(
        <li key={index}>{ing.ingredient} - {ing.qty} {ing.uom}</li>))} 
        </ul> 
        <p>Recipe Status is {oneRecipe.status}</p>
        {user.type==="admin"? <p className="">Status: {oneRecipe.status}</p> : null }
      </div>
      {oneRecipe.creatorId===user._id || user.type==='admin'?<Link className='btn btn-warning me-2' to={`/recipe/${oneRecipe._id}/edit`}>Edit Recipe</Link> : null}
      {oneRecipe.creatorId===user._id || user.type==='admin'?<button className='btn btn-danger'>Delete Recipe</button> : null}
      

    </div>
  )
}

export default ViewRecipe
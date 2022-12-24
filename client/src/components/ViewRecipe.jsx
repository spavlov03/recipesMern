import {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

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
      <p>Cook Time : {recipe.cookTime} Minutes</p>
      <p>Directions : {recipe.directions}</p>
      <div>Ingredients : 
        <ul>
          {recipe.ingredients?.map((ing,index)=>(
        <li key={index}>{ing.ingredient} - {ing.qty} {ing.uom}</li>))} 
        </ul> 
      </div>

    </div>
  )
}

export default ViewRecipe
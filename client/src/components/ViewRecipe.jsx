import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams,Link,useNavigate } from 'react-router-dom'

const ViewRecipe = ({loggedUser,oneRecipe,setOneRecipe}) => {
  const {id} = useParams();
  const [recipeAuthor,setRecipeAuthor] = useState({});
  const navigate = useNavigate();
  useEffect(()=>{
    // const requestOne = axios.get(`http://localhost:8000/api/recipe/${id}`,{withCredentials:true})
    // const requestTwo = axios.get(`http://localhost:8000/api/user/${oneRecipe.creatorId}`,{withCredentials:true})
    axios.get(`http://localhost:8000/api/recipe/${id}`,{withCredentials:true})
    .then((res)=>{
      setOneRecipe(res.data);
      return axios.get(`http://localhost:8000/api/user/${oneRecipe.creatorId}`,{withCredentials:true})
      .then((res=>{
        setRecipeAuthor(res.data)
      }))
      .catch(err=>console.log('inside error',err))
    })
    .catch(err=>console.log(err))
    },[id,setOneRecipe,oneRecipe.creatorId])
    const deleteRecipe = () => { 
      axios.delete(`http://localhost:8000/api/recipe/${oneRecipe._id}`)
      .then((res)=> {
        navigate("/")
      })
      .catch(err=>console.log(err))
    }

  return (
    <div className='mx-auto'>
      <div className='polaroid mx-auto'>
      <img className ="detailPic" src={oneRecipe.recipeImg} alt="recipe" />
      <p>Recipe name : {oneRecipe.recipeName}</p>
      <p>Added By: <Link to={`/user/${oneRecipe.creatorId}`}>{recipeAuthor.firstName} {recipeAuthor.lastName}</Link></p>
      </div>
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
      {oneRecipe.creatorId===loggedUser._id || loggedUser.type==='admin'?<button className='btn btn-danger' onClick={deleteRecipe}>Delete Recipe</button> : null}
      

    </div>
  )
}

export default ViewRecipe
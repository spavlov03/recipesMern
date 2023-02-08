import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams,Link,useNavigate } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";


const ViewRecipe = ({loggedUser,oneRecipe,setOneRecipe,socket}) => {
  const {id} = useParams();
  const [recipeAuthor,setRecipeAuthor] = useState({});
  const navigate = useNavigate();
  const [likes,setLikes] = useState([]); 

  let likeRecipe = (id,e) => {
    e.preventDefault(); 
    console.log('Recipe Liked')
    axios.put(`http://localhost:8000/api/recipe/like/${id}`, {
      // likes:[...likes,loggedUser._id]
      likes:likes.includes(loggedUser._id)?likes:[...likes,loggedUser._id]
    },{withCredentials:true})
    .then(res=> { 
      console.log('res in likes',res)
      setLikes(res.data.likes)
    })
    .catch(err=>console.log(err))
  }
  let unlikeRecipe = (id,e) => { 
    e.preventDefault(); 
    console.log('Recipe Unliked')
    setLikes(likes.splice((likes.indexOf(loggedUser._id)),1))
    axios.put(`http://localhost:8000/api/recipe/unlike/${id}`, {
      likes:[...likes]
    },{withCredentials:true})
    .then(res=> { 
      console.log('res in likes',res)
      setLikes(res.data.likes)
    })
    .catch(err=>console.log(err))
  }

  useEffect(()=>{
    // const requestOne = axios.get(`http://localhost:8000/api/recipe/${id}`,{withCredentials:true})
    // const requestTwo = axios.get(`http://localhost:8000/api/user/${oneRecipe.creatorId}`,{withCredentials:true})
    axios.get(`http://localhost:8000/api/recipe/${id}`,{withCredentials:true})
    .then((res)=>{
      setOneRecipe(res.data);
      setLikes(res.data.likes)
      return axios.get(`http://localhost:8000/api/user/${oneRecipe.creatorId}`,{withCredentials:true})
      .then((res=>{
        setRecipeAuthor(res.data)
      }))
      .catch(err=>console.log('inside error',err))
    })
    .catch(err=>console.log(err))
    },[id,setOneRecipe,oneRecipe.creatorId])
    const deleteRecipe = () => { 
      socket.emit('deleteRecipe',oneRecipe._id)
      // axios.delete(`http://localhost:8000/api/recipe/${oneRecipe._id}`)
      // .then((res)=> {
        navigate("/")
      // })
      // .catch(err=>console.log(err))
    }


  return (
    <div className='mx-auto'>
      <div className='recipeFrame mx-auto'>
        <img className ="detailPic" src={oneRecipe.recipeImg} alt="recipe" />
        <p>Recipe name : {oneRecipe.recipeName}</p>
        <p>Added By: <Link to={`/user/${oneRecipe.creatorId}`}>{recipeAuthor.firstName} {recipeAuthor.lastName}</Link></p>
        <p>Cook Time : {oneRecipe.cookTime} Minutes</p>
      <p className='ms-3 me-3'>Directions : {oneRecipe.directions}</p>
      <p>Yields: {oneRecipe.yields} <span>Servings</span></p>
      <div>Ingredients : 
        <ul className='list-group'>
          {oneRecipe.ingredients?.map((ing,index)=>(
        <li key={index} className="list-group-item">{ing.ingredient} - {ing.qty} {ing.uom}</li>))} 
        </ul> 
        {/* <p>Recipe Status is {oneRecipe.status}</p> */}
        {loggedUser.type==="admin" || oneRecipe.creatorId===loggedUser._id ? <p className="">Status: {oneRecipe.status}</p> : null }
        {/* {oneRecipe.likes.includes(loggedUser._id)?<i className="material-icons likeIcon">thumb_down</i>:<i className="material-icons likeIcon" onClick={likeRecipe}>thumb_up</i>} */}
        {!loggedUser._id? null:<div>
          {likes.includes(loggedUser._id)?<button className='btn' onClick={(e)=>unlikeRecipe(oneRecipe._id,e)}>
            <i className="material-icons likeIcon" >thumb_down</i>
          </button>:
          <button className='btn' onClick={(e)=>likeRecipe(oneRecipe._id,e)}>
            <i className="material-icons likeIcon">thumb_up</i>
          </button>}
          
          <p>{likes.length} like's</p>
        </div>}
        {/* Like Buton works , need to make it one like per user , fix unlike button. Make like button dissaper when liked vice versa for unlike */}
      </div>
      </div>
      {oneRecipe.creatorId===loggedUser._id || loggedUser.type==='admin'?<Link className='btn btn-warning me-2' to={`/recipe/${oneRecipe._id}/edit`}>Edit Recipe</Link> : null}
      {oneRecipe.creatorId===loggedUser._id || loggedUser.type==='admin'?<button className='btn btn-danger' onClick={deleteRecipe}>Delete Recipe</button> : null}
      

    </div>
  )
}

export default ViewRecipe
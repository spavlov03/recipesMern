import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams,Link,useNavigate } from 'react-router-dom'



const ViewRecipe2 = ({loggedUser,oneRecipe,setOneRecipe}) => {
  const {id} = useParams();
  const {thisId} = useParams();
  console.log("THIS ID IS ",id.length)
  const [recipeAuthor,setRecipeAuthor] = useState({});
  const navigate = useNavigate();
  const [likes,setLikes] = useState([]); 
  const [thisRecipe,setThisRecipe] = useState({});
  const [directions,setDirections] = useState([]); 

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
  

  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
    params: {id:id},
    headers: {
      'X-RapidAPI-Key': 'e3d9cc7f6cmshf9a3771f789b43dp106b9ajsne22f3873bb9c',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  };
  useEffect(()=>{
    if (id.length==4){
      axios.request(options).then(function (response) {
        console.log("RESPONSE------",response.data);
        setThisRecipe(response.data)
        setDirections(response.data.instructions)
      }).catch(function (error) {
        console.error(error);
      });
    }
    else { 
      axios.get(`http://localhost:8000/api/recipe/${id}`,{withCredentials:true})
    .then((res)=>{
      setThisRecipe(res.data);
      setLikes(res.data.likes)
      return axios.get(`http://localhost:8000/api/user/${thisRecipe.creatorId}`,{withCredentials:true})
      .then((res=>{
        setRecipeAuthor(res.data)
      }))
      .catch(err=>console.log('inside error',err))
    })
    .catch(err=>console.log(err))
    }
  },[])
  
  // useEffect(()=>{
  //   // const requestOne = axios.get(`http://localhost:8000/api/recipe/${id}`,{withCredentials:true})
  //   // const requestTwo = axios.get(`http://localhost:8000/api/user/${oneRecipe.creatorId}`,{withCredentials:true})
  //   axios.get(`http://localhost:8000/api/recipe/${id}`,{withCredentials:true})
  //   .then((res)=>{
  //     setThisRecipe(res.data);
  //     setLikes(res.data.likes)
  //     return axios.get(`http://localhost:8000/api/user/${thisRecipe.creatorId}`,{withCredentials:true})
  //     .then((res=>{
  //       setRecipeAuthor(res.data)
  //     }))
  //     .catch(err=>console.log('inside error',err))
  //   })
  //   .catch(err=>console.log(err))
  //   },[id])
  
    const deleteRecipe = () => { 
      axios.delete(`http://localhost:8000/api/recipe/${oneRecipe._id}`)
      .then((res)=> {
        navigate("/")
      })
      .catch(err=>console.log(err))
    }


  return (
    <div className='mx-auto'>
        {/* <p>View Recipe 2</p>
        <p>ID is {id}</p> */}
        <div className='recipeFrame mx-auto'>
        <img className ="detailPic" src={thisRecipe.thumbnail_url} alt="recipe" />
        <p>Recipe name : {thisRecipe.name}</p>
        {/* <p><i className="bi bi-person"></i> Added By: <Link to={`/user/${oneRecipe.creatorId}`}>{recipeAuthor.firstName} {recipeAuthor.lastName}</Link></p> */}
        <p><i className="bi bi-clock"></i> Cook Time : {thisRecipe.total_time_minutes} {thisRecipe.cookTime} Minutes</p>
      <p className='ms-3 me-3'>Directions : <br/><br/>{directions[0]?directions.map((inst,index)=>{return <span key={index}>{inst.display_text}</span>}):<span>{thisRecipe.directions}</span>}</p>
      
      <p>Yields: {thisRecipe.yields}</p>
      {/* <div>Ingredients : 
        <ul className='list-group'>
          {oneRecipe.ingredients?.map((ing,index)=>(
        <li key={index} className="list-group-item">{ing.ingredient} - {ing.qty} {ing.uom}</li>))} 
        </ul>  */}
        {/* <p>Recipe Status is {oneRecipe.status}</p> */}
        {/* {loggedUser.type==="admin" || oneRecipe.creatorId===loggedUser._id ? <p className="">Status: {oneRecipe.status}</p> : null } */}
        {/* {oneRecipe.likes.includes(loggedUser._id)?<i className="material-icons likeIcon">thumb_down</i>:<i className="material-icons likeIcon" onClick={likeRecipe}>thumb_up</i>} */}
        {/* {!loggedUser._id? null:<div>
          {likes.includes(loggedUser._id)?<button className='btn' onClick={(e)=>unlikeRecipe(oneRecipe._id,e)}>
          <i className="likeIcon bi bi-hand-thumbs-up-fill"></i>
          </button>:
          <button className='btn' onClick={(e)=>likeRecipe(oneRecipe._id,e)}>
            <i className="likeIcon bi bi-hand-thumbs-up"></i>
          </button>}
          
          <p>{likes.length} like's</p>
        </div>} */}
        {/* Like Buton works , need to make it one like per user , fix unlike button. Make like button dissaper when liked vice versa for unlike */}
      {/* </div> */}
      </div>
      {/* {oneRecipe.creatorId===loggedUser._id || loggedUser.type==='admin'?<Link className='btn btn-warning me-2' to={`/recipe/${oneRecipe._id}/edit`}>Edit Recipe <i className="bi bi-pen"></i></Link> : null}
      {oneRecipe.creatorId===loggedUser._id || loggedUser.type==='admin'?<button className='btn btn-danger' onClick={deleteRecipe}>Delete Recipe <i className="bi bi-trash3"></i></button> : null} */}
      
    </div>
  )
}

export default ViewRecipe2
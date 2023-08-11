import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams,Link,useNavigate } from 'react-router-dom'




const ViewRecipe = ({loggedUser,oneRecipe,setOneRecipe}) => {
  const {id} = useParams();
  const [recipeAuthor,setRecipeAuthor] = useState({});
  const navigate = useNavigate();
  const [likes,setLikes] = useState([]); 
  const [test,setTest] = useState({});

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
  let idlength = id.toString()
  // // console.log(idlength.length)
  // if (idlength.length > 5) 
  //   console.log("Long")
  // else
  //   console.log("Short")

  // useEffect(()=> { 
  //   axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  //   .then((res=>{
  //     setTest(res.data)
  //     console.log(test)
  //   }))
  //   .catch(err=>console.log('inside error',err))
  // },[])


const newTest = Object.entries(test)

  useEffect(()=>{
    const addIngredientsToList = () => {
      const ingredients = {};
    
        // Loop through the strIngredient properties and add non-empty values to the ingredients list
      for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`;
        const ingredientValue = oneRecipe[ingredientKey];
        const otherKey = `strMeasure${i}`; 
        const otherValue = oneRecipe[otherKey]
          
        if (ingredientValue !== "") {
          ingredients[ingredientValue] = otherValue;
          // console.log("INGREDIENTS---->",ingredientValue)
        }
      }
      // console.log("INGGG",ingredients)
        // Set the ingredients list state
      setTest(ingredients);
    };
    if (idlength.length > 5)
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
    else
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res=>{
      setOneRecipe(res.data.meals[0])
      // console.log(oneRecipe)    
      // Call the function to add ingredients to the state (You can trigger this function when needed)
      addIngredientsToList();

    }))
    .catch(err=>console.log('inside error',err))
    },[])
  const deleteRecipe = () => { 
    axios.delete(`http://localhost:8000/api/recipe/${oneRecipe._id}`)
    .then((res)=> {
      navigate("/")
    })
    .catch(err=>console.log(err))
  }
  
  return (
    <div className='mx-auto'>
      <div className='recipeFrame mx-auto'>
        {oneRecipe._id?<img className ="detailPic" src={oneRecipe.recipeImg} alt="recipe" />:<img className ="detailPic" src={oneRecipe.strMealThumb} alt="recipe" />}
        
        <p>Recipe name :  {oneRecipe._id?oneRecipe.recipeName:oneRecipe.strMeal}</p>
        <p><i className="bi bi-person"></i> {oneRecipe._id?<span>Added By: <Link to={`/user/${oneRecipe.creatorId}`}>{recipeAuthor.firstName} {recipeAuthor.lastName}</Link></span>:<span>Source <a href={oneRecipe.strSource} target='_blank' rel='noreferrer'>Click Here</a></span>}</p>
        {oneRecipe._id?<p><i className="bi bi-clock"></i> Cook Time : {oneRecipe.cookTime} Minutes</p>:null}
      <p className='ms-3 me-3'>Directions : {oneRecipe._id?oneRecipe.directions:oneRecipe.strInstructions}</p>
      {oneRecipe._id?<p>Yields: {oneRecipe.yields} <span>Servings</span></p>:null}
      <div>Ingredients : 
        <ul className='list-group'>
          {oneRecipe._id?oneRecipe.ingredients?.map((ing,index)=>(
        <li key={index} className="list-group-item">{ing.ingredient} - {ing.qty} {ing.uom}</li>)):
        // test?.map((ing,index)=>(
        //   <li key={index} className="list-group-item">{ing} - </li>))
          <>
              {newTest.map(([key, value]) => (
              <li key={key} className="list-group-item">
                {key}: {value}
              </li>
              ))}
          </>
          } 
        </ul> 
        
        {/* <p>Recipe Status is {oneRecipe.status}</p> */}
        {(loggedUser.type==="admin" || oneRecipe.creatorId===loggedUser._id) && oneRecipe._id ? <p className="">Status: {oneRecipe.status}</p> : null }
        {/* {oneRecipe.likes.includes(loggedUser._id)?<i className="material-icons likeIcon">thumb_down</i>:<i className="material-icons likeIcon" onClick={likeRecipe}>thumb_up</i>} */}

        {loggedUser._id && oneRecipe._id?<div>
          {likes.includes(loggedUser._id)?<button className='btn' onClick={(e)=>unlikeRecipe(oneRecipe._id,e)}>
          <i className="likeIcon bi bi-hand-thumbs-up-fill"></i>
          </button>:
          <button className='btn' onClick={(e)=>likeRecipe(oneRecipe._id,e)}>
            <i className="likeIcon bi bi-hand-thumbs-up"></i>
          </button>}
          
          <p>{likes.length} like's</p>
        </div>:null}
        {/* Like Buton works , need to make it one like per user , fix unlike button. Make like button dissaper when liked vice versa for unlike */}
      </div>
      </div>
      {oneRecipe._id && (recipeAuthor._id===loggedUser._id || loggedUser.type==='admin') ?<Link className='btn btn-warning me-2' to={`/recipe/${oneRecipe._id}/edit`}>Edit Recipe <i className="bi bi-pen"></i></Link> : null}
      {oneRecipe._id && (recipeAuthor._id===loggedUser._id || loggedUser.type==='admin')?<button className='btn btn-danger' onClick={deleteRecipe}>Delete Recipe <i className="bi bi-trash3"></i></button> : null}
      

    </div>
  )
}

export default ViewRecipe
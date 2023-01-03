import axios from 'axios';
import { useEffect,useState } from 'react';
import { useParams,Link } from 'react-router-dom'
import ProfilePic from './ProfilePic';


const UserDetail = ({user,setUser}) => {
  const [thisUser,setThisUser] = useState({}); 
  const [recipes,setRecipes] = useState([]); 
  const {id} = useParams();
  const [loggedAuthor,setloggedAuthor] = useState(false);
  
  useEffect(()=> { 
    const requestOne = axios.get(`http://localhost:8000/api/user/${id}`)
    const requestTwo = axios.get(`http://localhost:8000/api/recipes/${id}`)
    axios.all([requestOne,requestTwo])
    .then(axios.spread((...res)=>{
      const responseOne = res[0]
      const responseTwo = res[1]
      // console.log(responseTwo)
      setThisUser(responseOne.data)
      console.log(`this user is ${thisUser}`)
      setRecipes(responseTwo.data)
      console.log(`these are the recipes ${recipes}`)
    }))
    .catch(err=>console.log(err))
  },[])
  return (
    <div>
      <p>This is {thisUser?.firstName} {thisUser?.lastName} profile</p>
      <p>Recipes by {thisUser?.firstName}</p>  
      {thisUser._id===user._id?<div>
        {recipes?.map((recipe,index)=> { 
          return <div key={index}>
            <p><Link to={`/recipe/${recipe._id}`}>{recipe.recipeName} - {recipe.status}</Link></p>
          </div>
        })}
      </div>:<div>{recipes.filter(recipe => recipe.status === "approved").map((recipe,index)=> { 
          return <div key={index}>
            <p><Link to={`/recipe/${recipe._id}`}>{recipe.recipeName}</Link></p>
          </div>
        })}</div>}
        <p><ProfilePic/></p>
    </div>
  )
}

export default UserDetail
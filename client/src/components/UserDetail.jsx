import axios from 'axios';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom'


const UserDetail = ({user,setUser}) => {
  const [thisUser,setThisUser] = useState({}); 
  const [recipes,setRecipes] = useState([]); 
  const {id} = useParams();
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
      <p>
        {recipes?.map((recipe,index)=> { 
          return <div key={index}>
            <p>{recipe.recipeName}</p>
          </div>
        })}
      </p>
    </div>
  )
}

export default UserDetail
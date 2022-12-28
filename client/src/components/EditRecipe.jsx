import {useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';

const EditRecipe = ({user,setUser}) => {
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/recipe/${id}`,{withCredentials:true})
    .then((res)=>{
      setRecipeName(res.data.recipeName);
      setCookTime(res.data.cookTime)
      setDirections(res.data.directions)
      setIngredients(res.data.ingredients)
    })
    .catch(err=>console.log(err))
    },[])
  const [recipeName,setRecipeName] = useState('');
  const [cookTime,setCookTime] = useState(0);
  const [directions,setDirections] = useState('');
  const [ingredients,setIngredients] = useState([{ingredient:"",qty:"",uom:""}])
  const [errors,setErrors] = useState({});
  const navigate = useNavigate();
  const {id} = useParams();
  const [recipe,setRecipe] = useState({}); 

  let handleChange = (i,e) => { 
    let newIngredientsValues = [...ingredients]; 
    newIngredientsValues[i][e.target.name] = e.target.value; 
    setIngredients(newIngredientsValues);
  }
  let addIngredientsFields = () => { 
    setIngredients([...ingredients,{ingredient:"",qty:"",uom:""}])
  }
  let removeIngredientsFields = (i) => { 
    let newIngredientsValues = [...ingredients]; 
    newIngredientsValues.splice(i,1); 
    setIngredients(newIngredientsValues)
  }
  let handleSubmit = (e) => { 
    e.preventDefault(); 

    axios.put(`http://localhost:8000/api/recipe/${id}`,{
      recipeName,
      cookTime,
      directions, 
      ingredients
      // creatorId: user._id, 
      // creatorFirstName: user.firstName,
      // creatorLastName: user.lastName
    },{withCredentials:true})
    .then(res=>{
      console.log(res.data); 
      navigate('/dashboard')
    })
    .catch((err)=> { 
      console.log(err)
      setErrors(err.response.data.errors)
    })

  }
  return (
    <div>
      <p>Edit {recipe.recipeName}</p>
      {/* <p>Your Name is {user.firstName} and ID is {user._id}</p> */}
      <form onSubmit={handleSubmit} className='mx-auto w-75'>
        <label className='form-label'>Reicipe Name</label>
        <input className='form-control' type="text" name='recipeName' value={recipeName} onChange={(e)=>setRecipeName(e.target.value)}/>
        <label className='form-label'>Time to cook</label>
        <input className='form-control' type="text" name='cookTime' value={cookTime} onChange={(e)=>setCookTime(e.target.value)}/>
        <label className='form-label'>Directions</label>
        <input className='form-control' type="text" name='directions' value={directions} onChange={(e)=>setDirections(e.target.value)}/>
        <label>Ingredients:</label>
        {ingredients.map((element,index) => (
          <div key={index}>
            <label>Name:</label>
            <input type="text" name='ingredient' value={element.ingredient || ""}  onChange={e=>handleChange(index,e)}/>
            <label>Quantity</label>
            <input type="text" name='qty' value={element.qty || ""} onChange={e=>handleChange(index,e)}/>
            <label>Unit of Measure</label>
            <input type="text" name='uom' value={element.uom || ""} onChange={e=>handleChange(index,e)}/>
            {
              index ?
              <button type='button' className='btn btn-danger' onClick={()=>removeIngredientsFields(index)}>Remove</button>
              :null
            }
          </div>
        ))}
        <div className='mt-2'>
          <button className='btn btn-info' type='button' onClick={()=>addIngredientsFields()}>Add</button>
          <button className='btn btn-success ms-2' type="submit">Edit</button>
        </div>
      </form>
    </div>
  )
}

export default EditRecipe
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AddRecipe = ({user,setUser}) => {
  const [recipeName,setRecipeName] = useState('');
  const [cookTime,setCookTime] = useState(0);
  const [directions,setDirections] = useState('');
  const [ingredients,setIngredients] = useState([{ingredient:"",qty:"",uom:""}])
  const [yeilds,setYeilds] = useState(0)
  const [errors,setErrors] = useState({});
  const navigate = useNavigate();

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
    // console.log(`Recipe name is ${recipeName}`)
    // console.log(`Cook time is ${cookTime}`)
    // console.log(`Directions are ${directions}`)
    // console.log(`Ingredients are ${ingredients}`)
    axios.post('http://localhost:8000/api/recipe',{
      recipeName,
      cookTime,
      directions, 
      ingredients, 
      creatorId: user._id, 
      creatorFirstName: user.firstName,
      creatorLastName: user.lastName, 
      status:'pending', 
      yeilds,
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
      <p>Add A recipe</p>
      <form onSubmit={handleSubmit} className='mx-auto w-50 d-flex flex-column border gap-1'>
        <div className='d-flex'>
          <label className='col-4'>Reicipe Name</label>
          <input className='col-3' type="text" name='recipeName' onChange={(e)=>setRecipeName(e.target.value)}/>
        </div>
        <div className='d-flex'>
          <label className='col-4'>Time to cook in minutes</label>
          <input className='col-3' type="number" name='cookTime' onChange={(e)=>setCookTime(e.target.value)}/>
        </div>
        <div className='d-flex'>
          <label className='col-4'>Yeilds</label>
          <div className='d-flex col-3'>
          <input className='col-7' type="number" name='cookTime' onChange={(e)=>setYeilds(e.target.value)}/><span>Servings</span></div>
        </div>
        <div className='border'>
        <label className='col-7'>Ingredients:</label>
        {ingredients.map((element,index) => (
          <div key={index} className="d-flex">
            <label className='col-1'>Name:</label>
            <input className='col-2' type="text" name='ingredient' value={element.ingredient || ""}  onChange={e=>handleChange(index,e)}/>
            <label className='col-2'>Quantity</label>
            <input className='col-1' type="number" name='qty' value={element.qty || ""} onChange={e=>handleChange(index,e)}/>
            <label className='col-2'>Unit of Measure</label>
            <input type="text" name='uom' value={element.uom || ""} onChange={e=>handleChange(index,e)}/>
            {
              index ?
              <button type='button' className='btn btn-danger' onClick={()=>removeIngredientsFields(index)}>Remove</button>
              :null
            }
          </div>
        ))}
        <button className='btn btn-info mt-2 mb-2' type='button' onClick={()=>addIngredientsFields()}>Add Ingredient</button>
        </div>
        <div className='d-flex'>
          <label className='col-4'>Directions</label>
          <textarea rows="6" cols="50" className='col-7' type="text" name='directions' onChange={(e)=>setDirections(e.target.value)}/>
        </div>
        
        {/* <label className='form-label'>Cuisine/Diet:</label>
        <div className="d-flex gap-2">
          <div>
            <input className="form-check-input" type="checkbox" value="asian" id="flexCheckDefault"/>
            <label className="form-check-label" for="flexCheckDefault">Asian</label>
          </div>
          <div>
            <input className="form-check-input" type="checkbox" value="latino" id="flexCheckDefault"/>
            <label className="form-check-label" for="flexCheckDefault">Latino</label>
          </div>
          <div>
            <input className="form-check-input" type="checkbox" value="american" id="flexCheckDefault"/>
            <label className="form-check-label" for="flexCheckDefault">American</label>
          </div>
          <div>
            <input className="form-check-input" type="checkbox" value="easternEuropean" id="flexCheckDefault"/>
            <label className="form-check-label" for="flexCheckDefault">Eastern European</label>
          </div>
          <div>
            <input className="form-check-input" type="checkbox" value="keto" id="flexCheckDefault"/>
            <label className="form-check-label" for="flexCheckDefault">Keto</label>
          </div>
          <div>
            <input className="form-check-input" type="checkbox" value="paleo" id="flexCheckDefault"/>
            <label className="form-check-label" for="flexCheckDefault">Paleo</label>
          </div>
          <div>
            <input className="form-check-input" type="checkbox" value="vegan" id="flexCheckDefault"/>
            <label className="form-check-label" for="flexCheckDefault">Vegan</label>
          </div>
          <div>
            <input className="form-check-input" type="checkbox" value="vegetarian" id="flexCheckDefault"/>
            <label className="form-check-label" for="flexCheckDefault">Vegetarian</label>
          </div>
        </div> */} 
        {/* Add Later */}
        
        <div className='mt-2'>
          
          <button className='btn btn-success ms-2' type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddRecipe
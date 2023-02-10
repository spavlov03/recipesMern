import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import {ToastContainer,toast} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
import AddProfilePic from './AddProfilePic';


const AddRecipe = ({loggedUser}) => {
  const [recipeName,setRecipeName] = useState('');
  const [cookTime,setCookTime] = useState();
  const [directions,setDirections] = useState('');
  const [ingredients,setIngredients] = useState([{ingredient:"",qty:"",uom:""}])
  const [yields,setYields] = useState("")
  const [errors,setErrors] = useState({});
  const navigate = useNavigate();
  const [recipeImg,setRecipeImg] = useState("")
  const type = "Recipe"
  // const likes = [];
  // const notify = () => toast("Wow so easy!"); 

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
    axios.post('http://localhost:8000/api/recipe',{
      recipeName,
      cookTime,
      directions, 
      ingredients, 
      creatorId: loggedUser._id, 
      status:'pending', 
      yields,
      recipeImg,
      likes:[loggedUser._id],
    },{withCredentials:true})
    .then(res=>{
      console.log(res.data); 
      navigate('/')
    })
    .catch((err)=> { 
      console.log(err)
      setErrors(err.response.data.errors)
    })

  }
  return (
    <div>
      <h5 className='mb-4'>Ready To Add Your Own Recipe?</h5>
      <div className='mx-auto d-flex flex-column myForm p-3'>
        <div id='topField'>
          <div className='d-flex flex-column gap-1 mx-auto'> 
            <div className='regBox'>
              <input className='form-control regInput' type="text" onChange={(e)=>setRecipeName(e.target.value)} placeholder="Recipe Name"/>
              {errors.recipeName && <span className='text-danger'>{errors.recipeName.message}</span>}
            </div>
            <div className='regBox'>
              <input className='form-control regInput' type="number" onChange={(e)=>setCookTime(e.target.value)} placeholder="How Long To Cook?"/>
              {errors.cookTime && <span className='text-danger'>{errors.cookTime.message}</span>} 
            </div>
            <div className='regBox'>
              <input className='form-control regInput' type="number" onChange={(e)=>setYields(e.target.value)} placeholder="How Many Servings?"/>
              {errors.yields && <p className='text-danger'>{errors.yields.message}</p>}
            </div>
          </div>
          <div className='ms-5'>
            <AddProfilePic type={type} recipeImg={recipeImg} setUrl={setRecipeImg}/>
            <img className="previewRec" src={recipeImg} alt="recipe image" />
          </div>
        </div>
        <div className=''>
          {/* Ingredients Div */}
          {/* <label className='text-center'>Ingredients:</label> */}
          {ingredients.map((element,index) => (
          <div key={index} className="mt-1 pb-2 d-flex flex-column">
            <div className='d-flex ingBox'>
              <input className='form-control ingInput' placeholder='Ingredient Name' type="text" name="ingredient" value={element.ingredient || ""}  onChange={e=>handleChange(index,e)}/>
              <input className='form-control ingInput' placeholder='Quantity' type="number" name="qty" value={element.qty || ""} onChange={e=>handleChange(index,e)}/>
              <input className='form-control ingInput' placeholder='Unit Of Measure' type="text" name="uom" value={element.uom || ""} onChange={e=>handleChange(index,e)}/>
            </div>
            {index?<button type='button' className='btn btn-danger removeBtn' onClick={()=>removeIngredientsFields(index)}>Remove Ingredient</button>:null}
          </div>
          ))}
          <button className='btn btn-info mb-2' type='button' onClick={()=>addIngredientsFields()}>Add Ingredient</button>
        </div>
          <textarea rows="6" cols="50" placeholder='Directions' className='col-7 form-control directions' type="text" name='directions' onChange={(e)=>setDirections(e.target.value)}/>
          <div className='directionsInput'>
          {errors.directions && <span className='text-danger'>{errors.directions.message}</span>}
          </div>
          <button onClick={handleSubmit}  className='btn btn-success submitBtn' type="submit">Submit</button>
      </div>
    </div>
  )
}

export default AddRecipe
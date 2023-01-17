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
  const [url,setUrl] = useState("")
  const type = "Recipe"
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
    // console.log(`Recipe name is ${recipeName}`)
    // console.log(`Cook time is ${cookTime}`)
    // console.log(`Directions are ${directions}`)
    // console.log(`Ingredients are ${ingredients}`)
    axios.post('http://localhost:8000/api/recipe',{
      recipeName,
      cookTime,
      directions, 
      ingredients, 
      creatorId: loggedUser._id, 
      // creatorFirstName: loggedUser.firstName,
      // creatorLastName: loggedUser.lastName, 
      status:'pending', 
      yields,
      recipeImg: url,
      likes:[],
    },{withCredentials:true})
    .then(res=>{
      console.log(res.data); 
      navigate('/')
    })
    .catch((err)=> { 
      console.log(err)
      // toast(err.response.data.errors.recipeName.message, {position:"top-center"});
      // toast(err.response.data.errors.cookTime.message, {position:"top-center"});
      // toast(err.response.data.errors.yields.message, {position:"top-center"});
      // toast(err.response.data.errors.directions.message, {position:"top-center"});

      // err.response.data.errors.map((er,index)=>{
      //   toast(er.message)
      // })
      setErrors(err.response.data.errors)
    })

  }
  return (
    <div>
      <h5 className='mb-4'>Ready To Add Your Own Recipe?</h5>
      <form onSubmit={handleSubmit} className='mx-auto d-flex flex-column myForm p-3'>
        <div id='topField'>
          <div className='d-flex flex-column gap-1'>
          <div className='d-flex '>
            <label className='form-label regLabel'>Reicipe Name</label>
            <input className='form-control regInput' type="text" name='recipeName' onChange={(e)=>setRecipeName(e.target.value)}/>
          </div>
          {errors.recipeName && <span className='text-danger'>{errors.recipeName.message}</span>} <br/>
          <div className='d-flex ingFields'>
            <label className='form-label regLabel'>Cook in minutes</label>
            <input className='form-control regInput' type="number" name='cookTime' onChange={(e)=>setCookTime(e.target.value)}/>
          </div>
          {errors.cookTime && <span className='text-danger'>{errors.cookTime.message}</span>} <br/>
          <div className='d-flex ingFields'>
            <label className='form-label regLabel'>Yields</label>
            <div className='d-flex regInput'>
              <div>
            <input className='form-control col-7' type="number" name='cookTime' onChange={(e)=>setYields(e.target.value)}/><span className="" id='servings'>Servings</span></div>
            </div>
            </div>
          {errors.yields && <span className='text-danger'>{errors.yields.message}</span>} <br/>
          </div>
            <div>
              <AddProfilePic type={type} setUrl={setUrl}/>
            </div>
        </div>
        <div className=''>
        <label className='text-center'>Ingredients:</label>
        {ingredients.map((element,index) => (
          <div key={index} className="mt-1 pb-2">
            <div className='w-100 ingBox'>
              <div className='d-flex ingField'>
                <label className='from-label ingLabel'>Name:</label>
                <input className='form-control ingInput' type="text" name='ingredient' value={element.ingredient || ""}  onChange={e=>handleChange(index,e)}/>
              </div>
              <div className='d-flex ingField'>
                <label className='from-label ingLabel qtyLabel'>Quantity</label>
                <input className='form-control ingInput qty' type="number" name='qty' value={element.qty || ""} onChange={e=>handleChange(index,e)}/>
              </div>
              <div className='d-flex ingField'>
                <label className='from-label ingLabel uomLabel'>Unit of Measure</label>
                <input className='form-control ingInput qty' type="text" name='uom' value={element.uom || ""} onChange={e=>handleChange(index,e)}/>
              </div>
            </div>
            
            {
              index ?
              <button type='button' className='btn btn-danger removeBtn' onClick={()=>removeIngredientsFields(index)}>Remove Ingredient</button>
              :null
            }
          </div>
        ))}
        <button className='btn btn-info mb-2' type='button' onClick={()=>addIngredientsFields()}>Add Ingredient</button>
        </div>
        <div className='d-flex'>
          <label className='form-label col-4'>Directions</label>
          <textarea rows="6" cols="50" className='col-7' type="text" name='directions' onChange={(e)=>setDirections(e.target.value)}/>
        </div>
          {errors.directions && <span className='text-danger'>{errors.directions.message}</span>} <br/>
        
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
        
        {/* <div className='mt-5'> */}
          
          <button className='submitBtn' type="submit">Submit</button>
        {/* </div> */}
      </form>
      {/* <button onClick={notify}>Toast Test</button> */}
    </div>
  )
}

export default AddRecipe
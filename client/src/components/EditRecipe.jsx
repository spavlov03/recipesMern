import {useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import AddProfilePic from './AddProfilePic';


const EditRecipe = ({loggedUser,setOneRecipe}) => {
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />))
  (({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },'&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,},
      },'&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff'},
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),},}));
  const [recipeName,setRecipeName] = useState('');
  const [cookTime,setCookTime] = useState();
  const [yields,setYields] = useState("")
  const [directions,setDirections] = useState('');
  const [status,setStatus] = useState('');
  const [ingredients,setIngredients] = useState([{ingredient:"",qty:"",uom:""}])
  const [errors,setErrors] = useState({});
  const navigate = useNavigate();
  const {id} = useParams();
  // const [recipe,setRecipe] = useState({}); 
  const [approved, setApproved] = useState("pending");
  const [checked,setChecked] = useState(false);
  const type = "Recipe"
  const [recipeImg,setRecipeImg] = useState("")

  const switchHandler = (event) => {
    setChecked(event.target.checked)
    if (checked === false) {
      setApproved("pending")
    } else {
      setApproved("approved")
    }
  
  };

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/recipe/${id}`,{withCredentials:true})
    .then((res)=>{
      setRecipeName(res.data.recipeName);
      setCookTime(res.data.cookTime);
      setYields(res.data.yields)
      setDirections(res.data.directions);
      setIngredients(res.data.ingredients);
      setStatus(res.data.status);
      res.data.status==="approved"?setChecked(true):setChecked(false);
      setOneRecipe(res.data)
      setRecipeImg(res.data.recipeImg)
    })
    .catch(err=>console.log(err))
    },[id,setOneRecipe])

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
      yields,
      directions, 
      ingredients,
      status:loggedUser.type==="admin"?approved:"pending",
      recipeImg, 
    },{withCredentials:true})
    .then(res=>{
      console.log(res.data); 
      loggedUser.type==="admin"?navigate('/admin'):
      navigate(-1)
    })
    .catch((err)=> { 
      console.log(err)
      setErrors(err.response.data.errors)
    })
  }
  return (
    <div className=''>
      <h5 className='mb-4'>Edit {recipeName}</h5>
      <div className='mx-auto d-flex flex-column myForm p-3'>
        <div id='topField'>
          <div className='d-flex flex-column gap-1 mx-auto'> 
            <div className='regBox'>
              <input className='form-control regInput' type="text" name='recipeName' placeholder='Recipe Name' value={recipeName} onChange={(e)=>setRecipeName(e.target.value)}/>
              {errors.recipeName && <span className='text-danger'>{errors.recipeName.message}</span>}
            </div>
            <div className='regBox'>
              <input className='form-control regInput' type="text" name='cookTime' placeholder='Cook Time' value={cookTime} onChange={(e)=>setCookTime(e.target.value)}/>
              {errors.cookTime && <span className='text-danger'>{errors.cookTime.message}</span>} 
            </div>
            <div className='regBox'>
              <input className='form-control regInput' type="number" value={yields} onChange={(e)=>setYields(e.target.value)} placeholder="How Many Servings?"/>
              {errors.yields && <p className='text-danger'>{errors.yields.message}</p>}
            </div>
            {loggedUser.type==="admin"?<p><FormControlLabel control={<FormControlLabel control={<IOSSwitch sx={{ m: 1 }} checked={checked} onChange={switchHandler} />} label="Approve"/>}/></p>:null}
          </div>
          <div className='mx-auto'>
            <img className ="detailPic polaroid" src={recipeImg} alt="recipe" />
            <AddProfilePic setUrl={setRecipeImg} type={type}/>
          </div>
        </div>
        <div>
          <label>Ingredients:</label>
          {ingredients.map((element,index) => (
          <div key={index} className="mt-1 pb-2 d-flex flex-column">
            <div className='d-flex ingBox '>
              <input className='form-control ingInput' placeholder='Ingredient Name' type="text" name='ingredient' value={element.ingredient || ""}  onChange={e=>handleChange(index,e)}/>
              <input className='form-control ingInput' placeholder='Quantity' type="text" name='qty' value={element.qty || ""} onChange={e=>handleChange(index,e)}/>
              <input className='form-control ingInput' placeholder='Unit Of Measure' type="text" name='uom' value={element.uom || ""} onChange={e=>handleChange(index,e)}/>
            </div>
            {index?<button type='button' className='btn btn-danger removeBtn' onClick={()=>removeIngredientsFields(index)}>Remove Ingredient</button>:null}
          </div>
        ))}
        <button className='btn btn-info mb-2' type='button' onClick={()=>addIngredientsFields()}>Add Ingredient</button>
      </div>
      <textarea rows="6" cols="50" className='col-7 form-control directions' placeholder='Directions' type="text" name='directions' value={directions} onChange={(e)=>setDirections(e.target.value)}/>
      <div className='directionsInput'>
      {errors.directions && <span className='text-danger'>{errors.directions.message}</span>} 
      </div>
      <button onClick={handleSubmit} className='btn btn-success saveBtn' type="submit">Save Recipe</button>
      </div>
    </div>
  )
}

export default EditRecipe
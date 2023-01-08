import {useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';


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
  const [cookTime,setCookTime] = useState(0);
  const [directions,setDirections] = useState('');
  const [status,setStatus] = useState('');
  const [ingredients,setIngredients] = useState([{ingredient:"",qty:"",uom:""}])
  const [errors,setErrors] = useState({});
  const navigate = useNavigate();
  const {id} = useParams();
  const [recipe,setRecipe] = useState({}); 
  const [approved, setApproved] = useState("pending");
  const [checked,setChecked] = useState(false);

  const switchHandler = (event) => {
    setChecked(event.target.checked)
    if (checked === true) {
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
      setDirections(res.data.directions);
      setIngredients(res.data.ingredients);
      setStatus(res.data.status);
      setOneRecipe(res.data)
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
      directions, 
      ingredients, 
      status:loggedUser.type==="admin"?approved:"pending",
      // creatorId: user._id, 
      // creatorFirstName: user.firstName,
      // creatorLastName: user.lastName
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
    <div>
      <p>Edit {recipe.recipeName}</p>
      {/* <p>Your Name is {user.firstName} and ID is {user._id}</p> */}
      <form onSubmit={handleSubmit} className='mx-auto recipeForm'>
        <label className='form-label'>Reicipe Name</label>
        <input className='form-control' type="text" name='recipeName' value={recipeName} onChange={(e)=>setRecipeName(e.target.value)}/>
        <label className='form-label'>Time to cook</label>
        <input className='form-control' type="text" name='cookTime' value={cookTime} onChange={(e)=>setCookTime(e.target.value)}/>
        <label className='form-label'>Directions</label>
        <textarea className='form-control' type="text" name='directions' value={directions} onChange={(e)=>setDirections(e.target.value)}/>
        {loggedUser.type==="admin"?<p><FormControlLabel control={<FormControlLabel control={<IOSSwitch sx={{ m: 1 }} checked={checked} onChange={switchHandler} />} label="Approve"/>}/></p>:null}
          {/* <div className="container">
            <p>Approved : </p>
            <div className="toggle-switch">
              <input type="checkbox" className="checkbox" name="status" id="status"/>
              <label className="label" htmlFor="status">
                <span className="inner" />
                <span className="switch" />
            </label>
            </div>
            <Switch checked={checked} onChange={switchHandler}/>
          </div> */}
        <label>Ingredients:</label>
        {ingredients.map((element,index) => (
          <div key={index} className='ingBox'>
            <label className='form-label ingLabel'>Name:</label>
            <input className='form-control ingInput' type="text" name='ingredient' value={element.ingredient || ""}  onChange={e=>handleChange(index,e)}/>
            <label className='form-label ingLabel'>Quantity</label>
            <input className='form-control ingInput' type="text" name='qty' value={element.qty || ""} onChange={e=>handleChange(index,e)}/>
            <label className='form-label ingLabel'>Unit of Measure</label>
            <input className='form-control ingInput' type="text" name='uom' value={element.uom || ""} onChange={e=>handleChange(index,e)}/>
            {
              index ?
              <button type='button' className='btn btn-danger mt-2' onClick={()=>removeIngredientsFields(index)}>Remove Ingredient</button>
              :null
            }
          </div>
        ))}
        <div className=''>
          <button className='btn btn-info mt-2' type='button' onClick={()=>addIngredientsFields()}>Add Ingredient</button>
        </div>
          <button className='btn btn-success mt-3' type="submit">Edit Recipe</button>
      </form>
    </div>
  )
}

export default EditRecipe
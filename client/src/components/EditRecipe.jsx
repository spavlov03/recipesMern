import {useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const EditRecipe = ({user,setUser}) => {
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
    })
    .catch(err=>console.log(err))
    },[])

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
      status:approved,
      // creatorId: user._id, 
      // creatorFirstName: user.firstName,
      // creatorLastName: user.lastName
    },{withCredentials:true})
    .then(res=>{
      console.log(res.data); 
      user.type==="admin"?navigate('/admin'):
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
        {user.type=="admin"?<p><FormControlLabel control={<Switch checked={checked} onChange={switchHandler}/>} label="Approve" /></p>:null}
          {/* <div className="container">
            <p>Approved : </p>
            <div className="toggle-switch">
              <input type="checkbox" className="checkbox" name="status" id="status"/>
              <label className="label" htmlFor="status">
                <span className="inner" />
                <span className="switch" />
            </label>
            </div>
          </div> */}
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
import {useState} from 'react'
import axios from 'axios'

const AddRecipe = () => {
  const [recipeName,setRecipeName] = useState('');
  const [cookTime,setCookTime] = useState(0);
  const [directions,setDirections] = useState('');
  const [ingredients,setIngredients] = useState([{ingredient:"",qty:"",uom:""}])
  const [errors,setErrors] = useState({});

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
    console.log(`Recipe name is ${recipeName}`)
    console.log(`Cook time is ${cookTime}`)
    console.log(`Directions are ${directions}`)
    console.log(`Ingredients are ${ingredients}`)
    axios.post('http://localhost:8000/api/recipe',{
      recipeName,
      cookTime,
      directions, 
      ingredients
    })
    .then(res=>{
      console.log(res.data); 
    })
    .catch((err)=> { 
      console.log(err)
      setErrors(err.response.data.errors)
    })

  }
  return (
    <div>
      <p>Add A recipe</p>
      <form onSubmit={handleSubmit}>
        <label className='form-label'>Reicipe Name</label>
        <input className='form-control' type="text" name='recipeName' onChange={(e)=>setRecipeName(e.target.value)}/>
        <label className='form-label'>Time to cook</label>
        <input className='form-control' type="text" name='cookTime' onChange={(e)=>setCookTime(e.target.value)}/>
        <label className='form-label'>Directions</label>
        <input className='form-control' type="text" name='directions' onChange={(e)=>setDirections(e.target.value)}/>
        <label>Ingredients:</label>
        {ingredients.map((element,index) => (
          <div>
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
          <button className='btn btn-success ms-2' type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddRecipe
import React from 'react'

const AddRecipe = () => {
  return (
    <div>
      <p>Add A recipe</p>
      <form>
        <label className='form-label'>Reicipe Name</label>
        <input className='form-control' type="text" />
        <label className='form-label'>Time to cook</label>
        <input className='form-control' type="text" />
        <label className='form-label'>Directions</label>
        <input className='form-control' type="text" />
        <label>Ingredients:</label>
        
      </form>
    </div>
  )
}

export default AddRecipe
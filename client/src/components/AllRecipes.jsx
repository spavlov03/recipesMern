
import { useState,useEffect } from 'react'
// import { Link } from 'react-router-dom'
import CoverFlow from './CoverFlow'




const AllRecipes = ({recipes,meals}) => {
  


  return (
    <div className='me-5 ms-5'>
      <CoverFlow recipes={recipes}/>
      <CoverFlow recipes={meals}/>
    </div>
  )
}

export default AllRecipes
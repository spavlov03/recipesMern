import axios from 'axios'
import { useState,useEffect } from 'react'
// import { Link } from 'react-router-dom'
import CoverFlow from './CoverFlow'




const Api = ({allRecipes}) => {
  

  return (
    <div className='me-5 ms-5'>
      <CoverFlow recipes={allRecipes}/>
    </div>
  )
}

export default Api
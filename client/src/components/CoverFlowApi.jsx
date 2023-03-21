import React from 'react'
import { Link } from 'react-router-dom';


const CoverFlowApi = ({recipes}) => {
  return (
    <div className=''>
      {recipes.length===0?<p>No Results</p>:
      <div className='coverFlow'>
        
      {recipes?.map((recipe,index)=> {
        return <div className='' key={index}>
                  <div className='polaroid2'>
                    <Link to={`/recipe/${recipe._id}`}>
                    <img className='recipeImg' src={recipe.thumbnail_url} alt={recipe.name}/>
                    <p>{recipe.name}</p>
                    </Link>
                  </div>
                </div>
      })}
      </div>
}
    </div>
  )
}

export default CoverFlowApi
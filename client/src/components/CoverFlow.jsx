import React from 'react'
import { Link } from 'react-router-dom';


const CoverFlow = ({recipes}) => {
  return (
    <div className=''>
      {recipes.length===0?<p>No Results</p>:
      <div className='coverFlow'>
        
      {recipes?.map((recipe,index)=> {
        return <div className='' key={index}>
            {recipe._id?<div className='polaroid2'>
                    <Link to={`/recipe/${recipe._id}`}>
                    <img className='recipeImg' src={recipe.recipeImg} alt={recipe.recipeName}/>
                    <p>{recipe.recipeName}</p>
                    </Link>
                  </div>
          :<div className='polaroid2'>
          <Link to={`/recipe/${recipe.idMeal}`}>
          <img className='recipeImg' src={recipe.strMealThumb} alt={recipe.strMeal}/>
          <p>{recipe.strMeal}</p>
          </Link>
        </div>}
                </div>
      })}
      </div>
}
    </div>
  )
}

export default CoverFlow
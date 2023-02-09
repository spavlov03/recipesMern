import React from 'react'
import { Link } from 'react-router-dom';


const CoverFlow = ({recipes,socket,setRecipes}) => {
  socket.on('recipeDeleted',(deletedId)=> { 
    setRecipes(recipes.filter((recipe)=> recipe._id !== deletedId))
  })
  return (
    <div className=''>
      {recipes.length===0?<p>No Results</p>:
      <div className='coverFlow'>
        
      {recipes?.map((recipe,index)=> {
        return <div className='' key={index}>
                  <div className='polaroid2'>
                    <Link to={`/recipe/${recipe._id}`}>
                    <img className='recipeImg' src={recipe.recipeImg} alt={recipe.recipeName}/>
                    <p>{recipe.recipeName}</p>
                    </Link>
                  </div>
                </div>
      })}
      </div>
}
    </div>
  )
}

export default CoverFlow
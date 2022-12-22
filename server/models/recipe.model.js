const mongoose = require('mongoose')
const RecipeSchema = mongoose.Schema({
  recipeName:{
    type:String
  }, 
  cookTime:{
    type:Number
  }, 
  directions:{ 
    type:String
  }, 
  ingredients:{
    type:[IngredietnsSchema]
  }
})
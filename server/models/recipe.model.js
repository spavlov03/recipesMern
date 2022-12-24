const mongoose = require('mongoose')
const IngredientsSchema = mongoose.Schema({
  ingredient:String,
  qty:Number, 
  uom:String
})

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
    type:[IngredientsSchema]
  },
  creator:{
    type:String
  }
})

const Recipe = mongoose.model("Recipe",RecipeSchema)
module.exports = Recipe
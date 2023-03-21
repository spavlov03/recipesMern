const mongoose = require('mongoose')

const IngredientsSchema = mongoose.Schema({
  ingredient:{
    type:String,
  },
  qty:{
    type:Number,
  },
  uom:{
    type:String,
  },
})

const RecipeSchema = mongoose.Schema({
  name:{
    type:String, 
    required: [true,"Recipe name is required"]
  }, 
  cookTime:{
    type:Number, 
    required: [true,"Cook time is required"]
  },
  yields:{
    type:Number, 
    required: [true,"Must enter number of servings"]
  }, 
  directions:{ 
    type:String, 
    required: [true,"Directions are required"]
  }, 
  ingredients:{
    type:[IngredientsSchema], 
    required: [true,"Must list at least one ingredient"]
  },
  creatorId:{
    type:String
  }, 
  status:{
    type:String, 
    enum: ['pending','approved']
  },  
  thumbnail_url: { 
    type:String,
  }, 
  likes: { 
    type:[String], 
  }
})

const Recipe = mongoose.model("Recipe",RecipeSchema)
module.exports = Recipe
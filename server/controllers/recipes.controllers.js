const Recipe = require('../models/recipe.model')
module.exports = {
  createRecipe: (req,res) => { 
    Recipe.create(req.body)
    .then(recipe=> {
      res.json(recipe)})
    .catch(err=>{
      res.status(400).json(err);
      console.log(err)})
  }, 
  getOneRecipe: (req,res) => { 
    Recipe.findOne({_id:req.params.id})
    .then(recipe => res.json(recipe))
    .catch(err=>res.json(err))
  }, 
  updateRecipe: (req,res) => { 
    Recipe.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
    .then(recipe=>res.json(recipe))
    .catch(err=>res.status(400).json(err))
  }, 
  findPending: (req,res) => { 
    Recipe.find({status:"pending"})
    .then(recipes=>res.json(recipes))
    .catch(err=>res.json(err))
  }, 
  findApproved: (req,res) => { 
    Recipe.find({status:"approved"})
    .then(recipes=>res.json(recipes))
    .catch(err=>res.json(err))
  }, 
  findRecipesByUser: (req,res) => { 
    Recipe.find({creatorId:req.params.creatorId})
    .then(recipes=>res.json(recipes))
    .catch(err=>{
      res.json(err)})
  }, 
  deleteRecipe: (req,res) => { 
    Recipe.deleteOne({_id:req.params.id})
    .then(recipe =>res.json(recipe))
    .catch(err=>res.json(err))
  },
  findRecipes: (req,res) => {
    console.log(req.params.recipeName)
    Recipe.find({recipeName: {$regex: req.params.recipeName,$options:"i"},status:"approved"})
    .then(recipes=>{
      // console.log("inside then",recipes)
      res.json(recipes)})
    .catch(err=>{
      // console.log("inside error",err)
      res.json(err)})
  },
  likeRecipe: (req,res) => { 
    Recipe.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
    .then(recipe=>res.json(recipe))
    .catch(err=>res.json(err))
  },
  unlikeRecipe: (req,res) => { 
    Recipe.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
    .then(recipe=>res.json(recipe))
    .catch(err=>res.json(err))
  },  
}
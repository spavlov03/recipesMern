const Recipe = require('../models/recipe.model')
module.exports = {
  createRecipe: (req,res) => { 
    Recipe.create(req.body)
    .then(recipe=> {
      res.json(recipe)})
    .catch(err=>res.status(400).json(err))
  }, 
  // getAllRecipes: (req,res) => { 
  //   Recipe.find(req.body)
  //   .then(recipe => res.json(recipe))
  //   .catch(err=>res.json(err))
  // }, 
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
    // console.log("inside controller",req.params)
    Recipe.find({creatorId:req.params.creatorId})
    // Recipe.find({creatorId:req.params.creatorId,status:"approved"})
    .then(recipes=>res.json(recipes))
    .catch(err=>{
      // console.log("error in find")
      res.json(err)})
  }, 
  deleteRecipe: (req,res) => { 
    Recipe.deleteOne({_id:req.params.id})
    .then(recipe =>res.json(recipe))
    .catch(err=>res.json(err))
  },
  findRecipes: (req,res) => {
    console.log(`inside controller ${req.params.recipeName}`)
    // Recipe.find({ingredients:
    //         {ingredient:req.params.ingredients.ingredient}})
    Recipe.find({recipeName:
            {$regex: new RegExp("^" + req.params.recipeName.toLowerCase(),'i')},status:"approved"})
    .then(recipes=>{
      console.log(`inside then ${recipes}`); 
      res.json(recipes)})
    .catch(err=>res.json(err))
  },
  likeRecipe: (req,res) => { 
    console.log(`Recipe like in controller ${req.body}`)
    Recipe.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
    .then(recipe=>res.json(recipe))
    .catch(err=>res.json(err))
  },
  unlikeRecipe: (req,res) => { 
    console.log(`Recipe like in controller ${req.body}`)
    Recipe.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
    .then(recipe=>res.json(recipe))
    .catch(err=>res.json(err))
  },  
}
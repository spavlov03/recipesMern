const Recipe = require('../models/recipe.model')
module.exports = {
  createRecipe: (req,res) => { 
    Recipe.create(req.body)
    .then(recipe=> {
      res.json(recipe)})
    .catch(err=>res.status(400).json(err))
  }, 
  getAllRecipes: (req,res) => { 
    Recipe.find(req.body)
    .then(recipe => res.json(recipe))
    .catch(err=>res.json(err))
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
  }
}
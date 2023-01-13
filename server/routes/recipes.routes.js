const RecipesControllers = require('../controllers/recipes.controllers');
const {authenticate} = require('../config/jwt.config')
module.exports = (app) => { 
  app.post('/api/recipe',authenticate,RecipesControllers.createRecipe);
  app.get('/api/recipes',RecipesControllers.getAllRecipes);
  app.get('/api/recipe/:id',RecipesControllers.getOneRecipe);
  app.put('/api/recipe/:id',RecipesControllers.updateRecipe);
  app.get('/api/recipes/pending',authenticate,RecipesControllers.findPending)
  app.get('/api/recipes/approved',RecipesControllers.findApproved)
  app.get('/api/recipes/:creatorId',RecipesControllers.findRecipesByUser)
  app.delete('/api/recipe/:id',RecipesControllers.deleteRecipe)
}
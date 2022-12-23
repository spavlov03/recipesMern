const RecipesControllers = require('../controllers/recipes.controllers');
module.exports = (app) => { 
  app.post('/api/recipe',RecipesControllers.createRecipe);
  app.get('/api/recipes',RecipesControllers.getAllRecipes);
  app.get('/api/recipe/:id',RecipesControllers.getOneRecipe)
}
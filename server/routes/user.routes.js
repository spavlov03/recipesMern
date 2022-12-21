const userController = require('../controllers/user.controllers'); 
module.exports = (app) => { 
  app.post('/api/login',userController.loginUser);
  app.post('/api/register',userController.registerUser); 
  app.get('/api/logout',userController.logOutUser)
}
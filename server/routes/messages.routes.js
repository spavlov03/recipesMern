const MessagesControllers = require('../controllers/messages.controllers'); 
const {authenthicate} = require('../config/jwt.config')
module.exports = (app) => { 
  app.post('/api/message',MessagesControllers.createMessage); 
}
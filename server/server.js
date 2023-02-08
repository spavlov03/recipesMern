const express = require('express'); 
const cors = require('cors'); 
const app = express(); 
const PORT = 8000
require('dotenv').config()
const cookieParser = require('cookie-parser')
const socket = require('socket.io'); 
const Recipe = require('./models/recipe.model')

require("./config/mongoose.config"); 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",credentials:true
}))

const recipesRoutes = require("./routes/recipes.routes")
recipesRoutes(app);

const userRoutes = require("./routes/user.routes")
userRoutes(app);

const server = app.listen(PORT,()=>{
  console.log(`Server is up and running on port ${PORT}`)
})

// const io = socket(server, { 
//   cors: { 
//     origin: '*', 
//     methods: ['GET','POST'], 
//   }
// }); 
// io.on('connection',(socket) => { 
//   console.log('new user: ',socket.id); 
//   socket.on('deleteRecipe',(payload) => { 
//   Recipe.deleteOne({_id:payload})
//   .then((res)=>{ 
//     io.emit('recipeDeleted',payload)
//   }).catch((err)=> { 
//     console.log(err)
//   })
//   })
//   socket.on('disconnect',(socket)=> {
//     console.log('disconnected socket with id:',socket.id)
//   })
// })
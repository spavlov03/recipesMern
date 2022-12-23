const express = require('express'); 
const cors = require('cors'); 
const app = express(); 
const PORT = 8000
require('dotenv').config()
const cookieParser = require('cookie-parser')

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



app.listen(PORT,()=>{
  console.log(`Server is up and running on port ${PORT}`)
})
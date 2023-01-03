const express = require('express'); 
const cors = require('cors'); 
const app = express(); 
const PORT = 8000
require('dotenv').config()
const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser')
// const fs = require('fs')
// const path = require('path')
// const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: (req,file,cb) => { 
//     cb(null,'uploads')
//   },
//   filename: (req,file,cb) => { 
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// }); 
// const upload = multer({storage:storage}); 

require("./config/mongoose.config"); 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.set("view engine", "ejs");
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
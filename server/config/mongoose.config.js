const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1/recipes',{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(()=>{
  console.log("Connected to Recipes DB")
}) .catch((err)=>{
  console.log(err)
})

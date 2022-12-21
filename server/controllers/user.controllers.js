const User = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports = {
  registerUser:async (req,res)=>{
    try {
      const newUser = await User.create(req.body)
      const userToken = jwt.sign({_id:newUser._id,email:newUser.email},SECRET)
      res.status(201).cookie('userToken',userToken,{httpOnly:true}).json({successMessage:"User logged in",user:newUser})
    } catch(error) {
      res.status(400).json(error)
    }
  }, 
  loginUser:async (req,res)=>{
    const user = await User.findOne({email:req.body.email})
    console.log(user)
    if(!user){
      res.status(400).json({error:"Invalid email/password"})
    }
    try { 
      const isPasswordValid = await bcrypt.compare(req.body.password,user.password)
      console.log(isPasswordValid)
      if (!isPasswordValid) {
        res.status(400).json({error:"Invalid email/password"})
      }else{ 
        const userToken = jwt.sign({_id:user._id,email:user.email},SECRET)
        res.status(201).cookie('userToken',userToken,{httpOnly:true}).json({successMessage:"User logged in",user:user})
      }
    } catch(error){
      res.status(400).json({error:"Invalid email/password"})
    }
  }, 
  logOutUser:(req,res)=>{
    res.clearCookie('userToken')
    res.json({success:"User logged out"})
  }
}
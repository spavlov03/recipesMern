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
  editUser: async (req,res) => { 
    try {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    const currentUser = await User.findOneAndUpdate({ _id: user._id },(req.body));
    res.json(currentUser);
    } catch (error) {
      console.log("error in user update")
      res.status(400).json({ errors: 'Error in user update' })
    }
    },
  loginUser:async (req,res)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
      res.status(400).json({error:"Invalid email/password"});
      return;
    }
    try { 
      const isPasswordValid = await bcrypt.compare(req.body.password,user.password)
      console.log('Is Password Valid',isPasswordValid)
      if (!isPasswordValid) {
        res.status(400).json({error:"Invalid email/password"})
      }else{ 
        const userToken = jwt.sign({_id:user._id,email:user.email},SECRET);
        res.status(201).cookie('userToken',userToken,{httpOnly:false}).json({successMessage:"User logged in",user:user})
      }
    } catch(error){
      res.status(400).json({error:"Invalid email/password"})
    }
  }, 
  logOutUser:(req,res)=>{
    res.clearCookie('userToken')
    res.json({success:"User logged out"})
  }, 
  getLogged: async (req, res) => {
    try {
        const user = jwt.verify(req.cookies.userToken, SECRET);
        const currentUser = await User.findOne({ _id: user._id });
        // console.log('current user ',currentUser)
        res.json(currentUser);
    } catch (error) {
        console.log("ERROR")
        res.status(400).json({ errors: 'failed to get logged in user' })
    }
  },
  getOneUser:(req,res)=>{ 
    User.findById({_id:req.params.id})
    .then(oneUser => res.json(oneUser))
    .catch(err=>res.json(err))
  },
}
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); 
const uniqueValidator = require('mongoose-unique-validator')

const ProfilePicSchema = mongoose.Schema({
  name:String, 
  desc:String, 
  img:{
    data:Buffer,
    contentType:String
  }
})

const UserSchema = new mongoose.Schema({
  firstName:{
    type:String, 
    minLength: [2,"First name must be at least 2 characters"], 
    required: [true,"First name is required"]
  }, 
  lastName: { 
    type:String, 
    minLength: [2,"Last name must be at least 2 characters"], 
    required: [true,"Last name is required"]
  }, 
  email:{
    type:String,
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }, 
    unique: true, 
    required: [true,"Email is required"]
  }, 
  password:{
    type:String, 
    required: [true,"Password is required"], 
    minLength: [8,"Password must be at least 8 characters"], 
    validate: {
      validator: val => /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(val),
      message: "Password must inlcude at least 1 uppercase, 1 lowercase, 1 number and 1 special character."
  }},
  type:{
    type:String, 
    enum: [
      'admin', 
      'user'
    ]
  },
  about: {
    type:String
  }, 
  pic: { 
    type: String,
  }
},{timestamps:true})

UserSchema.pre('save', async function(next){
  try{
    const hashedPassword = await bcrypt.hash(this.password,10)
    console.log(`Hashed Password: ${hashedPassword}`)
    this.password = hashedPassword
    next()
  } catch{
    console.log(`Error in save ${error}`)
  }
})

UserSchema.virtual('confirmPassword')
.get(()=>this._confirmPassword)
.set(value=>this._confirmPassword = value)


UserSchema.pre('validate',function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword','Passwords must match!')
    }
    next()
})
UserSchema.plugin(uniqueValidator,{message:"The email {VALUE} is already used."})
const User = mongoose.model('User', UserSchema)
module.exports = User
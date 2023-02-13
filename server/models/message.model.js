const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
  content: { 
    type:String,
  }, 
  sender: { 
    type:String,
  }, 
  receiver: { 
    type:String,
  }, 
  timeSent: { 
    type:Date, 
  }
})

const Message = mongoose.model("Message",MessageSchema)
module.exports = Message
const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
  content: { 
    type:String,
  }, 
  senderId: { 
    type:String,
  },
  senderName: { 
    type:String,
  }, 
  receiverId: { 
    type:String,
  }, 
  receiverName: { 
    type:String,
  },
  timeSent: { 
    type:Date, 
  }
})

const Message = mongoose.model("Message",MessageSchema)
module.exports = Message
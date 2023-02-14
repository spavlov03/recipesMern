const Message = require('../models/message.model')
module.exports = { 
  createMessage: (req,res) => { 
    Message.create(req.body)
    .then(msg=> { 
      res.json(msg)})
    .catch(err=>{
      res.json(err); 
      console.log(err); 
    })
  }, 
  getAllmessagesBySender: (req,res) => { 
    console.log(req.params)
    Message.find({sender:req.params.id})
    .then(msg=>res.json(msg))
    .catch(err=>{ 
      res.json(err)})
  }
}
import axios from 'axios';
import React from 'react'
import { useState } from 'react';

const SendMessage = ({loggedUser,thisUser}) => {
  const [content,setContent] = useState('')
  let submitHandler = (e) => { 
    e.preventDefault(); 
    console.log("send button pressed",content,loggedUser._id,thisUser)
    axios.post('http://localhost:8000/api/message',{ 
      content, 
      senderId:loggedUser._id,
      senderName: loggedUser.firstName + loggedUser.lastName,
      receiverId:thisUser._id, 
      receiverName: thisUser.firstName + thisUser.lastName,
      timeSent: Date()
    },{withCredentials:true})
    .then(res=>{ 
      console.log(res.data)
    })
    .catch((err)=> { 
      console.log(err)
    })
  }
  return (
    <div>
      <form className='d-flex flex-column' >
        <label htmlFor="content">Message: </label>
        <textarea name="content" cols="30" rows="10" onChange={e=>setContent(e.target.value)}></textarea>
        <button onClick={submitHandler}>Send</button>
      </form>
    </div>
  )
}

export default SendMessage
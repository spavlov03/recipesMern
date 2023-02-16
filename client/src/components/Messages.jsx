import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'

const Messages = ({loggedUser}) => {
  const [messages,setMessages] = useState({})
  // const [sentMessages,setSendMessages] = useState({})
  // const [receivedMessages,setReceivedMessages] = useState({})
  useEffect(()=> { 
    axios.get(`http://localhost:8000/api/messages/${loggedUser._id}`)
    .then((res)=> { 
      setMessages(res.data)
    })
    .catch(err=>console.log(err))
  },[])
  return (
    <div className='d-flex gap-5 ms-5'>
          <div className='me-5'>
            <p>Sent Messages</p>
            {!messages[0]?<p>empty</p>:
            <div>
              {messages?.map((msg,index)=>{
              return <div key={index} className=''>
                      {msg.senderId===loggedUser._id?
                      <p className='border p-3'>
                          <p className='bg-warning'>To:<br/>{msg.receiverName}</p>{msg.content}</p>:null}
                      </div>})}
            </div>}
          </div>
          <div className=''>
            <p>Received Messages</p>
            {!messages[0]?<p>empty</p>:
            <div>
              {messages?.map((msg,index)=>{
              return <div key={index} className=''>
                      {msg.receiverId===loggedUser._id?
                      <p className='border p-3'>
                        <p className='bg-info'>From:<br/>{msg.senderName} </p>{msg.content}</p>:null}
                      </div>})}
            </div>}
          </div>
          
          
      </div>
  )
}

export default Messages
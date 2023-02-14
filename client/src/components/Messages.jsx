import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'

const Messages = ({loggedUser}) => {
  const [messages,setMessages] = useState({})
  useEffect(()=> { 
    axios.get(`http://localhost:8000/api/messages/${loggedUser._id}`)
    .then((res)=> { 
      setMessages(res.data)
    })
    .catch(err=>console.log(err))
  },[])
  return (
    <div className='d-flex gap-5 ms-5'>
      {/* <div>Placeholder for users</div> */}
      <div>
        {/* {messages[2].content} */}
     {!messages[0]?<p>empty</p>:
     <div>
      {messages?.map((msg,index)=>{
          return <div key={index}>
            <p>Content: {msg.content}</p>
            <p>From : {msg.senderName}</p>
            <p>To: {msg.receiverName}</p>
            </div>
        })}
      </div>}
      </div>
    </div>
  )
}

export default Messages
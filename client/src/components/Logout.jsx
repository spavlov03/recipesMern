import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate();
  useEffect(()=> { 
    axios.get('http://localhost:8000/api/logout',{withCredentials:true})
    .then((res)=>{
      navigate("/")
      console.log(res)
    })
    .catch(err=>console.log(err))
  },[])

  return (
    <div>Logout</div>
  )
}

export default Logout
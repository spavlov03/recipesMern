import { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({setLoggedUser}) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState(""); 
  const [errors,setErrors] = useState(); 
  const navigate = useNavigate(); 
  
  const submitHandler = (e) => { 
    e.preventDefault()
    axios.post('http://localhost:8000/api/login', {
      email,
      password
    },{withCredentials:true,credentials:'include'})
    .then((res)=> { 
      setLoggedUser(res.data.user);
      navigate('/')
    })
    .catch((err)=>{ 
      console.log(err)
      setErrors(err.response.data.error)
    })
  }
  return (
    <div className='border w-50 mx-auto mt-3'>
      <p>Login</p>
      <form onSubmit={submitHandler}> 
        <label className='form-label'>Email:</label>
        <input className='form-control' type="text" onChange={(e)=>setEmail(e.target.value)}/>
        {errors && <span className='text-danger'>{errors}</span>} <br/>
        <label className='form-label'>Password:</label>
        <input className='form-control' type="password" onChange={(e)=>setPassword(e.target.value)}/>
        <input className="btn btn-info mt-3" type="submit" value="Login" />
      </form>
      </div>
  )
}

export default Login
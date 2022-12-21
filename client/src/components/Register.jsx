import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState(""); 
  const [errors,setErrors] = useState({}); 
  const navigate = useNavigate(); 
  const [confirmPassword,setConfirmPassword] = useState("")

  const submitHandler = (e) => { 
    e.preventDefault()
    axios.post('http://localhost:8000/api/register', {
      email,
      password, 
      confirmPassword
    },{withCredentials:true,credentials:'include'})
    .then((res)=> { 
      navigate('/dashboard')
    })
    .catch((err)=>{ 
      console.log(err)
      setErrors(err.response.data.errors)
    })

  }

  return (
    <div className='border w-50'>
      <p>Sign Up</p>
      <form onSubmit={submitHandler}>
        <label className='form-label'>Email:</label>
        <input className='form-control' type="text" onChange={(e)=>setEmail(e.target.value)}/>
        {errors.email && <span className='text-danger'>{errors.email.message}</span>} <br/>
        <label className='form-label'>Password:</label>
        <input className='form-control' type="text" onChange={(e)=>setPassword(e.target.value)}/>
        {errors.password && <span className='text-danger'>{errors.password.message}</span>} <br/>
        <label className='form-label'>Confirm password:</label>
        <input className='form-control' type="text" onChange={(e)=>setConfirmPassword(e.target.value)}/>
        {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>} <br/>
        <input className="btn btn-primary mt-3" type="submit" value="Register" />
      </form>
    </div>
  )
}

export default Register
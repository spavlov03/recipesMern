import {useState} from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const LogReg = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState(""); 
  const [errors,setErrors] = useState({}); 
  return (
    <div className='d-flex col-8 mx-auto gap-5 mt-5'>
      <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} errors={errors} setErrors={setErrors}/>
      <Register email={email} setEmail={setEmail} password={password} setPassword={setPassword} errors={errors} setErrors={setErrors}/>
    </div>
  )
}

export default LogReg
import {useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'
// import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import { ToastClassName } from 'react-toastify';


const Register = ({setLoggedUser}) => {
  const [firstName,setFirstName] = useState(""); 
  const [lastName,setLastName] = useState(""); 
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState(""); 
  const [errors,setErrors] = useState({}); 
  const navigate = useNavigate(); 
  const [confirmPassword,setConfirmPassword] = useState("")
  

  const submitHandler = (e) => { 
    e.preventDefault()
    axios.post('http://localhost:8000/api/register', {
      firstName, 
      lastName,
      email,
      password, 
      confirmPassword, 
      type:"user", 
      pic: "https://res.cloudinary.com/dwy8aok2u/image/upload/v1672876982/tvoxxudbgowv6qesjvft.png",
    },{withCredentials:true,credentials:'include'})
    .then((res)=> { 
      setLoggedUser(res.data.user)
      navigate('/')
      window.location.reload(false);
    })
    .catch((err)=>{ 
      console.log(err)
      setErrors(err.response.data.errors)
      // if (err.response.data.errors.firstName.message){
      //   toast(err.response.data.errors.firstName.message, {position:"top-center"})
      // }
      // toast(err.response.data.errors.lastName.message, {position:"top-center"});
      // toast(err.response.data.errors.email.message, {position:"top-center"});
      // toast(err.response.data.errors.password.message, {position:"top-center"});
      // toast(err.response.data.errors.confirmPassword.message, {position:"top-center"});
    })

  }

  return (
    <div className='container'>
    <div className='row mt-3'>
      <p>Sign Up</p>
      <form onSubmit={submitHandler} className='mx-auto border col-lg-5 col-8 col-md-6 pt-3'>
        {/* <label className='form-label'>First Name:</label> */}
        <input className='form-control' type="text" onChange={(e)=>setFirstName(e.target.value)} placeholder="Enter Fist Name"/>
        {errors.firstName && <span className='text-danger'>{errors.firstName.message}</span>} <br/>
        {/* <label className='form-label'>Last Name:</label> */}
        <input className='form-control' type="text" onChange={(e)=>setLastName(e.target.value)} placeholder="Enter Last Name"/>
        {errors.lastName && <span className='text-danger'>{errors.lastName.message}</span>} <br/>
        {/* <label className='form-label'>Email:</label> */}
        <input className='form-control' type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
        {errors.email && <span className='text-danger'>{errors.email.message}</span>} <br/>
        {/* <label className='form-label'>Password:</label> */}
        <input className='form-control' type="text" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
        {errors.password && <span className='text-danger'>{errors.password.message}</span>} <br/>
        {/* <label className='form-label'>Confirm password:</label> */}
        <input className='form-control' type="text" onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Password"/>
        {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>} <br/>
        <div>
        {/* <div>
          <input type="text" />
        </div> */}
        <input className="btn btn-primary mb-4" type="submit" value="Register" />
        </div>
      </form>
      <Link to="/login">Already Have An Account?</Link>
      </div>
    </div>
  )
}

export default Register
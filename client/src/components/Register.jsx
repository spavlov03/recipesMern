import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = ({user,setUser}) => {
  const [firstName,setFirstName] = useState(""); 
  const [lastName,setLastName] = useState(""); 
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState(""); 
  const [errors,setErrors] = useState({}); 
  const navigate = useNavigate(); 
  const [confirmPassword,setConfirmPassword] = useState("")
  const [profilePic,setProfilePic] = useState("")
  const [url,setUrl] = useState("")

  // const uploadPic = () => { 
  //   const data = new FormData()
  //   data.append('file',profilePic)
  //   data.append("upload_preset",'insta-clone')
  //   data.append("cloud_name",'cnq')
  //   fetch('https://api.cloudinary.com/v1_1/cnq/image/upload', { 
  //     method:"post", 
  //     body:data
  //   })
  //   .then(res=>{
  //     console.log(res)
  //     res.json()})
  //   .then(data=>{ 
  //     setUrl(data.url)
  //     console.log('url is ',url)
  //   })
  //   .catch(err=>console.log(err))
  // }

  const submitHandler = (e) => { 
    // uploadPic()
    e.preventDefault()
    axios.post('http://localhost:8000/api/register', {
      firstName, 
      lastName,
      email,
      password, 
      confirmPassword, 
      type:"user"
    },{withCredentials:true,credentials:'include'})
    .then((res)=> { 
      navigate('/')
      window.location.reload(false);
    })
    .catch((err)=>{ 
      console.log(err)
      setErrors(err.response.data.errors)
    })

  }

  return (
    <div className='container'>
    <div className='row mt-3'>
      <p>Sign Up</p>
      <form onSubmit={submitHandler} className='mx-auto border col-lg-4 col-8'>
        <label className='form-label'>First Name:</label>
        <input className='form-control' type="text" onChange={(e)=>setFirstName(e.target.value)}/>
        {errors.firstName && <span className='text-danger'>{errors.firstName.message}</span>} <br/>
        <label className='form-label'>Last Name:</label>
        <input className='form-control' type="text" onChange={(e)=>setLastName(e.target.value)}/>
        {errors.lastName && <span className='text-danger'>{errors.lastName.message}</span>} <br/>
        <label className='form-label'>Email:</label>
        <input className='form-control' type="text" onChange={(e)=>setEmail(e.target.value)}/>
        {errors.email && <span className='text-danger'>{errors.email.message}</span>} <br/>
        <label className='form-label'>Password:</label>
        <input className='form-control' type="text" onChange={(e)=>setPassword(e.target.value)}/>
        {errors.password && <span className='text-danger'>{errors.password.message}</span>} <br/>
        <label className='form-label'>Confirm password:</label>
        <input className='form-control' type="text" onChange={(e)=>setConfirmPassword(e.target.value)}/>
        {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>} <br/>
        <div>
        <div className=''>
          <label className='form-label'>Upload Profile Picture:</label>
          <input type="file" onChange={(e)=>setProfilePic(e.target.files[0])}/>
        </div>
        {/* <div>
          <input type="text" />
        </div> */}
        </div>
        <input className="btn btn-primary mt-3 mb-5" type="submit" value="Register" />
      </form>
    </div>
    </div>
  )
}

export default Register
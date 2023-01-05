import {useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import AddProfilePic from './AddProfilePic'

const EditProfile = ({user,setUser}) => {
  const [firstName,setFirstName] = useState(""); 
  const [lastName,setLastName] = useState(""); 
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState(""); 
  const [errors,setErrors] = useState({}); 
  const navigate = useNavigate(); 
  const [confirmPassword,setConfirmPassword] = useState("")
  const [url,setUrl] = useState("")
  const {id} = useParams();

  
  useEffect(()=>{ 
    axios.get(`http://localhost:8000/api/user/${id}`,{withCredentials:true})
    .then((res)=>{
      setFirstName(res.data.firstName)
      setLastName(res.data.lastName)
      setUrl(res.data.pic)
    })
    .catch(err=>console.log('there is error in useEffect',err))
  },[])

  const submitHandler = (e) => { 
    e.preventDefault()
    axios.put(`http://localhost:8000/api/user/${user.id}/edit`, {
      firstName, 
      lastName,
      // email,
      // password, 
      // confirmPassword, 
      pic: url,
    },{withCredentials:true,credentials:'include'})
    .then((res)=> { 
      navigate(-1)
      // window.location.reload(false);
    })
    .catch((err)=>{ 
      console.log(err)
      setErrors(err.response.data.errors)
    })

  }

  return (
    <div className='container'>
    <div className='row mt-3'>
      <p>Edit Profile</p>
      <div className='d-flex'>
        <div className='mx-auto border col-lg-4 col-8'>
          <label className='form-label'>First Name:</label>
          <input className='form-control' type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
          {errors.firstName && <span className='text-danger'>{errors.firstName.message}</span>} <br/>
          <label className='form-label'>Last Name:</label>
          <input className='form-control' type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
          {errors.lastName && <span className='text-danger'>{errors.lastName.message}</span>} <br/>
          {/* <label className='form-label'>Email:</label>
          <input className='form-control' type="text" onChange={(e)=>setEmail(e.target.value)}/>
          {errors.email && <span className='text-danger'>{errors.email.message}</span>} <br/> */}
          {/* <label className='form-label'>Password:</label>
          <input className='form-control' type="text" onChange={(e)=>setPassword(e.target.value)}/>
          {errors.password && <span className='text-danger'>{errors.password.message}</span>} <br/>
          <label className='form-label'>Confirm password:</label>
          <input className='form-control' type="text" onChange={(e)=>setConfirmPassword(e.target.value)}/>
          {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>} <br/> */}
          <AddProfilePic url={url} setUrl={setUrl}/>
          <button className="btn btn-primary mt-3 mb-5" type="submit" onClick={submitHandler}>Save Profile</button>
        </div>
        {/* <div className='w-100'>
        </div> */}
        </div>
      </div>
    </div>
  )
}

export default EditProfile
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AddProfilePic from './AddProfilePic'

const EditProfile = ({loggedUser}) => {
  const [firstName,setFirstName] = useState(""); 
  const [lastName,setLastName] = useState(""); 
  const [email,setEmail] = useState("");
  // const [password,setPassword] = useState(""); 
  const [errors,setErrors] = useState({}); 
  const navigate = useNavigate(); 
  // const [confirmPassword,setConfirmPassword] = useState("")
  const [url,setUrl] = useState("")
  // const {id} = useParams();
  const type = "Profile"
  
  useEffect(()=>{ 
    axios.get(`http://localhost:8000/api/user/${loggedUser._id}`,{withCredentials:true})
    .then((res)=>{
      setFirstName(res.data.firstName)
      setLastName(res.data.lastName)
      setEmail(res.data.email)
      setUrl(res.data.pic)
      // setAuthor(res.data)
    })
    .catch(err=>console.log('there is error in useEffect',err))
  },[loggedUser._id])

  const submitHandler = (e) => { 
    e.preventDefault()
    axios.put(`http://localhost:8000/api/user/${loggedUser._id}/edit`, {
      firstName, 
      lastName,
      email,
      // password, 
      // confirmPassword, 
      pic: url,
    },{withCredentials:true,credentials:'include'})
    .then((res)=> { 
      navigate(`/user/${loggedUser._id}`)
      window.location.reload(false);
    })
    .catch((err)=>{ 
      console.log(err)
      setErrors(err.response.data.errors)
    })

  }

  return (
    <div className='container'>
      <p>Edit Your Profile {firstName}</p>
      <div className='d-flex'>
        <div className='mx-auto border col-lg-4 col-10 p-3'>
          <input className='form-control' type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
          {errors.firstName && <span className='text-danger'>{errors.firstName.message}</span>} <br/>
          <input className='form-control' type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
          {errors.lastName && <span className='text-danger'>{errors.lastName.message}</span>} <br/>
          <input className='form-control' type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
        {errors.email && <span className='text-danger'>{errors.email.message}</span>} <br/>
          <AddProfilePic type={type} url={url} setUrl={setUrl}/>
          <p className='mt-2'><img className="previewRec" src={url} alt="" /></p>
          <button className="btn btn-primary mt-3 mb-5" type="submit" onClick={submitHandler}>Save Profile</button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
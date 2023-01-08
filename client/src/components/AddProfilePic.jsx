import {useState} from 'react'
import { toast } from 'react-toastify'

const AddProfilePic = ({setUrl}) => {
  const [profilePic,setProfilePic] = useState("")
  // const [url,setUrl] = useState("")
  const uploadPic = (e) => { 
    const data = new FormData()
    data.append('file',profilePic)
    data.append("upload_preset",'recipes')
    data.append("cloud_name",'dwy8aok2u')
    fetch('https://api.cloudinary.com/v1_1/dwy8aok2u/image/upload', { 
      method:"post", 
      body:data
    })
    .then(res=>res.json())
    .then(data=>{ 
      console.log(data)
      setUrl(data.url)
      toast("Image Successfully Uploaded")
    })
    .catch(err=>console.log(err))
  }


  return (
    <div className=''>
      
        <label className=''>Upload Profile Picture:</label>
        <input className="mt-2" type="file" onChange={(e)=>setProfilePic(e.target.files[0])}/>
        <button className="btn btn-outline-success mx-auto mt-2" onClick={()=>uploadPic()}>Upload Photo</button>
      
    </div>
  )
}

export default AddProfilePic
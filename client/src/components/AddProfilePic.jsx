import {useState} from 'react'

const AddProfilePic = ({url,setUrl}) => {
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
    })
    .catch(err=>console.log(err))
  }


  return (
    <div className=''>
      <div className='d-flex flex-column mx-auto'>
        <label className='form-label'>Upload Profile Picture:</label>
        <input type="file" onChange={(e)=>setProfilePic(e.target.files[0])}/>
        <button className="btn btn-success w-50 mx-auto mt-1" onClick={()=>uploadPic()}>Upload Photo</button>
      </div>
    </div>
  )
}

export default AddProfilePic
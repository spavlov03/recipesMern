import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect,useState } from 'react'




const Navbar = ({loggedUser,setLoggedUser,setSearchResults}) => {
  const [search,setSearch] = useState(""); 
  const navigate = useNavigate();


  
  useEffect(()=>{ 
    // const requestOne = axios.get('http://localhost:8000/api/recipes',{withCredentials:true})
    const requestTwo = axios.get('http://localhost:8000/api/user',{withCredentials:true})
    axios.all([requestTwo])
    .then(axios.spread((...res)=>{
      // const responseOne = res[0]
      // setRecipes(responseOne.data);
      const responseTwo = res[0]
      setLoggedUser(responseTwo.data)
    }))
    .catch(err=>console.log('there is error in useEffect',err))
  },[setLoggedUser])

  let searchSubmit = (e) => { 
    e.preventDefault(); 
    console.log(`Search item is ${search}`)
    axios.get(`http://localhost:8000/api/recipes/search/${search}`)
    .then((res)=>{
      console.log(`Search result res is ${res.data}`)
      setSearchResults(res.data)})
      navigate('/recipes/searchResult')
    .catch(err=>console.log(`Error in search submit--- ${err}`))
  }
  
  return (
    <div className=''>
      <nav className="navbar navbar-expand-lg myNav"> 
             {/* Change color of Navbar from here ^^^^ */}
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/' >Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/allRecipes'>All Recipes</Link>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to='/dashboard'>Dashboard</NavLink>
              </li> */}
              {/* <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Login/Reg</NavLink>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to='/login'>Login</Link></li>
                  <li><Link className="dropdown-item" to='/register'>Register</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><Link className="dropdown-item" href="#">Something else here</Link></li>
                </ul>
              </li> */}
              <li className="nav-item">
                {!loggedUser._id? null : <Link className="nav-link active" to="/add-recipe">Add Recipe</Link> }
              </li>
              {loggedUser.type==="admin"? <li className="nav-item">
          <Link className="nav-link active" to='/admin'>Pending Approval</Link>
        </li> : null }
        
            </ul>
      <form onSubmit={searchSubmit} className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search Recipes" aria-label="Search Recipes" onChange={(e)=>setSearch(e.target.value)}/>
        <button className="btn btn-outline-primary" type="submit">Search</button>
      </form>
      <ul className="navbar-nav mb-2 mb-lg-0">
      {loggedUser._id? null :
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to='/login'>Login</Link>
        </li> }
        {loggedUser._id? null :
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to='/register'>Register</Link>
        </li> }
        {!loggedUser._id? null :
        <li className="nav-item">
          <Link className="nav-link" to="/logout">Logout</Link>
        </li> }

      </ul>
        </div>
        {!loggedUser._id? null :
        <Link className='' to={`/user/${loggedUser._id}`}>
          <img className ="profilePic rounded-3 me-2" src={loggedUser.pic} alt="profile pic" />
          <span>{loggedUser.firstName}</span></Link>}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
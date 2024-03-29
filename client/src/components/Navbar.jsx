import { NavLink, useNavigate,Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect,useState } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";


const Navbar = ({loggedUser,setLoggedUser,setSearchResults}) => {
  const [search,setSearch] = useState(""); 
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);



  
  useEffect(()=>{ 
    // const requestOne = axios.get('http://localhost:8000/api/recipes',{withCredentials:true})
    const requestTwo = axios.get('http://localhost:8000/api/user',{withCredentials:true,credentials:'include'})
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
    // console.log(`Search item is ${search}`)
    axios.get(`http://localhost:8000/api/recipes/search/${search}`)
    .then((res)=>{
    //   // const currentApiResults = res.data;
    //   // console.log(`Search result res is ${res.data}`)
    //   setSearchResults(res.data)
      // navigate('/recipes/searchResult')})
    // .catch(err=>console.log(err))
    const currentApiResults = res.data;
        
    // Use the MealDB API for searching
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((res) => {
        const mealDbResults = res.data.meals || []; // If no results, set as an empty array
        
        // Combine both API results
        const combinedResults = [...currentApiResults, ...mealDbResults];
        
        setSearchResults(combinedResults);
        navigate('/recipes/searchResult')})
      })
      .catch(err => console.log(err));
  }
  
  return (
    // <div className=''>
    <nav className="navbar navbar-expand-lg myNav collapseOnSelect"> 
             {/* Change color of Navbar from here ^^^^ */}
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse} >
          <span className="navbar-toggler-icon" ></span>
          </button>
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent" >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              <li className="nav-item">
                <Link className="nav-link navLink" aria-current="page" to='/' onClick={()=>setIsNavCollapsed(!isNavCollapsed)}><i className="bi bi-house-door"></i></Link>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link navLink" aria-current="page" to='/allRecipes' onClick={()=>setIsNavCollapsed(!isNavCollapsed)}>All Recipes</NavLink>
              </li>
              <li className="nav-item">
                {!loggedUser._id? null : <NavLink className="nav-link navLink" to="/add-recipe" onClick={()=>setIsNavCollapsed(!isNavCollapsed)}>Add Recipe</NavLink> }
              </li>
              {loggedUser.type==="admin"? <li className="nav-item">
          <NavLink className="nav-link navLink" to='/admin' onClick={()=>setIsNavCollapsed(!isNavCollapsed)}>Pending Approval</NavLink>
        </li> : null }
        
            </ul>
      <form onSubmit={searchSubmit} className="d-flex justify-content-center" role="search">
        <input className="form-control me-2 searchInput text-center" type="search" placeholder="Search Recipes" aria-label="Search Recipes" onChange={(e)=>setSearch(e.target.value)}/>
        <button className="btn searchBtn" type="submit" onClick={()=>setIsNavCollapsed(!isNavCollapsed)}><i className="bi bi-search"></i></button>
      </form>
      <ul className="navbar-nav mb-2 mb-lg-0">
      {loggedUser._id? null :
        <li className="nav-item">
          <NavLink className="nav-link navLink" aria-current="page" to='/login' onClick={()=>setIsNavCollapsed(!isNavCollapsed)}>Login</NavLink>
        </li> }
        {loggedUser._id? null :
        <li className="nav-item">
          <NavLink className="nav-link navLink" aria-current="page" to='/register' onClick={()=>setIsNavCollapsed(!isNavCollapsed)}>Register</NavLink>
        </li> }
        {!loggedUser._id? null :
        <li className="nav-item">
          <NavLink className="nav-link navLink" to="/logout" onClick={()=>setIsNavCollapsed(!isNavCollapsed)}>Logout</NavLink>
        </li> }

      </ul>
        </div>
        {!loggedUser._id? null :
        <NavLink className='' to={`/user/${loggedUser._id}`} onClick={()=>setIsNavCollapsed(true)}>
          <img className ="profilePic rounded-3 me-2" src={loggedUser.pic} alt="profile pic" />
          <span className='navLink'>{loggedUser.firstName}</span></NavLink>}
        </div>
      </nav>
    // </div>cd 
  )
}

export default Navbar
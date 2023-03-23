import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import AddRecipe from './components/AddRecipe';
import ViewRecipe from './components/ViewRecipe';
import EditRecipe from './components/EditRecipe';
import AdminPanel from './components/AdminPanel';
import NotAuthorized from './components/NotAuthorized';
import UserDetail from './components/UserDetail';
import { useEffect, useState } from 'react';
import EditProfile from './components/EditProfile';
import { ToastContainer } from 'react-toastify';
import CoverFlow from './components/CoverFlow';
import AllRecipes from './components/AllRecipes';
import Api from './components/Api';
import ViewRecipe2 from './components/ViewRecipe2';
import axios from 'axios'




function App() {
  // const [user,setUser] = useState({});
  const [oneRecipe,setOneRecipe] =useState({});
  const [loggedUser,setLoggedUser] = useState({_id:null}); 
  // const [thisUser,setThisUser] = useState({}); 
  const [searchResults,setSearchResults] = useState([])
  const [allRecipes,setAllRecipes] = useState([])

  const [recipes,setRecipes] = useState([]); 
  const [apiRec,setApiRec] = useState([]);
  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: {from: '0', size: '20', tags: 'under_30_minutes'},
    headers: {
      'X-RapidAPI-Key': 'e3d9cc7f6cmshf9a3771f789b43dp106b9ajsne22f3873bb9c',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  };
  // useEffect(()=> {
  // axios.request(options).then(function (response) {
  //   console.log(response.data.results)
  //   setApiRec(response.data.results);
  // }).catch(function (error) {
  //   console.error(error);
  // });
  // },[])
  useEffect(()=>{ 
    const requestOne = axios.get('http://localhost:8000/api/recipes/approved',{withCredentials:true})
    axios.all([requestOne])
    .then(axios.spread((...res)=>{
      const responseOne = res[0]
      setAllRecipes(responseOne.data);
      // setAllRecipes([...recipes,...apiRec])
    }))
    .catch(err=>console.log('there is error in useEffect',err))
  },[])
  
  // setAllRecipes(...recipes)


  return (
    <div className="App ">
      <BrowserRouter>
        <div className='custom'>

        <Navbar loggedUser={loggedUser} setLoggedUser={setLoggedUser} setSearchResults={setSearchResults}/>
        </div>
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<Dashboard loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          <Route path='/login' element={<Login loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          <Route path='/register' element={<Register loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          {loggedUser.type==="admin"?<Route path='/admin' element={<AdminPanel loggedUser={loggedUser}/>}/>:<Route path='/admin' element={<NotAuthorized/>}/>}
          <Route path='/logout' element={<Logout loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          <Route path='/recipe/:id' element={<ViewRecipe2 loggedUser={loggedUser} allRecipes={allRecipes} />}/>
          {loggedUser._id?<Route path='/add-recipe' element={<AddRecipe loggedUser={loggedUser}/>}/>:<Route path='/add-recipe' element={<NotAuthorized/>}/>}
          {loggedUser._id===oneRecipe.creatorId || loggedUser.type==="admin"?<Route path='/recipe/:id/edit' element={<EditRecipe loggedUser={loggedUser} allRecipes={allRecipes}/>}/>:<Route path='/recipe/:id/edit' element={<NotAuthorized/>}/>}
          <Route path='/user/:id' element={<UserDetail loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          {loggedUser._id?<Route path={`/user/${loggedUser._id}/edit`} element={<EditProfile loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>:<Route path='/user/:id/edit' element={<NotAuthorized/>}/>}
          <Route path='/recipes/searchResult' element={<CoverFlow recipes={allRecipes}/>}/>
          <Route path='/allRecipes' element={<AllRecipes allRecipes={allRecipes}/>}/>
          <Route path='/api' element={<Api allRecipes={allRecipes}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

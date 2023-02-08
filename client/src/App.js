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




function App() {
  // const [user,setUser] = useState({});
  const [oneRecipe,setOneRecipe] =useState({});
  const [loggedUser,setLoggedUser] = useState({_id:null}); 
  // const [thisUser,setThisUser] = useState({}); 
  const [searchResults,setSearchResults] = useState([])


  return (
    <div className="App ">
      <BrowserRouter>
        <div className='custom'>

        <Navbar loggedUser={loggedUser} setLoggedUser={setLoggedUser} setSearchResults={setSearchResults}/>
        </div>
        <ToastContainer/>
        <Routes>
          <Route path='/login' element={<Login loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          <Route path='/register' element={<Register loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          <Route path='/' element={<Dashboard loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          {loggedUser.type==="admin"?<Route path='/admin' element={<AdminPanel loggedUser={loggedUser}/>}/>:<Route path='/admin' element={<NotAuthorized/>}/>}
          <Route path='/logout' element={<Logout loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          <Route path='/recipe/:id' element={<ViewRecipe loggedUser={loggedUser} oneRecipe={oneRecipe} setOneRecipe={setOneRecipe} />}/>
          {loggedUser._id?<Route path='/add-recipe' element={<AddRecipe loggedUser={loggedUser}/>}/>:<Route path='/add-recipe' element={<NotAuthorized/>}/>}
          {loggedUser._id===oneRecipe.creatorId || loggedUser.type==="admin"?<Route path='/recipe/:id/edit' element={<EditRecipe loggedUser={loggedUser} oneRecipe={oneRecipe} setOneRecipe={setOneRecipe}/>}/>:<Route path='/recipe/:id/edit' element={<NotAuthorized/>}/>}
          <Route path='/user/:id' element={<UserDetail loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          {loggedUser._id?<Route path={`/user/${loggedUser._id}/edit`} element={<EditProfile loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>:<Route path='/user/:id/edit' element={<NotAuthorized/>}/>}
          <Route path='/recipes/searchResult' element={<CoverFlow recipes={searchResults}/>}/>
          <Route path='/allRecipes' element={<AllRecipes />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

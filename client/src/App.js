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
import { useState } from 'react';
import AddProfilePic from './components/AddProfilePic';
import EditProfile from './components/EditProfile';

function App() {
  const [user,setUser] = useState({});
  const [oneRecipe,setOneRecipe] =useState({});
  const [loggedUser,setLoggedUser] = useState({_id:null}); 

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
        <Routes>
          {/* <Route path='/' element={<Home/>}/> */}
          <Route path='/login' element={<Login user={user} setUser={setUser} loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          <Route path='/register' element={<Register user={user} setUser={setUser} loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          <Route path='/' element={<Dashboard user={user} setUser={setUser} loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          {loggedUser.type==="admin"?<Route path='/admin' element={<AdminPanel loggedUser={loggedUser}/>}/>:<Route path='/admin' element={<NotAuthorized/>}/>}
          <Route path='/logout' element={<Logout setUser={setUser} loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          <Route path='/recipe/:id' element={<ViewRecipe user={user} setUser={setUser} oneRecipe={oneRecipe} setOneRecipe={setOneRecipe}/>}/>
          {loggedUser._id?<Route path='/add-recipe' element={<AddRecipe user={user} setUser={setUser}/>}/>:<Route path='/add-recipe' element={<NotAuthorized/>}/>}
          {loggedUser._id===oneRecipe.creatorId || user.type==="admin"?<Route path='/recipe/:id/edit' element={<EditRecipe user={user} setUser={setUser} oneRecipe={oneRecipe} setOneRecipe={setOneRecipe}/>}/>:<Route path='/recipe/:id/edit' element={<NotAuthorized/>}/>}
          <Route path='/user/:id' element={<UserDetail user={user} setUser={setUser} loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
          {loggedUser._id || loggedUser._id===oneRecipe.creatorId?<Route path='/user/:id/edit' element={<EditProfile user={user} setUser={setUser}/>}/>:<Route path='/user/:id/edit' element={<NotAuthorized/>}/>}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

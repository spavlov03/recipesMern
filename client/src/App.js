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
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import NotAuthorized from './components/NotAuthorized';
import UserDetail from './components/UserDetail';
import { useState } from 'react';

function App() {
  const [user,setUser] = useState({});
  const [oneRecipe,setOneRecipe] =useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser}/>
        <Routes>
          {/* <Route path='/' element={<Home/>}/> */}
          <Route path='/login' element={<Login user={user} setUser={setUser}/>}/>
          <Route path='/register' element={<Register user={user} setUser={setUser}/>}/>
          <Route path='/' element={<Dashboard user={user} setUser={setUser}/>}/>
          {user.type==="admin"?<Route path='/admin' element={<AdminPanel user={user} setUser={setUser}/>}/>:null}
          <Route path='/logout' element={<Logout setUser={setUser}/>}/>
          <Route path='/recipe/:id' element={<ViewRecipe user={user} setUser={setUser} oneRecipe={oneRecipe} setOneRecipe={setOneRecipe}/>}/>
          {user._id?<Route path='/add-recipe' element={<AddRecipe user={user} setUser={setUser}/>}/>:<Route path='/add-recipe' element={<NotAuthorized/>}/>}
          {user._id===oneRecipe.creatorId || user.type==="admin"?<Route path='/recipe/:id/edit' element={<EditRecipe user={user} setUser={setUser} oneRecipe={oneRecipe} setOneRecipe={setOneRecipe}/>}/>:<Route path='/recipe/:id/edit' element={<NotAuthorized/>}/>}
          <Route path='/user/:id' element={<UserDetail user={user} setUser={setUser}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

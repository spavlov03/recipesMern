import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import Test from './components/Test';
import AddRecipe from './components/AddRecipe';
import ViewRecipe from './components/ViewRecipe';
import EditRecipe from './components/EditRecipe';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import { useState } from 'react';

function App() {
  const [user,setUser] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login user={user} setUser={setUser}/>}/>
          <Route path='/register' element={<Register user={user} setUser={setUser}/>}/>
          <Route path='/dashboard' element={<Dashboard user={user} setUser={setUser}/>}/>
          <Route path='/admin' element={<AdminPanel user={user} setUser={setUser}/>}/>
          <Route path='/logout' element={<Logout setUser={setUser}/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/add-recipe' element={<AddRecipe user={user} setUser={setUser}/>}/>
          <Route path='/recipe/:id' element={<ViewRecipe user={user} setUser={setUser}/>}/>
          <Route path='/recipe/:id/edit' element={<EditRecipe user={user} setUser={setUser}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

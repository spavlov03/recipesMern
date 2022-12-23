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
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/add-recipe' element={<AddRecipe/>}/>
          <Route path='/recipe/:id' element={<ViewRecipe/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

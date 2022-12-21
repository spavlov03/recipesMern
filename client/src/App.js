import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import LogReg from './views/LogReg';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/test' element={<Test/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

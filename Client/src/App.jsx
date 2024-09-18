import { useEffect, useState, useCallback } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Headers from './component/Headers/Headers';
import Home from './pages/Home/Home';
import Footer from './component/Footers/Footer.jsx';
import Register from './pages/Register/Register.jsx';
import Login from './component/UserRegister/Login.jsx';
import SignUp from './component/UserRegister/SignUp.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Contact from './pages/contact/Contact.jsx';
import User from './pages/User/User.jsx';
import SideBar from './component/sidebar/SideBar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from './store/features/UserSlice';
import { toast } from 'react-toastify';

function App() {
  
  const {isAuthenticated}=useSelector((state)=>state.user)
      const dispatch=useDispatch();
  
   
  useEffect(()=>{
      
      dispatch(getUser())
   
    
  },[])

 
 
 
  return (
    <div>
      <Headers   />
      <div className='main d-flex'>
        {isAuthenticated && (
          <div className='sidebarWrapper'>
            <SideBar />
          </div>
        )}
        <div className='content'>
          <div className='page-content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login  />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/user' element={<User />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

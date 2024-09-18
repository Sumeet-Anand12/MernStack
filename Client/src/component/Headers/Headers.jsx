import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../../store/features/UserSlice';

const Headers = () => {
     const dispatch=useDispatch();
     const navigate=useNavigate();
     const{message, error, isAuthenticated}=useSelector((state)=>state.user);

    useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearAllUserErrors());
        }
        if (!isAuthenticated ) {
          toast.success(message); // Show toast message when user logs out
          navigate('/login'); // Redirect to login page
        }
      }, [isAuthenticated, message]);
      

      const handleLogOut =()=>{

        dispatch(logout());
       
    
      }

      const location =window.location.pathname;
    //    console.log("from header", location)
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light header fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link active" aria-current="page" href="#">Home</Link>
                            </li>
                        </ul>
                        <div className='d-flex justify-content-center navBar'>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <div className='Nav sign d-flex justify-content-center align-items-center gap-4 mx-3'>
                           
                        
                           {
                            !isAuthenticated?(<>
                            {
                                location==="/login"?  <Link to={'/sign-up'} className="nav-link">Sign Up</Link>:<Link to={'/login'} className="nav-link login">Login</Link>
                            }
                               
                                
                                </>):(<Link  className="nav-link login" onClick={handleLogOut}>Logout</Link>)
                            
                           }
                            
                            
                        </div>

                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Headers
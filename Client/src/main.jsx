import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store/Store.jsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <BrowserRouter>
    <App />
       <ToastContainer />
    </BrowserRouter>
  </Provider>,
    
  
)

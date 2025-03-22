import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter , Routes, Route,} from 'react-router-dom'
import './App.js';
import LoginPage from './login-page/LoginPage.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
            <Route index element={<LoginPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/analytics' element={<App/>}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
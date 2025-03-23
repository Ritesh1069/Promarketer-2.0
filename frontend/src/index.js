import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter , Routes, Route,} from 'react-router-dom'
import './App.js';
import LoginPage from './login-page/LoginPage.js';
import Image_Enhancer from './image-enhancer/image_enhancer.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
            <Route index element={<LoginPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/analytics' element={<App/>}/>
            <Route path='/image' element={<Image_Enhancer/>}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
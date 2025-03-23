import React, { useState } from 'react'
import './Navbar.css'
import { BsSearch } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';
import { useEffect } from 'react';
const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [cnt, setCnt] = useState('Log Out');
  useEffect(() => {
    axios.get('http://localhost:8080/api/get_login_status')
    .then(response => {
      if(response.data.login_status === true){
        setCnt('Log Out');
      }
      else{
        setCnt('Log In');
      }
    })
    .catch(error => {
      console.error('Error fetching login status:', error);
    });
  }, 10);
  const handleLogout = () => {
    axios.post('http://localhost:8080/api/logout')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error logging out:', error);
    });
    navigate('/login');
  };
  return (
    <>




    <nav>
    <div className='logoimg'><Link to={'http://localhost:5173/home'}><img className='logo' src="aixelerate logo.png" alt="Logo" /></Link></div>
      
      <ul>
        <li><Link to={'http://localhost:5173/home'}>Home</Link></li>
        <li className="dropdown">
          <Link 
            className="dropbtn" 
            onMouseEnter={() => setShowDropdown(true)} 
            onMouseLeave={() => setShowDropdown(false)}
          >
            Services
            <IoIosArrowDown className={`dropdown-arrow ${showDropdown ? 'rotated' : ''}`} />
          </Link>
          {showDropdown && (
            <div className="dropdown-content" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
              <Link to="http://localhost:3000/analytics">Orbis AI</Link>
              <Link to="http://localhost:5173/gemini">Gemini</Link>
              <Link to="http://localhost:3000/image">Image Enhancer</Link>
              <Link to="http://localhost:5173/email">Email Automation</Link>
              <Link to="http://localhost:5173/whatsapp">Whatsapp Automation</Link>
            </div>
          )}
        </li>
        {/* <li><Link to={'http://localhost:5173/explore'}>SERVICES</Link></li> */}
        <li><Link to={'http://localhost:5173/about'}>About</Link></li>
        <li><Link to={'http://localhost:5173/contact'}>Contact us</Link></li>
      </ul>
     <div className='login'>
      {/* <BsSearch className='searchicon' style={{ fontSize: '24px'}} /> */}
      {/* <Logins> */}
      {/* <div className="log_btns">
      <Button class='outline' name='LOGIN'/>
      <Button class='bluebox' name='SIGN IN'/>
      </div> */}
       <button onClick={handleLogout} className="logout-btn">{cnt}</button>
      {/* </Logins> */}
      {/* <Link to={'/'}><div className="menuicon"><IoMdMenu style={{fontSize:'36px'}}/></div></Link> */}
      </div>
    </nav>
    </>
  )
}

export default Navbar

export const Logins = styled.div``;
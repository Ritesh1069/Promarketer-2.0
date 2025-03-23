import React, { useState } from 'react'
import './Navbar.css'
import { BsSearch } from "react-icons/bs";
import Button from '../Button/Button';
import { IoMdMenu } from "react-icons/io";
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';
import { useEffect } from 'react';
const Navbar = () => {
  const navigate = useNavigate();
  const [cnt, setCnt] = useState('Log Out');
  const handleLogout = () => {
    if(cnt === 'Log Out'){
      axios.post('http://localhost:8080/api/logout')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error logging out:', error);
    });
    alert('Logged out successfully');
    window.location.href = 'http://localhost:3000/login';
  }
  else{
    window.location.href = 'http://localhost:3000/login';
  }
  };
  useEffect(() => {
    // Function to check login status
    const checkLoginStatus = () => {
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
    };

    // Initial check
    checkLoginStatus();

    // Set up interval to check every 1000ms (1 second)
    const intervalId = setInterval(checkLoginStatus, 500);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }); // Empty dependency array means this effect runs once on mount
  // Add state for dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>




    <nav>
      <div className='logoimg'><Link to={'/home'}><img className='logo' src="aixelerate logo.png" alt="Logo" /></Link></div>
      
      <ul>
        <li><Link to={'/home'}>Home</Link></li>
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
              <Link to="/gemini">Gemini</Link>
              <Link to="http://localhost:3000/image">Image Enhancer</Link>
              <Link to="/email">Email Automation</Link>
              <Link to="/whatsapp">Whatsapp Automation</Link>
            </div>
          )}
        </li>
        <li><Link to={'/about'}>About</Link></li>
        <li><Link to={'/contact'}>Contact us</Link></li>
      </ul>
      <button onClick={handleLogout} className="logout-btn" style={{marginRight:'49px'}}>{cnt}</button>
     {/* <div className='login'> */}
      {/* <BsSearch className='searchicon' style={{ fontSize: '24px'}} /> */}
      {/* <Logins>
      <div className="log_btns">
      <Button class='outline' name='LOGIN'/>
      <Button class='bluebox' name='SIGN IN'/>
      </div>
      </Logins> */}
      {/* <Link to={'/menu'}><div className="menuicon"><IoMdMenu style={{fontSize:'36px'}}/></div></Link> */}
      {/* </div> */}
    </nav>
    </>
  )
}

export default Navbar

export const Logins = styled.div``;
import React from 'react'
import './Navbar.css'
import { BsSearch } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };
  return (
    <>




    <nav>
      
      <ul>
        <li><Link to={'http://localhost:5173/home'}>HOME</Link></li>
        <li><Link to={'http://localhost:5173/explore'}>EXPLORE</Link></li>
        <li><Link to={'http://localhost:5173/about'}>ABOUT</Link></li>
        <li><Link to={'http://localhost:5173/contact'}>CONTACT US</Link></li>
      </ul>
     <div className='login'>
      {/* <BsSearch className='searchicon' style={{ fontSize: '24px'}} /> */}
      {/* <Logins> */}
      {/* <div className="log_btns">
      <Button class='outline' name='LOGIN'/>
      <Button class='bluebox' name='SIGN IN'/>
      </div> */}
       <button onClick={handleLogout} className="logout-btn">Log Out</button>
      {/* </Logins> */}
      {/* <Link to={'/'}><div className="menuicon"><IoMdMenu style={{fontSize:'36px'}}/></div></Link> */}
      </div>
    </nav>
    </>
  )
}

export default Navbar

export const Logins = styled.div``;
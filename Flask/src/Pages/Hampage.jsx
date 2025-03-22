import React from 'react'
import Home_y from './Home_y'
import { Link } from 'react-router-dom'
import { IoMdMenu } from 'react-icons/io'
import "./hampage.css"

const Hampage = () => {
  return (
    <div>
        
      <Home_y/>
      <div className="hamburger">

          <div className="ham_logo">
             <Link to={'/home'}><div className="menuicon_ham"><a href=""><IoMdMenu style={{fontSize:'36px'}}/></a></div></Link>
          </div>

              <ul>
                <li><Link to={'/home'}>HOME</Link></li>
                <li><Link to={'/explore'}>EXPLORE</Link></li>
                <li><Link to={'/about'}>ABOUT</Link></li>
                <li><Link to={'/contact'}>CONTACT US</Link></li>
              </ul>

           </div>
    </div>
  )
}

export default Hampage

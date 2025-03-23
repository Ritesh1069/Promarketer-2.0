import React from 'react'
import './About.css'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
const About = () => {
  return (
    <div>
      
      <div className="about_whole">
        <nav className='about_nav'>
         ABOUT
        </nav>
      </div>
       
       <div className="abt_img_content">
        <p style={{color:'#666', fontSize:'25px', fontWeight:'400', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'}}>Welcome to XYZ, your trusted partner in automated marketing solutions. At XYZ, we're passionate about helping businesses thrive in the digital realm. Our cutting-edge technology and expert team empower you to elevate your online presence, engage with your audience, and drive meaningful results. With personalized strategies, innovative tools, and unwavering support, we're committed to guiding you towards success in the ever-evolving digital landscape. Join us on this journey, and let's achieve greatness together. Welcome to the future of marketing with XYZ.</p>
       
        <img src="home_illustration.png" alt="" />
        
       </div>
      
    </div>
  
  )
}

export default About

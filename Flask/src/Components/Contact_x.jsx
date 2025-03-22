import React from 'react'
import Navbar from './Navbar/Navbar'
import Button from './Button/Button'
import { FaMagic } from 'react-icons/fa'
import './About/About.css'

const Contact_x = () => {
  return (
    <div>
      <div className='divvy'>
      <div className="navvv"><nav className='about_nav' id='cont_nav'>
         CONTACT
        </nav></div>
      
     <div className="img_h1">
       <div className="heading">
     
       {/* <h1>WELCOME TO <b>WHATSAPP-BOT</b></h1> */}
      
        <p>Welcome to XYZ, your premier destination for online automated marketing solutions. We're dedicated to helping businesses thrive in the digital landscape through innovative marketing strategies and cutting-edge technology. If you have any questions, inquiries, or feedback, we're here to assist you every step of the way. Get in touch with us using the following contact information      <br></br> <br></br>     At XYZ, we value your feedback and are committed to providing you with exceptional service. Whether you're a small startup or a large corporation, let us help you achieve your marketing goals. Reach out to us today and take the first step towards maximizing your online presence and growing your business.</p>

        <Button className='outline' name='LEARN MORE' style={{ marginBottom:'20px' }}/>
       </div>

       <div className="right_block">
           <h5>PROVIDE REQUIRED DETAILS</h5>
       
           <input className='input' type="text" placeholder="Enter your Email Address"  />
           <div className="whats_content">
           <input className="input" type="number" placeholder="Enter your Mobile Number" />
           <input className='input' type="number" placeholder="enter your Postal Code"  />
           {/* <button className='ai_btn_whtsp'> <FaMagic /> AI</button> */}
           </div>
           <input className='input' type="text" placeholder="Enter your Query"  id='conty'/>
           <div className='buttons' id='btns'>
              <Button className='bluebox' name='SUBMIT'/>
              <Button className='outline' name='RESET'/>  
        </div>
       </div>

        </div>


   </div>

   
    </div>
  )
}

export default Contact_x

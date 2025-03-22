import React from 'react'
import './Home.css'
import Button from '../Button/Button'
import { Logins } from '../Navbar/Navbar'

const Home = () => {
  return (
    <div>

       <div className="home">
        <div className="img_h1">
        <div className="heading">
      
        <h1>Increase your Sales, Reach and Profits
         with our<br></br><b>XYZ</b></h1>
         
         <p>XYZ is an Automated Digital Marketing service . It can be used to Scale your product by various Digital technologies and Platforms to promote products and services as well as to connect with potential customers . It is an Incredibly versatile and powerful tool that can be used in various ways to reach people worldwide. </p>
         {/* <div className='buttons'>
         <Button className="bbt" className='blackbox' name='EXPLORE'/>
         <Button className="bbt" className='outline' name='WHY PROMARKETER'/>
         </div> */}
        </div>
      
        <div className="x">
        <div className="signing">

         </div>
         </div>
        <img src="home_illustration.png" alt=""></img>


        </div>    

         
        {/* <div className="log_btns_home">
      <Button className='outline' name='LOGIN'/>
      <Button className='bluebox' name='SIGN IN'/>
      </div> */}

         </div>
    </div>
  )
}

export default Home

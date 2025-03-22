import React from 'react'
import './Instagram.css'
import Button from '../Button/Button'
import Navbar from '../Navbar/Navbar'

const Instagram = () => {
  return (
    <div>
       <div>
      <Navbar/>
      
      <div className="img_h1">
        <div className="heading">
      
        <h1>WELCOME TO <b>INSTAGRAM-BOT</b></h1>
         <p>An Instagram bot is an automated tool designed to manage various tasks on the Instagram platform. Utilizing artificial intelligence and predefined algorithms, it can interact with users, schedule posts, like photos, follow/unfollow accounts, and even leave comments. These bots streamline social media management, saving time for users and businesses by automating repetitive tasks. However, they must comply with Instagram's terms of service to avoid suspension. Instagram bots are widely used for marketing, engagement, and growing followers, enhancing brand visibility and reach on the platform.</p>

         <Button className='outline' name='LEARN MORE' style={{ marginBottom:'20px' }}/>
        </div>

        <div className="right_block">
            <h5>PROVIDE REQUIRED DETAILS</h5>

            <input className='input' type="text" placeholder="Enter the Numbers"  />
            <div className="whats_content">
            <input className="input" type="text" placeholder="Enter the Message" />
            <input className='input' type="file" placeholder="Upload the Docs or Media"  />
            </div>
            <div className='buttons'>
               <Button className='bluebox' name='SUBMIT'/>
               <Button className='outline' name='RESET'/>  
         </div>
        </div>

         </div>


    </div>

    </div>
  )
}

export default Instagram

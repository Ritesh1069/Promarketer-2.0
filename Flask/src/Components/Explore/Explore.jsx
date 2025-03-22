import React from 'react'
import './Explore.css'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
const Explore = () => {
  return (
  <div>
    <div className='explore_whole'>
      <nav className='explore_nav'>
         EXPLORE   
      </nav>
    </div>
    <div className="cards">
        <div className="card"><Link to={'/email'}><img id='email' src="gmail.png" alt="" /><div className='card-content'><h2>EMAIL</h2><p>Experience seamless email management with our smart Email bot. Organize, reply, and prioritize emails effortlessly.</p><Button name='Email'/></div></Link></div>
        <div className="card"><Link to={'/whatsapp'}><img id='whatsapp' src="WhatsApp.png" alt="" /><div className='card-content'><h2>WHATSAPP</h2><p>Get instant replies, updates, and assistance with our Whatsapp bot. Streamline communication and save time efficiently.</p><Button name='WhatsApp'/></div></Link></div>
        <div className="card"><Link to={'/gemini'}><img id='ai' src="ai.png" alt="" /><div className='card-content'><h2>ARTIFICIAL INTELLIGENCE</h2><p>Unlock endless creative possibilities with Gemeni, the ultimate content generation AI. Create compelling text effortlessly</p><Button name='CONTENT AI'/></div></Link></div>
        <div className="card"><Link to={'http://localhost:3000/'}><img id='analytics' src="analytics.png" alt="" height={"100px"}/><div className='card-content'><h2>ANALYTICS</h2><p>Gain valuable insights and make data-driven decisions with our powerful analytics tool. Unlock the potential of your data today!</p><Button name='Analytics'/></div></Link></div>
       
        
    </div>
  </div>
    
  )
}

export default Explore


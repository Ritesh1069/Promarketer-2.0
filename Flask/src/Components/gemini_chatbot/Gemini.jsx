import React from 'react'
import Navbar from '../Navbar/Navbar'
import Button from '../Button/Button'
import { FaMagic } from 'react-icons/fa'
import { RiSpamFill } from 'react-icons/ri'
import './Gemini.css'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';

const Gemini = () => {
  const [res, setRes] = useState(null)
  const [data, setData] = useState('');

  const handleDataChange = (event) => {
    setData(event.target.value);
  };

  const getData = () => {
    if(data){
      const formData = new FormData();
      formData.append('inputData', data);
      axios.post('http://localhost:8080/ai_data', formData)
      .then(response => {
        setRes(response.data.message); // Access the message from the response
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setRes('Error: '+error);
      });
  }
  else{
    setRes('Error: Please enter your Product/Campaign description')
  }
}

  return (

    <>
     <div>
      <Navbar/>
      
      <div className="img_h1">
        <div className="heading">
      
        <h1>WELCOME TO <b id='color'>CONTENT-BOT</b></h1>
         <p>🚀 Meet Gemini AI Content Generating Bot: Your WhatsApp assistant leveraging AI for instant responses, data gathering, and task execution. Streamline communication, enhance user experience, and boost productivity effortlessly! #GeminiAI #WhatsAppBot 🤖✨🌟 Revolutionize your WhatsApp interactions with Gemini AI: The ultimate AI-powered assistant for seamless communication, quick responses, and efficient task handling. Say hello to enhanced productivity and unparalleled user experience! 🚀📱</p>

         <Button className='outline' name='LEARN MORE' style={{ marginBottom:'20px' }}/>
        </div>

        <div className="right_block">
            <h5>GEMINI AT YOUR SERVICE</h5>
        
            <div className="prompt">
            <input className='prompt_input' type="text" placeholder="Enter Prompt for your Product" value={data} onChange={handleDataChange} />
            {/* <Button class='bluebox' name='SUBMIT' id="btnn"/> */}
            <button name='SUBMIT'  style={{ height: '40px' }} onClick={getData}>SUBMIT</button>
            </div>
            {/* <input className="gemini_response" type="text" placeholder="response will be generated here" value={res} />    */}
           <div style={{marginLeft: 10 , marginRight: 10,textAlign: 'justify', color: 'black'}}><p style={{ fontSize: 20, fontWeight: 'normal' }}>GEMINI AI: {res}</p></div>
        </div>

         </div>


    </div>

    </>
  )
}

export default Gemini

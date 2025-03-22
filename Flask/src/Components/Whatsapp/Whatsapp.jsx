import React from 'react'
import Navbar from '../Navbar/Navbar'
// import Content from '../Head&Content/Content'
import Button from '../Button/Button'
import './Whatsapp.css'
import { FaMagic } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';


const Whatsapp = () => {

  const [res, setRes] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState('');
  const [data, setData] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDataChange = (event) => {
    setData(event.target.value);
};

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const getData = () => {
    
    if(content && (selectedFile || data)){
      const formData = new FormData();
      formData.append('inputContent', content);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      if (data) {
        formData.append('inputData', data);
      }
      axios.post('http://localhost:8080/wapp_data', formData)
      .then(response => {
        setRes(response.data.message); // Access the message from the response
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setRes('Error: '+error);
      });
    }
    else{
      if(content){
        setRes('No Phone Numbers provided, NO Database? no worries use ours!')
      }
      else{
        setRes('No Content provided, Dont have any content? try our AI!')
      }
    }
    
  }

  return (
    <div>
      <Navbar/>
      
      <div class="img_h1">
        <div class="heading">
      
        <h1>WELCOME TO <b id='what_color'>WHATSAPP-BOT</b></h1>
         <p>A WhatsApp bot is an automated software designed to interact with users on the WhatsApp platform. Leveraging AI and predefined responses, it can answer queries, provide information, and perform tasks based on user input. WhatsApp bots are employed in various domains, from customer service to marketing, streamlining communication processes. They offer quick responses, gather data, and execute tasks, enhancing user experience and facilitating businesses in managing interactions efficiently on the popular messaging platform.</p>

         <Button class='outline' name='LEARN MORE' style={{ marginBottom:'20px' }}/>
        </div>

        <div className="right_block">
            <h5>PROVIDE REQUIRED DETAILS</h5>
        
            <input className='input' type="text" placeholder="Enter the Numbers"  value={data} onChange={handleDataChange}/>
            <div className="whats_content">
            <input className="input" type="text" placeholder="Enter the Message" value={content} onChange={handleContentChange}/>
            <input className='input' type="file" name="file" id="file" accept=".csv, .xls, .xlsx" placeholder="Upload the Docs or Media"  onChange={handleFileChange}/>
            <Link to={'/gemini'}><button className='ai_btn_whtsp'> <FaMagic />AI</button></Link>
         
            </div>
            <div className='buttons'>
               {/* <Button class='bluebox' name='SUBMIT'/> */}
               <button name='SUBMIT' onClick={getData}>SUBMIT</button>
               <div id='api_res'><p>{res}</p></div>
               <Button class='outline' name='RESET'/>  
         </div>
        </div>

         </div>


    </div>

    
  )
}

export default Whatsapp

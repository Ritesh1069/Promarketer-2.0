import React from 'react';
import Button from '../Button/Button';
import './Content.css';
import { FaMagic } from "react-icons/fa";
import { RiSpamFill } from "react-icons/ri";
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Content = (props) => {
  const [res, setRes] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [data, setData] = useState('');
  const [spam, setSpam] = useState(null)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDataChange = (event) => {
    setData(event.target.value);
};

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const getData = () => {
    
    if(content && subject && (selectedFile || data)){
      const formData = new FormData();
      formData.append('inputContent', content);
      formData.append('inputSubject', subject);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      if (data) {
        formData.append('inputData', data);
      }
      axios.post('http://localhost:8080/email_data', formData)
      .then(response => {
        setRes(response.data.message); // Access the message from the response
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setRes('Error'+error);
      });
    }
    else if(subject && content){
      setRes('Error: No Emails provided')
    }
    // else if(content){
    //   setRes('Error: No Emails provided, NO Database? no worries use ours!')
    // }
    else{
      if(subject){
        setRes('Error: No Content provided, Dont have any content? try our AI!')
      }
      else{
        setRes('Error: No Subject provided')
      }
    }
  }
  
  const checkSpam = () => {
    if(content){
      const formData = new FormData();
      formData.append('inputContent', content);
      axios.post('http://localhost:8080/spam_data', formData)
      .then(response => {
        setRes(response.data.message); // Access the message from the response
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setRes('Error'+error);
      });
    }
    else{
      setRes('Error: Please enter Email Content to check if it is Spam or not')
    }
  }
  
  return (
    <>
      <div className="img_h1">
        <div className="heading">
          <h1>{props.h1}</h1>
          <p>{props.p}</p>
          {/* <Button class='outline' name='LEARN MORE' style={{ marginBottom: '20px' }}/> */}
        </div>

        <div className="right_block">
          <h5>PROVIDE EMAILS</h5>

          <div className='email_inps'>
            {/* Input block with PNG image background */}
            <label htmlFor="file" id='png_block' className="input">
              <img src="file_logo.png" alt="Upload your .CSV file" className="input-image" id='inp_img'/>
              <input type="file" name="file" id="file" accept=".csv, .xls, .xlsx" style={{ display: 'none' }} onChange={handleFileChange}/>
            </label>
            <p style={{fontSize:'20px', fontWeight:'bold', marginTop:'45px'}}>OR</p>
            {/* Alternatively, you can use a text input */}
            <input className='input' type="text" name="Manual upload" id="file" placeholder='Provide emails directly' value={data} onChange={handleDataChange}/>
          </div>

          {/* <p>OR</p> */}
          <p style={{marginBottom: '25px'}}></p>
          <input style={{height: '10%'}} className="input" type="text" name="Enter your Subject here" placeholder='Enter your Subject here' id="inpemail" value={subject} onChange={handleSubjectChange}/>
          <input style={{width: '100%'}} className="input" type="text" name="Enter your Content here" placeholder='Enter your Content here' id="inpemail" value={content} onChange={handleContentChange} style={{marginTop: '10px'}}/>
          <Link to={'/gemini'}><button className='ai_btn'> <FaMagic /> AI</button></Link>
          <button className='spam_btn'onClick={checkSpam}> <RiSpamFill size={20} /> Check Spam</button>
          <div className='buttons'>
            {/* <Button class='bluebox' name='SUBMIT' bid={props.cid}/> */}
            <button name='SUBMIT' onClick={getData} style={{backgroundColor:'#007bff', color:'white', border:'none', padding:'10px 20px', borderRadius:'5px', cursor:'pointer', marginTop:'-30px'}}>SUBMIT</button>
            {/* <div id='api_res'><p>{res}</p></div> */}
            {/* <Button class='outline' onClick={getData} name='SUBMIT' />
            <Button class='outline' name='RESET' /> */}
          </div>
          <div id='api_res'><p>{res}</p></div>
        </div>
      </div>
      
    </>
  )
}

export default Content;

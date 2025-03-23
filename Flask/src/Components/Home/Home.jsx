import React, { useState, useEffect } from 'react'
import './Home.css'
import Button from '../Button/Button'
import { Logins } from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Home = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/api/get_login_status')
    .then(response => {
      if(response.data.login_status === true){
        setStatus(true);
      }
      else{
        setStatus(false);
      }
    })
    .catch(error => {
      console.error('Error fetching login status:', error);
    });
  }, 10);

  // Initialize with Orbis AI as the default selected service
  const [selectedService, setSelectedService] = useState(1); // Set to ID 1 (Orbis AI)

  const services = [
    {
      id: 1,
      title: "Orbis AI",
      icon: "/ai.png",
      description: "Advanced AI-powered analytics and insights",
      more: "more image info",
      color: "#4285f4",
      screenshot: "/orbis ss.png",
      path: "http://localhost:3000/analytics"
    },
    {
      id: 2,
      title: "Gemini",
      icon: "/ai.png",
      description: "Powerful language model integration",
      more: "more image info",
      color: "#34a853",
      screenshot: "/gemini ss.png",
      path: "/gemini"
    },
    {
      id: 3,
      title: "Image Enhancer",
      icon: "/ai.png",
      description: "Professional image enhancement tools",
      more: "more image info",
      color: "#fbbc05",
      screenshot: "/image enhancer ss.png",
      path: "http://localhost:3000/image"
    },
    {
      id: 4,
      title: "Email Automation",
      icon: "/email logo.png",
      description: "Streamlined email marketing solutions",
      more: "more image info",
      color: "#ea4335",
      screenshot: "/email ss.png",
      path: "/email"
    },
    {
      id: 5,
      title: "WhatsApp Automation",
      icon: "/whatsapp logo.png",
      description: "Automated WhatsApp business solutions",
      more: "more image info",
      color: "#25D366",
      screenshot: "/whatsapp ss.png",
      path: "/whatsapp"
    }
  ];

  // Find the currently selected service object
  const currentService = services.find(service => service.id === selectedService);

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>AI Marketing Partner</h1>
        <p>Automate, generate content, and AIxelerate your marketing game</p>
      </header>

      <div className="services-row">
        {services.map((service) => (
          <button 
            key={service.id} 
            className={`service-button ${selectedService === service.id ? 'active' : ''}`}
            style={{ 
              borderTop: `4px solid ${service.color}`,
              backgroundColor: selectedService === service.id ? `${service.color}15` : 'white'
            }}
            onClick={() => setSelectedService(service.id)}
          >
            {/* <div className="service-icon">{service.icon}</div> */}
            <img 
            src={service.icon} 
            alt={service.icon}
            style={{ marginTop: '-40px', width: '100px', height: '100px' }}
          />
            <h3>{service.title}</h3>
            <p className="service-description">{service.description}</p>
            {selectedService === service.id && (
              <button 
                className="try-now-button"
                onClick={(e) => {
                  e.stopPropagation();
                  if(status){
                  window.location.href = service.path;
                }
                else{
                  window.location.href = 'http://localhost:3000/login';
                }
              }}
              >
                Try now →
              </button>
            )}
          </button>
        ))}
      </div>

      <section className="showcase-section">
        <h2>{currentService.title}</h2>
        <p>{currentService.more}</p>
        <div className="screenshot-container">
          <img 
            src={currentService.screenshot} 
            alt={`${currentService.title} screenshot`} 
          />
        </div>
      </section>
    </div>
  )
}

export default Home

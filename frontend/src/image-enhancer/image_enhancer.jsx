import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import './image_enhancer.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
function Image_Enhancer() {
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select an image');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('prompt', prompt);

    try {
      const response = await fetch('http://localhost:8080/process-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        setProcessedImage(URL.createObjectURL(blob));
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      alert('Error processing image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Navbar />
    <div>

      <main>
        <h1>AI Image Enhancer</h1>
        
        <div className="content-card">
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Enter your content prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            <div className="file-input">
              <label htmlFor="file-upload" className="custom-file-upload">
                <FaCloudUploadAlt size={24} />
                <span>Choose Image File</span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file && (
                <div className="selected-file">
                  <span>Selected: {file.name}</span>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="analyze-btn"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Analyze Content'}
            </button>
          </form>

          {processedImage && (
            <div className="result-image">
              <div className="image-container">
                <img 
                  src={processedImage} 
                  alt="Processed" 
                  style={{ 
                    width: '300%', 
                    height: 'auto',
                    maxWidth: '1200px',
                  }} 
                />
              </div>
              <div className="download-container" style={{ margin: '20px 0' }}>
                <a 
                  href={processedImage} 
                  download="enhanced-image"
                  className="download-btn"
                >
                  Download Image
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
    <br /><br /><br /><br /><br /><br /><br />
    <Footer />
    </div>
  );
}

export default Image_Enhancer;
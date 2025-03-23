import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="brand-section">
            <h2><a href="#"><img src="aixelerate logo.png" alt="X (Twitter)" width="100%" height="100%" style={{marginBottom:'-80px', marginTop:'-200px'}}/></a></h2>
            <p className="brand-description">
            A University of Stirling student on a mission to build the ultimate one-stop shop for businesses marketing teams, offering AI tools to automate, create, and grow smarter.
            </p>
            <div className="social-links">
              <a href="#"><img src="x logo.png" alt="X (Twitter)" width="20" height="20" /></a>
              <a href="#"><img src="discord logo.png" alt="Discord" width="20" height="20" /></a>
              <a href="#"><img src="linkedin logo.png" alt="LinkedIn" width="20" height="20" /></a>
              <a href="#"><img src="github logo.png" alt="GitHub" width="20" height="20" /></a>
            </div>
          </div>

          {/* Company Column */}
          <div className="footer-column">
            <h3>Company</h3>
            <ul className="footer-links">
              <li><a href="#">Careers <span className="hiring-badge">We're hiring</span></a></li>
              <li><a href="#">Affiliate Program</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Directory</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-column">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li><a href="#">Your Brand for Labs</a></li>
              <li><a href="#">Your Brand for Universities</a></li>
              <li><a href="#">Your Brand for Teams</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Capabilities</a></li>
              <li><a href="#">Guides</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Changelog</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>

          {/* Guides Column */}
          <div className="footer-column">
            <h3>Guides</h3>
            <ul className="footer-links">
              <li><a href="/analytics">Orbis Ai</a></li>
              <li><a href="http://localhost:5173/gemini">Gemini</a></li>
              <li><a href="/image">Image Enhancer</a></li>
              <li><a href="http://localhost:5173/email">Email Automation</a></li>
              <li><a href="http://localhost:5173/whatsapp">Whatsapp Automation</a></li>
              {/* <li><a href="#">Blog</a></li>
              <li><a href="#">Explore Workflows</a></li> */}
            </ul>
          </div>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} AIxelerate Labs. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
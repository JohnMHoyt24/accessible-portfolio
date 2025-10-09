import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Me</h2>
            <p className="about-description">
              I'm a passionate developer with a strong focus on creating accessible, 
              user-friendly applications. With expertise in modern web technologies, 
              I believe in building digital experiences that work for everyone, 
              regardless of their abilities or the devices they use.
            </p>
            <p className="about-description">
              My journey in web development has taught me the importance of inclusive design 
              and the impact it can have on users' lives. I'm committed to creating 
              applications that are not only functional and beautiful but also accessible 
              to users with diverse needs.
            </p>
            <div className="about-highlights">
              <div className="highlight-item">
                <h3>Accessibility First</h3>
                <p>Every project I work on prioritizes accessibility and inclusive design principles.</p>
              </div>
              <div className="highlight-item">
                <h3>User-Centered</h3>
                <p>I focus on understanding user needs and creating intuitive experiences.</p>
              </div>
              <div className="highlight-item">
                <h3>Modern Technologies</h3>
                <p>I stay current with the latest web technologies and best practices.</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="profile-image" role="img" aria-label="Profile picture of the developer">
              <div className="image-placeholder">
                <span className="image-text">Your Photo Here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
